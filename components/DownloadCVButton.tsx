import { Button } from "./Button";

// Centralizes the CV file path + label so Navbar, MobileMenu, and the
// Home page all point at the same file instead of each hardcoding it
// separately — this is exactly how MobileMenu's copy used to drift to a
// stale /cv.pdf while Navbar's had already been updated.
export function DownloadCVButton({
  className,
  magnetic,
  onClick,
}: {
  className?: string;
  magnetic?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      href="/Tharindu-Munasinghe-CV.pdf"
      download="Tharindu-Munasinghe-CV.pdf"
      variant="primary"
      magnetic={magnetic}
      className={className}
      onClick={onClick}
    >
      Download CV
    </Button>
  );
}
