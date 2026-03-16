import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/posts'

interface Props {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag,
  }))
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/tags" className="text-blue-600 hover:underline">Back to tags</Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Tag: <span className="text-blue-600">#{tag}</span>
        <span className="text-lg font-normal text-gray-500 ml-2">({posts.length})</span>
      </h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl p-6 shadow-sm border">
            <Link href={`/posts/${post.slug}`}>
              <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">{post.title}</h3>
            </Link>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="text-sm text-gray-500">
              {post.date} - {post.readingTime} min read
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
