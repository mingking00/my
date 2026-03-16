import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readingTime: number
  slug: string
}

export function getSortedPostsData(): Omit<Post, 'content'>[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
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

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getPostData(id: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(gfm)
    .use(html, { allowDangerousHtml: true })
    .process(matterResult.content)
  const content = processedContent.toString()
  
  const readingTime = Math.ceil(matterResult.content.split(/\s+/).length / 200)

  return {
    id,
    slug: id,
    content,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    excerpt: matterResult.data.excerpt || matterResult.content.slice(0, 150) + '...',
    tags: matterResult.data.tags || [],
    readingTime,
  }
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      }
    })
}
