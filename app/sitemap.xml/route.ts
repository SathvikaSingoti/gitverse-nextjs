export async function GET() {
  const baseUrl = 'https://gitverse-nextjs.vercel.app'
  const routes = ['', '/contribute', '/login', '/signup']

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  })
}