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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      
      <article className="mt-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        
        <div className="text-gray-500 mt-2 mb-6">
          {post.date} - {post.readingTime} min read
        </div>

        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
