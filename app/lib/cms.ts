/** Build a same-origin URL for the Strapi CMS proxy (safe to use in client components). */
export function strapiCmsUrl(path: string, query: Record<string, string> = { populate: "*" }) {
  const params = new URLSearchParams({ path, ...query })
  return `/api/cms?${params.toString()}`
}
