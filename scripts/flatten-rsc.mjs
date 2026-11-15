// Next 16 static export writes segment-prefetch payloads as nested folders
// (en/about/__next.$d$locale/about/__PAGE__.txt) while the client router requests the
// dot-joined name (en/about/__next.$d$locale.about.__PAGE__.txt). Static hosts then 404.
// This copies each nested payload to the flat name the client asks for. Runs after `next build`.
import { copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = join(process.cwd(), 'out');
let copied = 0;

function walkFiles(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walkFiles(p) : [p];
  });
}

function visit(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith('__next.')) {
      for (const f of walkFiles(p)) {
        const flat = `${name}.${relative(p, f).split(sep).join('.')}`;
        copyFileSync(f, join(dir, flat));
        copied++;
      }
    } else {
      visit(p);
    }
  }
}

visit(OUT);
console.log(`flatten-rsc: ${copied} segment payloads copied`);
