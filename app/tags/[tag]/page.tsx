import Link from 'next/link'

// Simple version without complex types
export default function TagPage({ params }: any) {
  const tag = params?.tag || ''
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/tags" className="text-blue-600 hover:underline">Back to tags</Link>
      </div>
      <h1 className="text-3xl font-bold">Tag: #{tag}</h1>
      <p className="mt-4 text-gray-600">Posts with this tag will appear here.</p>
    </div>
  )
}
