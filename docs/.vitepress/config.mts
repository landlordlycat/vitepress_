import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Biscuit',
  // description: 'A VitePress Site',
  head: [
    ['link', { rel: 'icon', href: 'logo.jpg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }]
  ],
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.jpg',
    logoLink: '/',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '前端',
        items: [
          {
            text: 'vue',
            link: '/vue'
          },
          {
            text: 'react',
            link: '/react'
          },
          {
            text: 'database',
            link: '/database/mysql'
          },
          {
            text: 'linux',
            link: '/linux'
          }
        ]
      },
      {
        text: '后端',
        items: [
          {
            text: 'nest',
            link: '/nest'
          }
        ]
      }
    ],

    sidebar: [
      {
        text: '简介',
        items: [{ text: 'profile', link: '/profile' }]
      },
      {
        text: '前端',
        items: [
          {
            text: 'vue',
            link: '/vue'
          },
          {
            text: 'linux',
            link: '/linux/'
          }
        ]
      },
      {
        text: '数据库',
        items: [
          {
            text: 'mysql',
            collapsed: true,
            items: [
              {
                text: '基础篇',
                link: '/database/mysql/'
              },
              {
                text: '进阶篇',
                link: '/database/mysql/advance.md'
              },
              {
                text: '运维篇',
                link: '/database/mysql'
              }
            ]
          }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://gitee.com/fddm' }],
    search: {
      provider: 'local'
    }
  },
  srcDir: 'content'
})
