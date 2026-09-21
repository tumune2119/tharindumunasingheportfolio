import { Button } from "./Button";

// Centralizes the CV file path + label so Navbar, MobileMenu, and the
// Home page all point at the same file instead of each hardcoding it
// separately — this is exactly how MobileMenu's copy used to drift to a
// stale /cv.pdf while Navbar's had already been updated.
export function DownloadCVButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      href="/Tharindu-Munasinghe-CV.pdf"
      download="Tharindu-Munasinghe-CV.pdf"
      title="Download CV (PDF)"
      variant="primary"
      className={className}
      onClick={onClick}
    >
      Download CV
    </Button>
  );
}
