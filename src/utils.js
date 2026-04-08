export const generateId = (length = 12) =>
  Math.random()
    .toString(16)
    .slice(2, 2 + length);

    /**
     * generateId()     // "62e25f1d52af"  → 12 chars (task IDs)
     * generateId(8)    // "tr0923sj"      → 8 chars  (board IDs)
     * generateId(6)    // "52327576"      → 6 chars  (column IDs)
     */