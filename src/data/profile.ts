/**
 * Single source of product truth for every page and every design demo.
 *
 * Everything here is verified: it comes from the live site copy, `src/const.ts`,
 * or Roman's public GitHub profile. Nothing in this file may be invented —
 * no testimonials, clients, metrics, awards, pricing or availability claims.
 * See PRODUCT.md for the full record.
 */
import { links, careerStartYear, yearsOfExperience } from "../const";

export { links, careerStartYear, yearsOfExperience };

export const identity = {
  fullName: "Roman Rolgin",
  shortName: "Roman",
  handle: "rolginroman",
  domain: "rolg.in",
  /** GitHub bio, verbatim. */
  role: "Frontend Engineer / Mentor / Consultant",
  /** Current headline on the live site. */
  tagline: "I build web apps",
  location: "Barcelona, Spain",
  githubSince: 2013,
} as const;

/** Bio paragraphs, verbatim from the live Projects section. */
export const bio = [
  `Experienced software engineer with ${yearsOfExperience}+ years in web development.`,
  "Proficient in Angular, TypeScript, system architecture. My true passion lies in creating user-centric designs, optimizing UX, and driving business metrics through a combination of development expertise and effective people management.",
  "Exploring the realm of open-source software, eagerly anticipating personal growth and development in this domain.",
] as const;

export const photo = {
  alt: "Roman Rolgin photo",
  src: "https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_256,w_256/IMG_4639_idlkrv.jpg",
  srcset:
    "https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_256,w_256/IMG_4639_idlkrv.jpg 1x, https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_512,w_512/IMG_4639_idlkrv.jpg 2x",
  webpSrcset:
    "https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_256,w_256/f_webp/IMG_4639_idlkrv.jpg 1x, https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_512,w_512/f_webp/IMG_4639_idlkrv.jpg 2x",
  /** Larger renditions, in case a layout wants an editorial-scale portrait. */
  largeSrc: "https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_800,w_640/IMG_4639_idlkrv.jpg",
  largeWebpSrcset:
    "https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_800,w_640/f_webp/IMG_4639_idlkrv.jpg 1x, https://res.cloudinary.com/dmxeucrmr/image/upload/c_fill,h_1600,w_1280/f_webp/IMG_4639_idlkrv.jpg 2x",
  width: 242,
  height: 242,
} as const;

export interface TechItem {
  name: string;
  /** astro-icon name, full colour. Resolved from the Iconify API at build time. */
  iconName: string;
  /**
   * Single-path monochrome alternative. Some visual worlds ban multi-colour
   * filled logos; give them this instead of making them author SVG by hand.
   */
  monoIconName: string;
  /**
   * Why it is on the list, when that is not obvious. Shown on hover, as a
   * caption, or not at all — the design decides.
   */
  note?: string;
}

export interface TechGroup {
  /** Short label for the cluster; safe to display or ignore. */
  label: string;
  items: TechItem[];
}

/**
 * The stack, grouped by what the work actually is rather than by vendor.
 *
 * Every entry is backed by public evidence: a merged pull request, a shipped
 * repository, or a filed issue. Nothing here is aspirational. Icon names were
 * verified against the Iconify API on 2026-09-21 — `logos:` has no Solana mark,
 * which is why that one entry uses `token-branded:`.
 */
export const techGroups: TechGroup[] = [
  {
    label: "Languages & frameworks",
    items: [
      { name: "TypeScript", iconName: "logos:typescript-icon", monoIconName: "simple-icons:typescript" },
      { name: "JavaScript", iconName: "logos:javascript", monoIconName: "simple-icons:javascript" },
      { name: "Angular", iconName: "logos:angular-icon", monoIconName: "simple-icons:angular" },
      { name: "RxJS", iconName: "logos:reactivex", monoIconName: "simple-icons:reactivex" },
      { name: "React", iconName: "logos:react", monoIconName: "simple-icons:react" },
      { name: "React Router", iconName: "logos:react-router", monoIconName: "simple-icons:reactrouter" },
      { name: "Next.js", iconName: "logos:nextjs", monoIconName: "simple-icons:nextdotjs" },
      { name: "Astro", iconName: "logos:astro", monoIconName: "simple-icons:astro" },
      { name: "SCSS", iconName: "logos:sass", monoIconName: "simple-icons:sass" },
    ],
  },
  {
    label: "AI engineering",
    items: [
      {
        name: "Claude Code",
        iconName: "simple-icons:anthropic",
        monoIconName: "simple-icons:anthropic",
        note: "Committed harness config and project instructions, not chat transcripts.",
      },
      {
        name: "Agent skills",
        iconName: "simple-icons:modelcontextprotocol",
        monoIconName: "simple-icons:modelcontextprotocol",
        note: "Authored reusable skills with their own scripts and references — CI monitoring, Nx import, workspace linking.",
      },
      {
        name: "OpenCode",
        iconName: "simple-icons:opencode",
        monoIconName: "simple-icons:opencode",
        note: "Subagent definitions and commands committed alongside the code they operate on.",
      },
      { name: "Codex", iconName: "simple-icons:openai", monoIconName: "simple-icons:openai" },
      { name: "Cursor", iconName: "simple-icons:cursor", monoIconName: "simple-icons:cursor" },
    ],
  },
  {
    label: "Platform & data",
    items: [
      { name: "Node.js", iconName: "logos:nodejs-icon", monoIconName: "simple-icons:nodedotjs" },
      { name: "NestJS", iconName: "logos:nestjs", monoIconName: "simple-icons:nestjs" },
      { name: "Prisma", iconName: "logos:prisma", monoIconName: "simple-icons:prisma" },
      { name: "PostgreSQL", iconName: "logos:postgresql", monoIconName: "simple-icons:postgresql" },
      { name: "Docker", iconName: "logos:docker-icon", monoIconName: "simple-icons:docker" },
      {
        name: "Cloudflare Workers",
        iconName: "logos:cloudflare-workers-icon",
        monoIconName: "simple-icons:cloudflareworkers",
        note: "Where the SSR streaming bug in @sentry/react-router was found.",
      },
      {
        name: "Solana",
        iconName: "token-branded:solana",
        monoIconName: "simple-icons:solana",
        note: "Two years of merged work on a public Solana SDK.",
      },
    ],
  },
  {
    label: "Build, release & quality",
    items: [
      { name: "Nx", iconName: "logos:nx", monoIconName: "simple-icons:nx" },
      { name: "pnpm", iconName: "logos:pnpm", monoIconName: "simple-icons:pnpm" },
      { name: "Vitest", iconName: "logos:vitest", monoIconName: "simple-icons:vitest" },
      { name: "Jest", iconName: "logos:jest", monoIconName: "simple-icons:jest" },
      { name: "Storybook", iconName: "logos:storybook-icon", monoIconName: "simple-icons:storybook" },
      {
        name: "GitHub Actions",
        iconName: "logos:github-actions",
        monoIconName: "simple-icons:githubactions",
        note: "OIDC trusted publishing with provenance; template-injection mitigation in release workflows.",
      },
      { name: "Sentry", iconName: "logos:sentry-icon", monoIconName: "simple-icons:sentry" },
      { name: "Git", iconName: "logos:git-icon", monoIconName: "simple-icons:git" },
    ],
  },
];

/** Flat list, in group order. Use when the design wants one continuous run. */
export const tech: TechItem[] = techGroups.flatMap((group) => group.items);

export interface Project {
  name: string;
  /** One line, plain. What it is. */
  description: string;
  /**
   * The detail that makes an engineer stop scrolling. Optional — only present
   * where there is something real to say. Never padding.
   */
  detail?: string;
  /** R — the value delivered. What changed for the product, stated without figures. */
  outcome: string;
  /**
   * Public URL a skeptic can open. Absent where the work is private or
   * NDA-covered — an item with no link still stands on its own copy, so
   * consumers must render it as plain text rather than as a dead anchor.
   */
  link?: string;
  /** Icon in src/icons, usable with astro-icon. Absent for repos with no mark. */
  svg?: string;
  /** Two- or three-character typographic mark, for designs that set marks in type. */
  mark: string;
  /** Primary language of the work. */
  language: string;
  /**
   * Public star count, read from the GitHub API. Present only for public
   * repos — private work has no public star count, so the field is absent
   * rather than zero or invented. Do not inflate.
   */
  stars?: number;
  /** Year the work was last active. */
  year: number;
  /** `work` = contribution to a shared codebase. `own` = a repo I own. */
  kind: "work" | "own";
  /** Short tags for filtering or display. */
  tags: string[];
}

/**
 * Ordered by what earns attention fastest, not by recency.
 *
 * Inclusion bar: built and shipped, and finished enough to survive a follow-up
 * question in an interview. Things I built and own come first. A scaffold, a
 * one-sitting spike or an abandoned experiment does not go on this page no
 * matter how good its topic sounds.
 *
 * Copy rules, and they are not stylistic. Every item is framed at the concept
 * level: what it is, why it is hard, what came out. No code, no file paths, no
 * commit counts, no line counts, no issue numbers — anything sharper than a
 * concept belongs in a conversation, not on a page. Never invent a metric: if a
 * number was not verified, it is absent, not rounded. Private work is described
 * without a link and carries no star count, because it has none to carry.
 */
export const projects: Project[] = [
  {
    name: "Agent Code Review",
    description: "Every change needs senior review, and senior attention is the scarcest resource an engineering org has.",
    detail:
      "I built the company's review platform. Specialist reviewers read a change along separate axes, and an adversarial stage tries to disprove each finding before a human sees it, so what reaches the author is short enough to actually get read. Cost and time budgets bound what any single review can spend. It is advisory by default with independent kill paths, so a system I own can never block someone else's merge.",
    outcome:
      "Runs on every pull request across the company, including on its own changes. Review stopped depending on who had a free afternoon — the floor is the same on a quiet week and a release week.",
    mark: "AR",
    language: "TypeScript",
    year: 2026,
    kind: "work",
    tags: ["AI agent orchestration", "TypeScript", "CI/CD automation", "developer tooling"],
  },
  {
    name: "Solana Payments SDK",
    description: "Streaming payments release money second by second, and a rounding error is somebody's salary.",
    detail:
      "I own the public toolkit other teams build on for vesting and token distribution. I redesigned its public interface one operation at a time, each change landing with its tests, so integrators upgrade without rewrites. I own the published packages end to end: module formats, release channels, documentation, supply chain.",
    outcome:
      "The integration surface partner teams commit to. Public and versioned, so a team can adopt it without a conversation, and a breaking change is a decision rather than an accident.",
    link: "https://github.com/streamflow-finance/js-sdk",
    mark: "SF",
    language: "TypeScript",
    stars: 166,
    year: 2026,
    kind: "work",
    tags: ["Solana", "SDK design", "TypeScript", "release engineering"],
  },
  {
    name: "Token Vesting Platform",
    description: "Teams run vesting schedules, airdrops and launches through this product with real funds.",
    detail:
      "One of its principal engineers since 2023, working where money and trust meet: the wallet connection path, the signing and confirmation flow, and the browser suite that drives the entire journey end to end so a release ships on evidence rather than on someone clicking through.",
    outcome:
      "The flows customers pay for became things the team can change without holding its breath. Releases are gated by a suite that exercises the real path, wallet included, rather than by hope.",
    mark: "TV",
    language: "TypeScript",
    year: 2026,
    kind: "work",
    tags: ["React", "Nx monorepo", "end-to-end testing", "Web3 wallets"],
  },
  {
    name: "Shipped Web Product",
    description:
      "Most side projects stop at the demo; in gifting, the awkward parts are the product: money, other people's data, moderation.",
    detail:
      "A wishlist and gifting product I built end to end with one other engineer, where I am the larger contributor: accounts and social sign-in, payments, media handling, monitoring. I also built the self-serve advertising system, so vendors buy placements without a salesperson in the loop.",
    outcome:
      "It operates as a business rather than a portfolio piece — it takes money, serves vendors who buy their own placements, and deploys itself.",
    mark: "UP",
    language: "PHP",
    year: 2026,
    kind: "own",
    tags: ["Laravel", "React", "payments", "CI/CD"],
  },
  {
    name: "Measured Agent Skills",
    description: "Everyone claims their prompt made the model better, and almost nobody measures it.",
    detail:
      "Instruction sets normally grow by accumulation, because measuring them is harder than writing them. I packaged reusable agent skills and gave each one a harness that runs the same task twice, once with the skill and once without, then has independent judges score both runs on whether the facts survived and the filler went.",
    outcome:
      "An instruction change either wins that comparison or does not ship. Prompt work stops being a matter of taste and gets a pass/fail gate.",
    mark: "EV",
    language: "TypeScript",
    year: 2026,
    kind: "own",
    tags: ["LLM evaluation", "AI agents", "TypeScript", "test harness design"],
  },
];

export interface UpstreamReport {
  /** `owner/repo`, as engineers read it. */
  repo: string;
  /** Issue or PR number, without the hash. */
  number: number;
  title: string;
  /** What the diagnosis actually involved — the depth behind the report. */
  action: string;
  /** Outcome upstream, stated so a reader can check it against the linked thread. */
  result: string;
  link: string;
  year: number;
  kind: "issue" | "pr";
}

/**
 * Four public findings in third-party repositories — each root-caused and each
 * resolved upstream, every one openable by a reader. The OpenCode entry backs the
 * AI-engineering claim in `techGroups`: agent harnesses debugged at the source,
 * not tools used from a chat window.
 */
export const upstream: UpstreamReport[] = [
  {
    repo: "getsentry/sentry-javascript",
    number: 23305,
    title: "Sentry's SSR trace injection corrupted multi-byte UTF-8 at stream chunk boundaries",
    action:
      "Isolated it to the decode/re-encode round-trip in injectTraceMetaTags. Shipped a two-layer repro: a 20-byte stream split mid-© (c2 | a9) with no framework, no server and no Sentry client, plus a full-stack sweep with an injection-off control.",
    result:
      "Held across SDK 10.54, 10.69, 10.70 and 11.0.0-alpha. Confirmed and fixed by the Sentry team in two days.",
    link: "https://github.com/getsentry/sentry-javascript/issues/23305",
    year: 2026,
    kind: "issue",
  },
  {
    repo: "nrwl/nx",
    number: 15692,
    title: "Nx daemon served stale cache hits for an entire workspace",
    action:
      "Traced it to .gitignore glob parsing at packages/nx/src/utils/ignore.ts:58 — a leading slash entry excluded every file, so the watcher saw no changes while logging that it was subscribed.",
    result:
      "Repro workspace attached. Accepted and fixed the same day. The class of bug: CI reports green against code it never rebuilt.",
    link: "https://github.com/nrwl/nx/issues/15692",
    year: 2023,
    kind: "issue",
  },
  {
    repo: "withastro/astro",
    number: 7035,
    title: "SCSS edits behind @use never triggered HMR in dev",
    action:
      "Narrowed it to the @use dependency graph, showed @import was unaffected, and tied it to the earlier @import fix (#3382) so maintainers received the delta rather than a report.",
    result: "Accepted as a bug and fixed upstream.",
    link: "https://github.com/withastro/astro/issues/7035",
    year: 2023,
    kind: "issue",
  },
  {
    repo: "anomalyco/opencode",
    number: 10114,
    title: "Fatal TUI crash on agent connect — local.agent.current() undefined mid-render",
    action:
      "Reported with the throwing frame (prompt/index.tsx:850) inside a Solid computation, the active plugin set, and the connect sequence that triggers it.",
    result: "Fixed in two days.",
    link: "https://github.com/anomalyco/opencode/issues/10114",
    year: 2026,
    kind: "issue",
  },
];

/** Headline figures for the upstream record. Re-verify before changing. */
export const upstreamStats = {
  pullRequestsAuthored: 60,
  pullRequestsMerged: 54,
  sinceYear: 2023,
} as const;

/** Note explaining why the project list is short. Verbatim intent from the live site. */
export const ndaNote = {
  lead: "There are NDAs and stuff.",
  body: "However, my CV contains all the relevant details regarding my experience and accomplishments.",
  cvLabel: "CV",
  cvLink: links.cv,
};

export interface Contact {
  label: string;
  href: string;
  iconName: string;
  /** Short form for compact layouts. */
  short: string;
}

export const contacts: Contact[] = [
  {
    label: "Contact me with e-mail",
    short: links.mail,
    href: `mailto:${links.mail}?subject=Hi%20Roman%2C%20I%20have%20a%20question.`,
    iconName: "mdi:email-outline",
  },
  {
    label: "Contact me with Telegram",
    short: "Telegram",
    href: links.telegram,
    iconName: "mdi:telegram",
  },
];

export const socials: Contact[] = [
  { label: "GitHub", short: "GitHub", href: links.github, iconName: "mdi:github" },
  { label: "LinkedIn", short: "LinkedIn", href: links.linkedin, iconName: "mdi:linkedin" },
  { label: "Twitter / X", short: "Twitter", href: links.twitter, iconName: "mdi:twitter" },
  { label: "Telegram", short: "Telegram", href: links.telegram, iconName: "mdi:telegram" },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "tech", label: "Tech" },
  { id: "projects", label: "Projects" },
  { id: "contacts", label: "Contacts" },
] as const;

export const seo = {
  title: "I'm Rolgin Roman 🚀",
  description: "Rolgin Roman's personal website with social media links and several examples of work",
  twitterDescription: "Software engineer 👨🏻‍💻 Web adept",
  twitterCreator: "@rolginroman",
  imageAlt: "Rolgin Roman website",
} as const;
