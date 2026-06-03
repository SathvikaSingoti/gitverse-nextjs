export async function GET(request: Request) {
  const host = request.headers.get('host') || 'gitverse-nextjs.vercel.app'
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  const routes = ['', '/contribute', '/login', '/signup']
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
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