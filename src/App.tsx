import { useEffect } from 'react';
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { useDemoStore } from './store/demoStore';
import { Dictionary } from './pages/Dictionary';
import { Home } from './pages/Home';
import { Leaderboard } from './pages/Leaderboard';
import { Lesson } from './pages/Lesson';
import { NotFound } from './pages/NotFound';
import { Onboarding } from './pages/Onboarding';
import { Practice } from './pages/Practice';
import { Profile } from './pages/Profile';
import { Result } from './pages/Result';
import { Settings } from './pages/Settings';
import { SignDetail } from './pages/SignDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.title =
      pathname.startsWith('/leccion')
        ? 'Lección · Manos LSP'
        : pathname.startsWith('/diccionario')
          ? 'Diccionario · Manos LSP'
          : pathname.startsWith('/perfil')
            ? 'Mi perfil · Manos LSP'
            : pathname.startsWith('/ajustes')
              ? 'Ajustes · Manos LSP'
              : 'Manos · Demo LSP';
  }, [pathname]);

  return null;
}

function ThemeSync() {
  const settings = useDemoStore((state) => state.settings);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const shouldUseDark =
        settings.theme === 'dark' || (settings.theme === 'system' && media.matches);
      document.documentElement.classList.toggle('dark', shouldUseDark);
    };

    applyTheme();
    if (settings.theme === 'system') {
      media.addEventListener('change', applyTheme);
      return () => media.removeEventListener('change', applyTheme);
    }
    return undefined;
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [settings.reducedMotion]);

  return null;
}

function ProtectedRoute() {
  const onboardingCompleted = useDemoStore((state) => state.onboardingCompleted);
  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  return <Outlet />;
}

function OnboardingGate() {
  const onboardingCompleted = useDemoStore((state) => state.onboardingCompleted);
  if (onboardingCompleted) {
    return <Navigate to="/aprender" replace />;
  }
  return <Onboarding />;
}

function IndexRedirect() {
  const onboardingCompleted = useDemoStore((state) => state.onboardingCompleted);
  return <Navigate to={onboardingCompleted ? '/aprender' : '/onboarding'} replace />;
}

export function App() {
  return (
    <HashRouter>
      <ThemeSync />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IndexRedirect />} />
        <Route path="/onboarding" element={<OnboardingGate />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/aprender" element={<Home />} />
            <Route path="/diccionario" element={<Dictionary />} />
            <Route path="/diccionario/:signId" element={<SignDetail />} />
            <Route path="/practicar" element={<Practice />} />
            <Route path="/clasificacion" element={<Leaderboard />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/ajustes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/leccion/:lessonId" element={<Lesson />} />
          <Route path="/leccion/:lessonId/resultado" element={<Result />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
