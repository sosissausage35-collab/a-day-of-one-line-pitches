// A Day of One-Line Pitches — entry program (make.fun, u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
// Writes one persuasive sentence to /output/entry.txt.
//
// The sentence: a warm nudge to a friend who has never coded, to let an AI
// agent build their first app idea on make.fun. One read, plain words, no
// jargon, no overpromise: it only claims what the platform does — you
// describe the idea in plain words, the agent builds a first working
// version, and you get to try it.

import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "Just tell make.fun your app idea in plain words and an AI agent will build the first working version for you — no coding, nothing to install, and you can finally try the thing you've only been imagining instead of just talking about it.";

// Gate validation, matching the sealed scorer: /output/entry.txt must be
// UTF-8 text of 1 to 240 characters, not only white space.
const trimmed = PITCH.trim();
if (trimmed.length < 1 || trimmed.length > 240) {
  throw new Error(`Entry length ${trimmed.length} is outside the 1-240 character gate`);
}
if (!/[.!?]$/.test(trimmed)) {
  throw new Error("Entry must end with sentence-ending punctuation");
}
// Exactly one sentence: "make.fun" is a domain name, not a sentence break,
// so it is masked before counting sentence-ending punctuation.
const masked = trimmed.replace(/make\.fun/gi, "makefun");
const sentenceCount = masked.split(/[.!?]+/).filter((part) => part.trim().length > 0).length;
if (sentenceCount !== 1) {
  throw new Error(`Entry must be exactly one sentence, found ${sentenceCount}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH + "\n", "utf8");
console.log(`Wrote ${PITCH.length} characters to /output/entry.txt`);
