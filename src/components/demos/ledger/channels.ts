import { contacts, socials, ndaNote } from "../../../data/profile";

export interface Channel {
  title: string;
  href: string;
  /** The verbatim purpose line from the data; shown as the row's deferred detail. */
  label: string;
}

/** mailto: has no host to show, so it is labelled by its scheme instead. */
export function destination(href: string): string {
  if (href.startsWith("mailto:")) return "mailto";
  const url = new URL(href);
  return `${url.host}${url.pathname}`.replace(/\/$/, "");
}

const emailContact = contacts.find((contact) => contact.iconName === "mdi:email-outline");
if (!emailContact) {
  throw new Error('ledger: expected a contact with iconName "mdi:email-outline" in profile.ts');
}

/**
 * CV first — it is the one thing a recruiter came for. Then every channel,
 * deduplicated by destination so Telegram is not listed twice.
 */
export const channels: Channel[] = [
  { title: ndaNote.cvLabel, href: ndaNote.cvLink, label: "The full employment record, as a PDF." },
  { title: emailContact.short, href: emailContact.href, label: emailContact.label },
  ...socials.map((social) => ({ title: social.short, href: social.href, label: social.label })),
].filter((channel, index, all) => all.findIndex((other) => other.href === channel.href) === index);
