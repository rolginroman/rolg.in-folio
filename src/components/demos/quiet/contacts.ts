import { contacts, type Contact } from "../../../data/profile";

function requireContact(iconName: Contact["iconName"]): Contact {
  const found = contacts.find((contact) => contact.iconName === iconName);
  if (!found) {
    throw new Error(`quiet: expected a contact with iconName "${iconName}" in profile.ts`);
  }
  return found;
}

export const emailContact: Contact = requireContact("mdi:email-outline");
export const telegramContact: Contact = requireContact("mdi:telegram");
