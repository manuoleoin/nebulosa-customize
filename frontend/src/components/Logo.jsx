import { Link } from "react-router";
import { Planeta } from "./Icones";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Nebulosa — página inicial"
      className={`inline-flex items-center pt-1.5 font-logo text-[2.4rem] leading-none whitespace-nowrap text-white no-underline hover:text-white sm:text-[3.4rem] ${className}`}
    >
      Nebul
      <Planeta className="-mx-[0.04em] size-[0.9em] -translate-y-[0.04em]" />
      sa
    </Link>
  );
}
