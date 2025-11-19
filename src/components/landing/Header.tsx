import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Logo from './Logo'
import Link from '../custom-ui/Link'
import { socialLinks } from '@/scripts/data'
import SocialLink from './SocialLink'


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ThemeProvider>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700 dark:border-gray-600'
          : 'bg-transparent'
          }`}
      >
        <nav className="section-padding py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isScrolled ? <Link uri="/"><Logo imgSize="h-6 w-6" /></Link> : null}
              <motion.div className="flex space-x-2">
                {socialLinks.map((link) => (
                  <SocialLink className='mx-4 bg-white/10 rounded-sm p-2 hover:bg-white/20 transition-colors w-8 h-8 flex ' key={link.url} link={link} />
                ))}
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <p className="text-gray-600 dark:text-gray-400 text-xs font-mono">
                View our
                <motion.a
                  target='_blank'
                  href={'https://app.cascadefund.org/'}
                  className={`ml-2 font-mono text-sm text-gray-300 dark:text-gray-300 hover:text-green-400 transition-colors duration-200 relative group ${isScrolled ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  Demo (WIP)
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              </p>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors text-teal-400 hover:text-teal-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-gray-700 dark:border-gray-600 bg-gray-900/95 dark:bg-gray-900/95"
            >
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-xs font-mono">
                  View our
                  <motion.a
                    target='_blank'
                    href={'https://app.cascadefund.org/'}
                    className={`ml-2 font-mono text-sm text-gray-300 dark:text-gray-300 hover:text-green-400 transition-colors duration-200 relative group ${isScrolled ? 'text-gray-300 dark:text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    Demo (WIP)
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                </p>

                {/* <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-sm text-gray-400">Theme:</span>
                  <ThemeToggle />
                </div> */}
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>
    </ThemeProvider>
  )
}

export default Header
