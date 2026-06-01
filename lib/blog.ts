const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  published_date: string
  image_url: string | null
}

async function supabaseFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`)
  return res.json()
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return supabaseFetch(
    'blog_posts?select=id,slug,title,excerpt,published_date&status=eq.published&order=published_date.desc'
  )
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await supabaseFetch<BlogPost[]>(
    `blog_posts?select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`
  )
  return posts[0] ?? null
}
