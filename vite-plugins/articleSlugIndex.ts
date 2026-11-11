import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const VIRTUAL_ID = 'virtual:article-slug-index';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

/**
 * Build-time index of local article slugs -> the category folder(s) that
 * declare them, so a single article page can load just its own category
 * chunk instead of every category (~10 MB of JS).
 */
export function articleSlugIndexPlugin(): Plugin {
  const root = path.resolve(process.cwd(), 'src/data/articles');
  return {
    name: 'article-slug-index',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const index: Record<string, string[]> = {};
      const walk = (dir: string, folder: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const file = path.join(dir, entry.name);
          if (entry.isDirectory()) walk(file, folder);
          else if (/\.tsx?$/.test(entry.name)) {
            this.addWatchFile(file);
            for (const m of fs.readFileSync(file, 'utf8').matchAll(/^\s*slug:\s*['"]([^'"]+)['"]/gm)) {
              const folders = (index[m[1]] ||= []);
              if (!folders.includes(folder)) folders.push(folder);
            }
          }
        }
      };
      for (const folder of fs.readdirSync(root)) {
        if (/^(category-\d+|eating-body)$/.test(folder)) walk(path.join(root, folder), folder);
      }
      return `export default ${JSON.stringify(index)};`;
    },
  };
}
