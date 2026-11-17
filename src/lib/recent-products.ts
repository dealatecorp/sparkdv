function storageKey(userId: string) {
  return `sparkdv-recent-products:${userId}`;
}

export function readRecentProducts(userId: string): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey(userId)) ?? '[]');
    return Array.isArray(saved) ? saved.filter((slug): slug is string => typeof slug === 'string') : [];
  } catch {
    return [];
  }
}

export function rememberProduct(userId: string, slug: string) {
  const recent = readRecentProducts(userId);
  if (recent[0] === slug) return;
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify([slug, ...recent.filter(item => item !== slug)].slice(0, 5)));
  } catch {
    // Browsing still works when storage is disabled or full.
  }
}
