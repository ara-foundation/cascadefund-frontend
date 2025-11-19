import React from 'react'
import { FaYoutube, FaGithub, FaTwitter, FaTelegram } from 'react-icons/fa'
import { getIcon } from '../icon'
import { SocialLink as SocialLinkType, SocialLinkType as LinkType } from '@/scripts/data'
import { motion } from 'framer-motion'

interface SocialLinkProps {
  link: SocialLinkType
  className?: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ link,
  className = "p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
}) => {
  // Brand colors for each social platform
  const brandColors: Record<LinkType, string> = {
    github: '#181717', // GitHub dark gray/black
    telegram: '#0088cc', // Telegram blue
    youtube: '#FF0000', // YouTube red
    twitter: '#000000', // Twitter/X black
    bluesky: '#00A3FF', // Bluesky blue
  }

  // Tailwind color classes for custom icons (bluesky)
  const brandColorClasses: Record<LinkType, string> = {
    github: 'text-gray-900', // GitHub dark gray/black
    telegram: 'text-[#0088cc]', // Telegram blue
    youtube: 'text-red-600', // YouTube red
    twitter: 'text-gray-900', // Twitter/X black
    bluesky: 'text-[#00A3FF]', // Bluesky blue
  }

  const renderIcon = () => {
    if (link.useCustomIcon) {
      return getIcon({
        iconType: link.type as any,
        className: brandColorClasses[link.type]
      })
    }

    const iconMap: Record<LinkType, React.ReactNode> = {
      github: <FaGithub color={brandColors.github} size={20} />,
      telegram: <FaTelegram color={brandColors.telegram} size={20} />,
      youtube: <FaYoutube color={brandColors.youtube} size={20} />,
      twitter: <FaTwitter color={brandColors.twitter} size={20} />,
      bluesky: getIcon({ iconType: 'bluesky', className: brandColorClasses.bluesky }),
    }

    return iconMap[link.type]
  }

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Visit our ${link.type} page`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 * 0.1 }}
      whileHover={{ y: -2 }}
    >
      {renderIcon()}
    </motion.a>
  )
}

export default SocialLink

