import React, { useRef, useEffect } from 'react';
import "./styles.css"
import { useIntersectionObserver } from '@asyarb/use-intersection-observer';

const InfiniteScroll = ({ has_more, fetchData, children  }) => {
    const ref = useRef()

  // Get the visibility boolean directly from the hook:
  const inView = useIntersectionObserver({
    ref,
    options: {
      threshold: 0,
    },
  })

  useEffect(() => {
    if (inView && has_more) {
        fetchData()
    }
  }, [inView])

  return (
    <div className="infinite-scroll">
        {children}
        <div ref={ref} className={has_more ? "loader" : ""}></div>
    </div>
  )
}

export default InfiniteScroll;