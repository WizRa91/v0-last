import type React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  EmailShareButton,
} from "react-share"
import { FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon, EmailIcon } from "react-share"

interface SocialShareButtonsProps {
  url: string
  title: string
  body?: string
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, title, body }) => {
  return (
    <div className="flex space-x-2">
      <FacebookShareButton url={url} quote={title}>
        <button className="rounded-full w-10 h-10 theme-secondary-bg hover:bg-[var(--custom-accent)]/20 text-[var(--custom-accent)] dark:bg-gray-700 dark:hover:bg-gray-600">
          <FacebookIcon
            size={32}
            round
            iconFillColor="currentColor"
            logoFillColor="currentColor"
            className="w-5 h-5 theme-accent-text"
          />
        </button>
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <button className="rounded-full w-10 h-10 theme-secondary-bg hover:bg-[var(--custom-accent)]/20 text-[var(--custom-accent)] dark:bg-gray-700 dark:hover:bg-gray-600">
          <TwitterIcon
            size={32}
            round
            iconFillColor="currentColor"
            logoFillColor="currentColor"
            className="w-5 h-5 theme-accent-text"
          />
        </button>
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} summary={body} source={url}>
        <button className="rounded-full w-10 h-10 theme-secondary-bg hover:bg-[var(--custom-accent)]/20 text-[var(--custom-accent)] dark:bg-gray-700 dark:hover:bg-gray-600">
          <LinkedinIcon
            size={32}
            round
            iconFillColor="currentColor"
            logoFillColor="currentColor"
            className="w-5 h-5 theme-accent-text"
          />
        </button>
      </LinkedinShareButton>

      <RedditShareButton url={url} title={title}>
        <button className="rounded-full w-10 h-10 theme-secondary-bg hover:bg-[var(--custom-accent)]/20 text-[var(--custom-accent)] dark:bg-gray-700 dark:hover:bg-gray-600">
          <RedditIcon
            size={32}
            round
            iconFillColor="currentColor"
            logoFillColor="currentColor"
            className="w-5 h-5 theme-accent-text"
          />
        </button>
      </RedditShareButton>

      <EmailShareButton url={url} subject={title} body={body}>
        <button className="rounded-full w-10 h-10 theme-secondary-bg hover:bg-[var(--custom-accent)]/20 text-[var(--custom-accent)] dark:bg-gray-700 dark:hover:bg-gray-600">
          <EmailIcon
            size={32}
            round
            iconFillColor="currentColor"
            logoFillColor="currentColor"
            className="w-5 h-5 theme-accent-text"
          />
        </button>
      </EmailShareButton>
    </div>
  )
}

export default SocialShareButtons
