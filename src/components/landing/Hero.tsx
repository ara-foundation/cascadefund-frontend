import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'
import Button from '../custom-ui/Button'
import SuccessModal from './SuccessModal'
import { handleJoinWishlist } from '@/scripts/landing'
import PreviewContainer from './PreviewContainer'
import { Accent, data, accentToUrl } from '@/scripts/data'
import Link from '../custom-ui/Link'
import BorderBeam from '../ui/border-beam'
import { getIcon, IconType } from '../icon'
import Logo from './Logo'

interface HeroProps {
  accent?: Accent | string
  homePage?: string
}

const Hero = ({ accent = Accent.monetizationPrimaryAccent, homePage = '/' }: HeroProps) => {
  const accentKey = (accent as Accent) || Accent.monetizationPrimaryAccent
  const accentData = data[accentKey]
  const [terminalText, setTerminalText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const fullText = 'visit https://app.cascadefund.org/'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoinWishlist('hero', 'hero-turnstile-container', email, setIsLoading, setError, setShowSuccessModal, setEmail)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20"></div>

      <div className="section-padding w-full max-w-8xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            <Logo imgSize="h-20 w-20" />
          </h1>
          <BorderBeam
            className="block p-3 mx-auto"
            bottomOnly={true}
          >
            <p className="text-xl sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 font-mono max-w-8xl mx-auto leading-relaxed">
              <strong>Social Media + Collaboration Platform</strong> for
              open source maintainers.
            </p>
          </BorderBeam>

        </motion.div>

        <div className="text-center flex items-center justify-center">
          <motion.ul
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-0"
          >
            {Object.values(Accent).filter((accent_ => accent_ !== accent)).map((accent, index) => {
              const accentData = data[accent]
              const url = accentToUrl[accent]
              return (
                <motion.li
                  key={accent}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                >
                  <Link asNewTab={true} className="font-mono text-xs text-gray-400 ml-1" uri={url}>
                    <div className="text-left flex gap-2 transition-colors cursor-pointer h-full">
                      {getIcon({ iconType: accentData.icon as IconType, className: 'w-8 h-8 animate-pulse text-teal-500' })}
                      <h3 className="font-mono text-lg font-semibold text-gray-600 dark:text-slate-500 mb-2 hover:text-blue-400 transition-colors">
                        {accentData.title}
                      </h3>
                    </div>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className=" mx-auto"
          >
            {/* Terminal Window */}
            <BorderBeam
              className='relative p-5'
              isHovered={true}
            >

              <PreviewContainer
                previewUrl=''
                className='relative z-2'
                childrenClassName='flex flex-col items-center justify-center'>
                <div className="font-mono text-green-400 mt-4 text-xl">
                  {data[accentKey].title}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError(null)
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="user@example.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xs text-green-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-400 font-mono">{error}</p>
                    )}
                  </div>
                  <div id="hero-turnstile-container">

                  </div>
                  <Button
                    variant="success"
                    focus={true}
                    className="h-12 group w-full md:w-60 flex items-center justify-center space-x-2 sm:w-full sm:mb-2"
                    onClick={() => handleJoinWishlist('hero', 'hero-turnstile-container', email, setIsLoading, setError, setShowSuccessModal, setEmail)}
                    disabled={isLoading}
                  >
                    <Terminal className="w-4 h-4" />
                    <span>{isLoading ? 'Joining...' : 'Join Beta Wishlist'}</span>
                    {!isLoading && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs font-mono mt-1">
                  Two emails only, one to notify our launch, one is surprise.
                </p>

              </PreviewContainer>
              <div
                className='z-1 absolute top-1 left-1 right-1 bottom-1 shadow-lg shadow-teal-400/40 animate-pulse border-none bg-transparent'
              >
              </div>
            </BorderBeam>
          </motion.div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </section >
  )
}

export default Hero
