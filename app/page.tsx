import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

export default function Home() {
  const posts = getSortedPostsData()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-6">
            <Link href={`/posts/${post.slug}/`} className="block">
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
            <div className="text-sm text-gray-400 mt-2">
              {post.date} · {post.readingTime} 分钟阅读
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
