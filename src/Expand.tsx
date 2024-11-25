import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode, useEffect, useRef, useState} from "react";
import {twMerge} from "tailwind-merge";

export interface ExpandProps {
  children?: ReactNode;
  className?: string;
  initial?: boolean;
  layout?: boolean;
}

export default function Expand({children, className, initial, layout}: ExpandProps) {
  const [height, setHeight] = useState<number | 'auto'>('auto')
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height
        setHeight(observedHeight)
      })

      resizeObserver.observe(ref.current)

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <AnimatePresence initial={initial}>
      <motion.div className="overflow-y-hidden" animate={{height}} layout={layout}>
        <div className={twMerge('p-1', className)} ref={ref}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}