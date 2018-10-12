module.exports = {
  base: '/',
  title: '',
  description: 'The api reference, command line tool reference and system design guide of PPIO.',
  port: 8001,
  head: [
    ['link', {rel: 'icon', href:'/favicon.png'}],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
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
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Projects', internal: true, link: 'https://pp.io/projects.html' },
      { text: 'Blog', link: 'https://blog.pp.io' },
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
       'Command_Line_Tool',
       'PPIO_SDK',
       {
          title: 'Others',
          collapsable: false,
          children: [
            'others/About_PPLabs',
            'others/Why_Do_Want_To_Design_PPIO'
          ]
        },
     ],
     '/api/':[
       '',
     ],
     '/cli/':[
       ''
     ]
    },
    sidebarDepth: 1,
    lastUpdated: 'last modified',
    docsRepo: 'PPIO/documentation',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub'
  }
}
