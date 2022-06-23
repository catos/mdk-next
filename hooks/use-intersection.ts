// https://github.com/streamich/react-use/blob/master/src/useIntersection.ts

import React, { RefObject, useEffect, useState } from "react"

export const useInfiniteScroll = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
      const options = {
        // root: document.querySelector('#scroll-area'),
        rootMargin: "0px",
        threshold: 1.0,
      }

      const observer = new IntersectionObserver(
        ([e]) => setIsIntersecting(e.isIntersecting),
        options
      )

      observer.observe(ref.current)

      return () => {
        setIsIntersecting(false);
        observer.disconnect();
      }
    }
    return () => {}
  }, [ref])

  useEffect(() => {
    if (!isIntersecting) return

    callback()

  }, [callback, isIntersecting])

  return [isIntersecting, setIsIntersecting]
}
