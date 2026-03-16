import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Inline functions
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
      return {
        id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        excerpt: matterResult.data.excerpt || matterResult.content.slice(0, 150) + '...',
        tags: matterResult.data.tags || [],
      }
    })
}

function getAllTags() {
  const posts = getSortedPostsData()
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag: string) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">标签</h1>

      {tags.length === 0 ? (
        <p className="text-gray-600">暂无标签</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span key={tag} className="px-6 py-3 bg-white rounded-lg text-gray-700 border shadow-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
