if (process.env.SUB) {
  var base_site = '/' + process.env.SUB
} else {
  var base_site = '/'
}

module.exports = {
  base: base_site,
  title: 'Documentation of PPIO and POSS',
  port: 8001,
  description: 'The documentation, system design guide, api reference and command line tool reference of PPIO. PPIO is a private, stable and affordable programmable decentralized cloud storage.',
  ga: 'UA-128641089-2',
  head: [
    ['meta', { name: 'description', content: 'The documentation, system design guide, api reference and command line tool reference of PPIO. PPIO is a private, stable and affordable programmable decentralized cloud storage.'}],
    ['meta', { name: 'keywords', content: 'system design, get started, get starting, api reference, command line tool, PPIO, ppio, ppio sdk'}],
    ['meta', { name: 'author', content: 'PPIO, Inc.'}],
    ['meta', { property: 'og:type', content: 'website'}],
    ['meta', { property: 'og:site_name', content: 'PPIO'}],
    ['meta', { property: 'og:title', content: 'PPIO: A private, stable and affordable programmable decentralized cloud storage.'}],
    ['meta', { property: 'og:description', content: 'The documentation, system design guide, api reference and command line tool reference of PPIO.'}],
    ['meta', { property: 'og:url', content: 'https://docs.pp.io'}],
    ['meta', { property: 'og:image', content: 'https://pp.io/share.png'}],
    ['meta', { property: 'og:image:alt', content: 'PPIO'}],
    ['meta', { property: 'twitter:card', content: 'summary_large_image'}],
    ['meta', { property: 'twitter:site', content: '@PPLabs_PPIO'}],
    ['meta', { property: 'twitter:creator', content: '@PPLabs_PPIO'}],
    ['meta', { property: 'twitter:title', content: 'PPIO: A private, stable and affordable programmable decentralized cloud storage.'}],
    ['meta', { property: 'twitter:description', content: 'The documentation, system design guide, api reference and command line tool reference of PPIO.'}],
    ['meta', { property: 'twitter:url', content: 'https://docs.pp.io'}],
    ['meta', { property: 'twitter:image', content: 'https://pp.io/share.png'}],
    ['link', { rel: 'icon', href: '/favicon.png'}],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans|Roboto' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css' }]
  ],
  markdown: {
   config: md => {
     md.set({ breaks: true })
     md.use(require('markdown-it-katex'))
   },
   anchor: {
     permalinkSymbol: '¶'
   },
  },
  themeConfig: {
    logo: '/logo.png',
    search: true,
    displayAllHeaders: false,
    activeHeaderLinks: true,
    nav: [
      { text: 'Docs', class: 'active', link: '/' },
      { text: 'Download', internal: true, link: 'https://www.pp.io/download.html' },
      { text: 'Blog', internal: true, link: 'https://blog.pp.io' },
      { text: 'Discrod', link: 'https://discord.gg/wAUED89' },
      { text: 'Github', link: 'https://github.com/ppio' },
    ],
    sidebar: {
      '/guide/': [
        '',
       'System_Design',
       'P2P_Network',
       'Four_Proof_Algorithms',
       'Five_Kinds_of_Attacks',
       'Architecture',
       {
          title: 'Others',
          collapsable: false,
          children: [
            'others/About_PPLabs',
            'others/Why_Do_Want_To_Design_PPIO'
          ]
        },
     ],
     '/concept/': [
       '',
     ],
     '/wallet/': [
       '',
     ],
     '/api/':[
       '',
     ],
     '/cli/':[
       '',
     ],
     '/sdk/': [
       '',
       'Nodejs',
     ]
    },
    sidebarDepth: 1,
    lastUpdated: 'last modified',
    docsRepo: 'PPIO/documentation',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub'
  }
}
