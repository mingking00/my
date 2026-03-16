export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} My Blog. Built with Next.js & Tailwind CSS.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-gray-600 transition-colors">
              GitHub
            </a>
            <a href="/rss.xml" className="text-gray-400 hover:text-gray-600 transition-colors">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
