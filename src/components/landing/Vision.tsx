import React from 'react'
import { motion } from 'framer-motion'
import { Star, TrendingUp, Heart } from 'lucide-react'
import { socialLinks } from '@/scripts/data'
import SocialLink from './SocialLink'

const Vision = () => {
  return (
    <section id="vision" className="py-24 bg-white dark:bg-neutral-900">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-neutral-400 mb-6 flex items-center justify-center gap-4">
            <TrendingUp className="w-10 h-10 text-accent-600 dark:text-neutral-400" />
            Mission
            <span className="gradient-text">Creator Culture</span>
            <Heart className="w-10 h-10 text-primary-600 dark:text-rose-400" />
          </h2>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
            🌐 The web thrives on free and open-source software, built by genuinly good people driven by intrinsic motivation.
          </p>

          <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mt-8 mx-auto leading-relaxed">
            This sparked 💡 the mission of <strong>CascadeFund</strong>: Internet it's where open-source developers and users collaborate creatively for public good 🌟.
          </p>

          {/* <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mt-8 mx-auto font-semibold">
            🚀 How we plan to make it happen 💻✨
          </p>

          <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mt-4 mx-auto leading-relaxed">
            💻✨ Show what developers do.<br />
            🔄🤝 Standardize the interaction cycle to make collaboration responsible and enjoyable.<br />
            👥💡 Open source should be as one, which means code interoprability, and helping each other.<br />
            🌍🚀 Create lasting connections between users and developers, shaping a collaborative world.
          </p> */}

          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mt-8 mx-auto leading-relaxed flex items-center justify-center gap-2">
            💬 Love our vision? Join our community on <SocialLink link={socialLinks[1]} />
          </p>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mx-auto leading-relaxed flex items-center justify-center gap-2">
            or subscribe us on <SocialLink link={socialLinks[4]} /> | <SocialLink link={socialLinks[3]} /> to hear about new channels.
          </p>
        </motion.div>
      </div>
    </section >
  )
}

export default Vision
