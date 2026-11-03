/** Stagger helper: 40ms per item, capped so long grids don't drag. */
export const stagger = (i: number) => Math.min(i, 8) * 0.04;
