'use client'

import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

interface PostBodyProps {
  html: string
}

export default function PostBody({ html }: PostBodyProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    contentRef.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })

    contentRef.current.querySelectorAll('pre').forEach((pre) => {
      if (pre.parentElement?.classList.contains('code-block-wrapper')) return

      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper relative group/code'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? ''

      const btn = document.createElement('button')
      btn.textContent = 'Copy'
      btn.className =
        'absolute right-3 top-3 px-2 py-1 text-xs font-mono text-gray-500 bg-[#1a1a1a] border border-[#2a2a2a] rounded opacity-0 group-hover/code:opacity-100 hover:text-amber-500 hover:border-amber-500/40 transition-all cursor-pointer'
      btn.onclick = () => {
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied!'
          setTimeout(() => {
            btn.textContent = 'Copy'
          }, 2000)
        })
      }
      wrapper.appendChild(btn)
    })
  }, [html])

  return (
    <div className="mx-auto max-w-[720px] px-4 pb-16 sm:px-6">
      <div
        ref={contentRef}
        className="ghost-content prose prose-invert max-w-none
          prose-headings:font-serif prose-headings:font-normal
          prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
          prose-code:text-amber-400 prose-code:bg-[#1a1a1a] prose-code:rounded prose-code:px-1
          prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#2a2a2a] prose-pre:rounded-xl
          prose-blockquote:border-l-amber-500 prose-blockquote:text-gray-400
          prose-img:rounded-lg prose-hr:border-[#2a2a2a]
          prose-strong:text-white prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
