export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">关于</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            欢迎来到我的博客！这是一个使用 Next.js 和 Tailwind CSS 构建的静态博客。
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">技术栈</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Next.js</strong> - React 框架</li>
            <li><strong>Tailwind CSS</strong> - 样式框架</li>
            <li><strong>TypeScript</strong> - 类型安全</li>
            <li><strong>Markdown</strong> - 文章编写</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">联系我</h2>
          <p className="text-gray-600">
            如果你有任何问题或建议，欢迎通过以下方式联系我：
          </p>
          <div className="mt-4 flex gap-4">
            <a 
              href="https://github.com/mingking00" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            <a 
              href="mailto:your@email.com" 
              className="text-blue-600 hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
