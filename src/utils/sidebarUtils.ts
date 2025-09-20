type BlogSidebarItem = {
  title: string;
  permalink: string;
  unlisted: boolean;
  date: Date | string;
};
// TODO 2025: replace by std Object.groupBy ?
// This is a local polyfill with exact same TS signature
// see https://github.com/microsoft/TypeScript/blob/main/src/lib/esnext.object.d.ts
export function groupBy<K extends PropertyKey, T>(
  items: Iterable<T>,
  keySelector: (item: T, index: number) => K
): Partial<Record<K, T[]>> {
  const result: Partial<Record<K, T[]>> = {};
  let index = 0;
  for (const item of items) {
    const key = keySelector(item, index);
    result[key] ??= [];
    result[key]!.push(item);
    index += 1;
  }
  return result;
}

export function groupBlogSidebarItemsByYear(items: BlogSidebarItem[]): [string, BlogSidebarItem[]][] {
  const groupedByYear = groupBy(items, (item) => {
    return `${new Date(item.date).getFullYear()}`;
  });
  // "as" is safe here
  // see https://github.com/microsoft/TypeScript/pull/56805#issuecomment-2196526425
  const entries = Object.entries(groupedByYear) as [string, BlogSidebarItem[]][];
  // We have to use entries because of https://x.com/sebastienlorber/status/1806371668614369486
  // Objects with string/number keys are automatically sorted asc...
  // Even if keys are strings like "2024"
  // We want descending order for years
  // Alternative: using Map.groupBy (not affected by this "reordering")
  entries.reverse();
  return entries;
}
