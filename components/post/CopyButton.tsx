'use client'

import { useEffect } from 'react'

export default function CopyButton() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const btn = (e.target as Element).closest('[data-code]')
      if (!btn) return

      const code = btn.getAttribute('data-code') ?? ''
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!'
        setTimeout(() => {
          btn.textContent = 'Copy'
        }, 2000)
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <style>{`
      .copy-btn::before {
        content: 'Copy';
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.625rem;
        font-size: 0.75rem;
        font-family: var(--font-ibm-plex-mono), monospace;
        color: #9ca3af;
        background: #1a1a1a;
        border: 1px solid #2a2a2a;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: color 0.2s, border-color 0.2s;
      }
      .copy-btn:hover::before {
        color: #f59e0b;
        border-color: rgba(245, 158, 11, 0.4);
      }
      .code-block-wrapper:hover .copy-btn {
        opacity: 1;
      }
    `}</style>
  )
}
