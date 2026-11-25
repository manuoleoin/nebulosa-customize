import { Link } from "react-router";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" aria-label="Nebulosa — página inicial" className={`inline-flex items-center no-underline ${className}`}>
      <img src="/img/logo-nebulosa.png" alt="" width="480" height="155" className="h-9 w-auto sm:h-12" />
    </Link>
  );
}
