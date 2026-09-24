import "../../src/styles/base.scss";
import "./og.scss";
import { identity, focus, yearsOfExperience } from "../../src/data/profile";

const mark = document.querySelector<HTMLElement>(".og-mark");
if (mark) mark.textContent = identity.domain;

const nameplate = document.querySelector<HTMLElement>(".og-nameplate");
if (nameplate) {
  nameplate.textContent = identity.fullName.toUpperCase();
  const dot = document.createElement("span");
  dot.className = "og-dot";
  nameplate.append(dot);
}

const role = document.querySelector<HTMLElement>(".og-role");
if (role) role.textContent = identity.role;

/* Same spec strip Identity.astro renders, minus the Base/location entry. */
const specs = [
  { label: "Experience", value: `${yearsOfExperience}+ years` },
  { label: "Focus", value: focus },
  { label: "Handle", value: `@${identity.handle}` },
];

const specsEl = document.querySelector<HTMLElement>(".og-specs");
if (specsEl) {
  for (const spec of specs) {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = spec.label;
    const dd = document.createElement("dd");
    dd.textContent = spec.value;
    row.append(dt, dd);
    specsEl.append(row);
  }
}

document.fonts.ready.then(() => {
  document.body.dataset.fontsReady = "true";
});
