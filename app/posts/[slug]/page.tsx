import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostData, getAllPostIds } from '@/lib/posts'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostData(slug)
  
  if (!post) {
    return { title: 'Not Found' }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          {/* Back Link */}
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 transition-colors mb-6 inline-block"
          >
            ← 返回首页
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <time className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.date}
            </time>
            
            <span>·</span>
            
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} 分钟阅读
            </span>

            {post.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/" 
          className="px-6 py-3 bg-white rounded-lg text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 transition-all shadow-sm"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  )
}
