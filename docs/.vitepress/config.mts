import { text } from 'stream/consumers'
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
    },
    lineNumbers:true
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
            link: '/vue/'
          },
          {
            text: 'react',
            link: '/react/'
          },
          {
            text: 'database',
            link: '/database/'
          },
          {
            text: 'linux',
            link: '/linux/'
          },
          {
            text: 'docker',
            link: '/docker/'
          }
        ]
      },
      {
        text: '后端',
        items: [
          {
            text: 'nest',
            link: '/nest/'
          },
          {
            text: 'python',
            items:[
              {
                text:'基础篇',
                link: '/python/base/'
              },{
                text:'进阶篇',
                link: '/python/advance/'
              }
              
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/profile': [
        {
          text: '简介',
          items: [{ text: 'profile', link: '/profile' }]
        }
      ],
      '/vue': [
        {
          items: [
            {
              text: 'vue',
              link: '/vue/'
            }
          ]
        }
      ],
      '/database': [
        {
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
                  link: '/database/mysql/advance'
                },
                {
                  text: '运维篇',
                  link: '/database/mysql/ops'
                }
              ]
            },
            {
              text: 'redis',
              collapsed: true,
              items: [
                {
                  text: '基础篇',
                  link: '/database/redis/'
                }
              ]
            }
          ]
        }
      ],
      '/linux': [
        {
          text: 'linux',
          link: '/linux/'
        }
      ],
      '/docker': [
        {
          text: 'docker',
          link: '/docker/'
        }
      ],
      '/python': [
        {
          items: [
            {
              collapsed: true,
              text: '基础篇',
              items: [
                {
                  text: '第一阶段',
                  link: '/python/base/',
                  collapsed:true,
                  items:[
                    {
                      text: 'python基础综合案例',
                      link: '/python/base/python-base-case'
                    }
                  ]
                },{
                  text: '第二阶段',
                  link: '/python/base/python-second-stage'
                },
                {
                  text: '第三阶段',
                  link: '/python/base/python-third-stage'
                }
              ]
            },{
              text: '进阶篇',
              link: '/python/advance/',
              collapsed:true,
              items:[
                {
                  
                }
              ]
            }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://gitee.com/fddm' }],
    search: {
      provider: 'local'
    }
  },
  srcDir: 'content'
})
