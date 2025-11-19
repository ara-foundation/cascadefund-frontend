import { motion } from 'framer-motion'
import { MessageSquare, Trophy, Zap, DollarSign } from 'lucide-react'
import { GravityStarsBackground } from '../animate-ui/components/backgrounds/gravity-stars'
import { Accent, data } from '@/scripts/data'

const HowItWorks = ({ accent }: { accent: Accent }) => {
  const steps = [
    {
      number: "01",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Social Media",
      description: "CascadeFund is like a social media on top of the GitHub repository.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      icon: <Trophy className="w-8 h-8" />,
      title: "Collaboration flow",
      description:
        "Social interaction followes standardized workflow: Users open an issue, contributors submit patches, maintainers manage the releases, " +
        "and rating is automatically rewarded to every participant.",
      // description: "All activities, such as message replies, roadmap planning, issue readings are turned into quest tasks. Each task contributes to the collaborative rating that reflects how you work with others.",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: <Zap className="w-8 h-8" />,
      title: "Self-checking todo list",
      description: "For collaboration flow, we adapted e-procurement for web collaboration. Due to well established process, project management automated so much, that it feels like notification checkings.",
      color: "from-green-500 to-emerald-500"
    },
    {
      "number": "04",
      "icon": <DollarSign className="w-8 h-8" />,
      "title": "Rating is a shared reward",
      "description": "When an issue is solved, everyone involved earns rating. It highlights your work, boosts project trust, and you can share it with contributors.",
      "color": "from-orange-500 to-red-500"
    },
    {
      "number": "05",
      "icon": <Zap className="w-8 h-8" />,
      "title": "Optional Paywall With Shared Governance",
      "description": "Users may contribute financially, and in return they gain voting power to decide the issue's rating points. This boosts rewards for everyone while preventing pay-to-increase rating.",
      "color": "from-purple-500 to-pink-500"
    }

  ]

  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-gray-800 dark:to-slate-900">
      <GravityStarsBackground
        starsCount={100}
        starsSize={2}
        starsOpacity={0.75}
        glowIntensity={15}
        glowAnimation="ease"
        movementSpeed={0.3}
        mouseInfluence={100}
        mouseGravity="attract"
        gravityStrength={75}
        starsInteraction={true}
        starsInteractionType="bounce"
        className="absolute text-blue-600 dark:text-blue-400 left-0 top-0 w-full h-full" />
      <div className="section-padding max-w-7xl mx-auto relative ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-400 mb-6">
            What is <span className="gradient-text">CascadeFund</span>?
          </h3>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Textual description of the platform. Visual representations coming soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-60 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200/50 dark:border-neutral-700/50 min-h-55 h-auto">
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="font-mono text-sm font-semibold text-neutral-400 dark:text-neutral-500">
                        {step.number}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl pl-10 text-gray-600 dark:text-gray-100">
              <h3 className="font-display text-2xl font-bold mb-6 mt-6">
                How to {data[accent].title.toLowerCase()}?
              </h3>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto text-gray-600/90 dark:text-gray-400/90">
                {data[accent].howTo}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
