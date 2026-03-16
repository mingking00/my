import Link from 'next/link'
import { getAllTags } from '@/lib/posts'

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
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-6 py-3 bg-white rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
