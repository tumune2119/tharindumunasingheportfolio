// A nav link counts as active on its own page and on any page nested under
// it (e.g. Projects stays highlighted on /projects/sri-charge), except Home,
// which would otherwise match every route.
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
