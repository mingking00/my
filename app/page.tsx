import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Inline functions to avoid import issues
function getSortedPostsData() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  if (!fs.existsSync(postsDirectory)) return []
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const content = matterResult.content
      const readingTime = Math.ceil(content.split(/\s+/).length / 200)

      return {
        id,
        slug: id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        excerpt: matterResult.data.excerpt || content.slice(0, 150) + '...',
        tags: matterResult.data.tags || [],
        readingTime,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getAllTags() {
  const posts = getSortedPostsData()
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag: string) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export default function Home() {
  const posts = getSortedPostsData()
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">欢迎来到我的博客</h1>
        <p className="text-lg text-gray-600">分享技术、生活和思考</p>
      </section>

      {tags.length > 0 && (
        <section className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">最新文章 ({posts.length}篇)</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <Link href={`/posts/${post.slug}`}>
                <h3 className="text-xl font-semibold hover:text-blue-600">{post.title}</h3>
              </Link>
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <div className="text-sm text-gray-500 mt-3">
                {post.date} · {post.readingTime}分钟阅读
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
