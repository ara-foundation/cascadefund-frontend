import { motion } from "framer-motion";
import { getIcon } from "@/components/icon";

export enum Accent {
    monetizationPrimaryAccent = "monetizationPrimaryAccent",
    formalResponsibleCollaborationAccent = "formalResponsibleCollaborationAccent",
    questSystemAccent = "questSystemAccent",
    timeSavedProjectManagementAccent = "timeSavedProjectManagementAccent",
    // visionaryAccent = "visionaryAccent",
}

export const data: Record<Accent, {
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    howTo?: React.ReactNode;
}> = {
    [Accent.monetizationPrimaryAccent]: {
        icon: 'money',
        title: "Get help with branding and monetization",
        subtitle: "Turning open-source development into a recognized, collaborative, and financially sustainable pursuit.",
        description: "For maintainers, helping with PRs and monetization.",
        howTo: <div>CascadeFund is a social media, where people interact with your work in a formalized way.<br />
            <br />Rating rewards highlight your work, boosts project trust. <br />While, self-checking todo list makes everything almost automatic.</div>,
    },
    [Accent.formalResponsibleCollaborationAccent]: {
        icon: 'project',
        title: "Collaborate in contractlike-workflow",
        subtitle: "Formal definition, and requirements for issues, and adapted century old practice for responsible collaboration. Inspired by government/private contractlike workflows.",
        description: "Formal definition, and requirements for issues, and adapted century old practice for responsible collaboration. Inspired by government/private contractlike workflows.",
        howTo: <motion.ul className="space-y-3">
            <motion.li className="flex items-start gap-3 ml-4">
                <span className="mt-1 flex-shrink-0">
                    {getIcon({ iconType: 'project', className: 'w-5 h-5 text-blue-500' })}
                </span>
                <span>Turn your open-source projects into structured, accountable collaborations:</span>
            </motion.li>
            <motion.li className="flex items-start gap-3 ml-4">
                <span className="mt-1 flex-shrink-0">
                    {getIcon({ iconType: 'issue', className: 'w-5 h-5 text-purple-500' })}
                </span>
                <span>Users open issues, contributors submit patches, and maintainers review and release them.</span>
            </motion.li>
            <motion.li className="flex items-start gap-3 ml-4">
                <span className="mt-1 flex-shrink-0">
                    {getIcon({ iconType: 'work', className: 'w-5 h-5 text-green-500' })}
                </span>
                <span>A self-checking to-do system tracks responsibilities and progress.</span>
            </motion.li>
            <motion.li className="flex items-start gap-3 ml-4">
                <span className="mt-1 flex-shrink-0">
                    {getIcon({ iconType: 'star', className: 'w-5 h-5 text-yellow-500' })}
                </span>
                <span>Shared rating rewards everyone involved, highlighting trust and contributions.</span>
            </motion.li>
            <motion.li className="flex items-start gap-3 ml-4">
                <span className="mt-1 flex-shrink-0">
                    {getIcon({ iconType: 'vote-priority', className: 'w-5 h-5 text-indigo-500' })}
                </span>
                <span>Optional paywall lets participants vote on rating distribution, aligning incentives and governance.</span>
            </motion.li>
        </motion.ul>,
    },
    [Accent.questSystemAccent]: {
        icon: 'play',
        title: "Use gamified guide",
        subtitle: "Turning open-source development into a recognized, collaborative, and financially sustainable pursuit.",
        description: "Turning open-source development into a recognized, collaborative, and financially sustainable pursuit.",
    },
    [Accent.timeSavedProjectManagementAccent]: {
        icon: 'ten-pm-ten-min',
        title: "Manage projects with self-checking todo list",
        subtitle: "Turning open-source development into a recognized, collaborative, and financially sustainable pursuit.",
        description: "Turning open-source development into a recognized, collaborative, and financially sustainable pursuit.",
    },
    // [Accent.visionaryAccent]: {
    // title1: "The first platform for maintainers to grow PRs and support",
    // title2: "Turning open-source development into a recognized, collaborative, and financially sustainable pursuit.",
    // },
}


export const features = [
    {
        // icon: <Code2 className="w-8 h-8" />,
        title: "Collaborative Platform",
        description: "Unified workspace for developers, contributors, and users",
        platform: "github"
    },
    {
        // icon: <Users className="w-8 h-8" />,
        title: "Gamified System",
        description: "Collaboration is two click tasks. Project management = 10 minutes of daily guided tasks.",
        platform: "bitbucket"
    },
    {
        // icon: <Users className="w-8 h-8" />,
        title: "Non-competitive Rating",
        description: "Rating represents how you work with others and on which types of projects.",
        platform: "github"
    },
    {
        // icon: <Zap className="w-8 h-8" />,
        title: "Sustainable Growth",
        description: "Financial sustainability through innovative gamified paywall.",
        platform: "bitbucket"
    }
]

export const accentToUrl: Record<Accent, string> = {
    [Accent.monetizationPrimaryAccent]: '/',
    [Accent.formalResponsibleCollaborationAccent]: '/meta/collaboration',
    [Accent.questSystemAccent]: '/meta/quests',
    [Accent.timeSavedProjectManagementAccent]: '/meta/management',
    // [Accent.visionaryAccent]: '/meta/vision',
}

export type SocialLinkType = 'github' | 'telegram' | 'youtube' | 'twitter' | 'bluesky'

export interface SocialLink {
    url: string
    type: SocialLinkType
    useCustomIcon?: boolean // true for bluesky (uses getIcon), false for react-icons
}

export const socialLinks: SocialLink[] = [
    {
        url: 'https://github.com/ara-foundation/cascadefund-frontend',
        type: 'github',
        useCustomIcon: false,
    },
    {
        url: 'https://t.me/arasangha',
        type: 'telegram',
        useCustomIcon: false,
    },
    {
        url: 'https://www.youtube.com/@medet-ahmetson',
        type: 'youtube',
        useCustomIcon: false,
    },
    {
        url: 'https://x.com/ara_foundation_',
        type: 'twitter',
        useCustomIcon: false,
    },
    {
        url: 'https://bsky.app/profile/cascadefund.bsky.social',
        type: 'bluesky',
        useCustomIcon: true,
    },
]