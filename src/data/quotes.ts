/** Rotating quotes shown in the footer. Swap these for your own picks —
    each needs only `text` and optional `source`. */

export interface Quote {
  text: string;
  source?: string;
}

export const quotes: Quote[] = [
  {
    text: 'So, surely with hardship comes ease. Surely with [that] hardship comes [more] ease.',
    source: 'Quran 94:5–6',
  },
  {
    text: 'Systems — technical or organizational — should turn chaos into something legible.',
    source: 'personal principle',
  },
  {
    text: 'Amateurs sit and wait for inspiration. The rest of us just get up and go to work.',
    source: 'Stephen King',
  },
];
