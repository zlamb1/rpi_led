import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode} from "react";
import useMeasure from "react-use-measure";
import {twMerge} from "tailwind-merge";

export interface ExpandProps {
  children?: ReactNode;
  className?: string;
  initial?: boolean;
  layout?: boolean;
}

export default function Expand({children, className, initial, layout}: ExpandProps) {
  const [ref, {height}] = useMeasure();

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