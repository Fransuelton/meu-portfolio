import { OGImageRoute } from "astro-og-canvas";
import { ui, defaultLang } from "../../i18n/ui";

type Lang = keyof typeof ui;

interface OGPage {
  lang: Lang;
  titleKey: string;
  descKey: string;
}

const LANGS: Lang[] = ["pt", "en", "es"];

/**
 * One image per page × language, e.g. `/og/pt-home.png`, `/og/en-projects.png`.
 * Generated at build time by canvaskit — nothing ships to the client.
 */
const pages: Record<string, OGPage> = {};
for (const lang of LANGS) {
  pages[`${lang}-home`] = {
    lang,
    titleKey: "seo.title",
    descKey: "seo.description",
  };
  pages[`${lang}-projects`] = {
    lang,
    titleKey: "seo.projects.title",
    descKey: "seo.projects.description",
  };
}

const MONO = "JetBrains Mono";

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => {
    const t = (key: string) =>
      (ui[page.lang] as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[key] ??
      key;

    return {
      title: t(page.titleKey),
      description: t(page.descKey),
      logo: { path: "./src/assets/avatar.webp", size: [128] },
      // Matches --bg / --card from global.css
      bgGradient: [
        [8, 8, 8],
        [20, 20, 20],
      ],
      // Accent stripe, same #00ff88 as the site
      border: { color: [0, 255, 136], width: 16, side: "inline-start" },
      padding: 64,
      font: {
        title: {
          color: [228, 228, 231],
          size: 56,
          weight: "Bold",
          lineHeight: 1.2,
          families: [MONO],
        },
        description: {
          color: [113, 113, 122],
          size: 28,
          lineHeight: 1.5,
          families: [MONO],
        },
      },
      fonts: [
        "./src/fonts/JetBrainsMono-Bold.ttf",
        "./src/fonts/JetBrainsMono-Regular.ttf",
      ],
      format: "PNG",
    };
  },
});
