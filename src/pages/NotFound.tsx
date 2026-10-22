import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Home } from 'lucide-react';
import { Mascot } from '../components/Mascot';

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <Mascot className="h-36 w-36" mood="calm" />
      <p className="mt-2 font-display text-6xl font-semibold text-brand-500">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Esta seña no existe</h1>
      <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-muted">
        La página que buscas no está en esta demo. Puedes volver al inicio o explorar el
        diccionario.
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link to="/aprender" className="btn-primary">
          <Home className="h-4 w-4" />
          Volver al inicio
        </Link>
        <Link to="/diccionario" className="btn-secondary">
          <BookOpen className="h-4 w-4" />
          Diccionario
        </Link>
      </div>
      <Link
        to="/aprender"
        className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Regresar
      </Link>
    </div>
  );
}
