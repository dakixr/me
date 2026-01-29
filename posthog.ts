import { PostHog } from "posthog-node"

export default function PostHogClient() {
  const apiKey = process.env.POSTHOG_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("POSTHOG_API_KEY is not set; PostHog client disabled.")
    }
    return null
  }

  const posthogClient = new PostHog(apiKey, {
    host: "https://eu.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}
