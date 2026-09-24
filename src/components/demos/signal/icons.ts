/** Monoline icon set authored for the SIGNAL world: 1.5px stroke, no fill, currentColor. */
export type IconName = "arrow-ne" | "arrow-down" | "mail" | "telegram";

export const iconPaths: Record<IconName, string> = {
  "arrow-ne": '<path d="M7.5 16.5 16.5 7.5"/><path d="M9 7.5h7.5V15"/>',
  "arrow-down": '<path d="M12 3.5v12"/><path d="M6.75 10.5 12 15.75l5.25-5.25"/><path d="M4.5 20.5h15"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="1"/><path d="m3.6 6.4 8.4 6.3 8.4-6.3"/>',
  telegram:
    '<path d="M21.3 3.6 2.9 10.9l5.4 2 2 5.8 2.8-3.1"/><path d="M8.3 12.9 21.3 3.6l-3.2 15.1-5.8-3.1"/>',
};
