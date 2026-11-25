// News-image entry for make.fun. This program does one thing: hand the judge
// the front-page picture that lives next to it in this repo.
//
// The picture is entry.png, a 1024x1024 newspaper front page for 25 Nov 2026.
// The grader runs this file with Node 22 and reads whatever lands in the output
// folder, so the picture is copied there byte for byte: no resizing, no edits,
// no network calls and no timestamps, which means the result is identical on
// every run.
//
// Where the picture goes: the grader sets MAKEFUN_OUTPUT_DIR (inside its
// container that folder is /output). To try it locally, set the variable
// yourself first, for example:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function main() {
  const repoDir = dirname(fileURLToPath(import.meta.url));
  const picture = readFileSync(join(repoDir, 'entry.png'));

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, 'entry.png');
  writeFileSync(target, picture);
  console.log(`Copied entry.png (${picture.length} bytes) to ${target}`);
}

main();
