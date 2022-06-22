/**
 * Get last element of string, after splitting it on "-"
 * 
 * Example: "my-slug-thingy-1234" returns "1234"
 * @param slug param.slug from Next.js (string | string[] | undefined)
 * @returns last element of slug, split by "-"
 */
export function getSlugId(slug: string | string[] | undefined): string | undefined {
  const slugString = slug ? Array.isArray(slug) ? slug.join("-") : slug : undefined
  const slugArray = slugString?.split("-").slice(-1) ?? []
  return slugArray[slugArray?.length - 1]
}