import Link from 'next/link'
import { getSortedPostsData, getAllTags } from '@/lib/posts'

export default function Home() {
  const posts = getSortedPostsData()
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到我的博客
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          分享技术、生活和思考。这里记录着我的学习历程和所见所闻。
        </p>
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>最新文章</span>
          <span className="text-sm font-normal text-gray-500">({posts.length} 篇)</span>
        </h2>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <Link href={`/posts/${post.slug}`}>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-3">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time>{post.date}</time>
                <span>·</span>
                <span>{post.readingTime} 分钟阅读</span>
                
                {post.tags.length > 0 && (
                  <>
                    <span>·</span>
                    <div className="flex gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${tag}`}
                          className="text-blue-600 hover:underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
