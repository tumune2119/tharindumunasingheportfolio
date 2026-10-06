import { LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

// Shared by the full Contact page (app/contact/page.tsx) and the Home
// page's ContactPreview — one source of truth instead of the same details
// typed out twice. Every entry has an href, so each one is a tap target.
export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
  title?: string;
  icon: typeof MailIcon;
};

export const contactDetails: ContactDetail[] = [
  {
    label: "Location",
    value: "Colombo, Western Province, Sri Lanka",
    href: "https://www.google.com/maps/search/?api=1&query=Colombo%2C+Western+Province%2C+Sri+Lanka",
    title: "Find Colombo on Google Maps",
    icon: MapPinIcon,
  },
  {
    label: "Phone",
    value: "+94 77 268 1057",
    href: "tel:+94772681057",
    title: "Call +94 77 268 1057",
    icon: PhoneIcon,
  },
  {
    label: "Email",
    value: "tumune2119@gmail.com",
    href: "mailto:tumune2119@gmail.com",
    title: "Email tumune2119@gmail.com",
    icon: MailIcon,
  },
  {
    label: "LinkedIn",
    value: "View profile",
    href: "https://www.linkedin.com/in/tharindu-munasinghe-45b053184/",
    title: "Open LinkedIn profile",
    icon: LinkedinIcon,
  },
];
