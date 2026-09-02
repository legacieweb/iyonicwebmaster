import { useEffect } from 'react'

const DEFAULT_TITLE = 'Iyoni Corp | Digital Businesses & Technology'
const DEFAULT_DESCRIPTION = "Iyoni Corp creates digital businesses and technology products that help entrepreneurs own, build, and grow online. Explore IyonicWeb, IyonicPay, and IyonicBots."

const usePageMeta = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription = document.querySelector('meta[name="description"]')?.content

    if (title) {
      document.title = title
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }

    return () => {
      if (previousTitle) document.title = previousTitle
      if (previousDescription !== undefined) {
        let meta = document.querySelector('meta[name="description"]')
        if (meta) meta.content = previousDescription
      }
    }
  }, [title, description])
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION }
export default usePageMeta
