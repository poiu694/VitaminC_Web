import cn from '@/utils/cn'
import { motion } from 'framer-motion'

const ChatLoadingDot = ({ className }: { className?: string }) => {
  const container = {
    animate: {
      transition: {
        staggerChildren: 0.36,
      },
    },
  }

  const dotAnimation = {
    initial: { y: 0, backgroundColor: '#EFEFFD' },
    animate: {
      y: [0, -3, 0, 0],
      backgroundColor: ['#EFEFFD', '#FFDE59', '#EFEFFD', '#EFEFFD'],
      transition: {
        duration: 0.36 * 3,
        times: [0, 0.333, 0.666, 1],
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 0.36,
      },
    },
  }

  return (
    <motion.div
      className={cn('flex items-center justify-center gap-1', className)}
      variants={container}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="relative h-[5px] w-[5px] rounded-full bg-purple-50"
        variants={dotAnimation}
      />
      <motion.div
        className="relative h-[5px] w-[5px] rounded-full bg-purple-50"
        variants={dotAnimation}
      />
      <motion.div
        className="relative h-[5px] w-[5px] rounded-full bg-purple-50"
        variants={dotAnimation}
      />
    </motion.div>
  )
}

export default ChatLoadingDot
