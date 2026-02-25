import { z } from 'astro/zod'

export const HeaderMenuSchema = () =>
  z
    .array(
      z.object({
        title: z.string(),
        link: z.string()
      })
    )
    .default([
      { title: 'About', link: '/myHackingPage/about' },
      { title: 'Blog', link: '/myHackingPage/blog' },
      { title: 'Projects', link: '/myHackingPage/projects' }
      // { title: 'Links', link: '/myHackingPage/links' }
    ])
    .describe('The header menu items for your site.')
