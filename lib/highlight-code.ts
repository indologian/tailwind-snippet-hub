import { Html } from "next/document";
import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: string = "html") {
  return codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark-dimmed",
    },
    defaultColor: false, 
  });
}

