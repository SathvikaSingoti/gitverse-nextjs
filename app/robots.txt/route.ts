export async function GET() {
  const body = `User-agent: *
Allow: /
Allow: /contribute
Allow: /login
Allow: /signup
Disallow: /dashboard
Disallow: /analysis
Disallow: /analyze
Disallow: /repo
Disallow: /search
Disallow: /settings
Disallow: /api/

Sitemap: https://gitverse-nextjs.vercel.app/sitemap.xml`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}