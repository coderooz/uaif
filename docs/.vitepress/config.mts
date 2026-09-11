import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'UAIF',
  description:
    'Universal Application Integration Framework — Provider-independent integration layer for modern applications',
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['meta', { name: 'theme-color', content: '#0f172a' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'UAIF — Universal Application Integration Framework' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Build stable application integrations without coupling application code to provider-specific implementations.',
      },
    ],
    ['meta', { property: 'og:image', content: '/og/uaif-og.png' }],
    ['meta', { property: 'og:url', content: 'https://uaif.dev' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'UAIF — Universal Application Integration Framework' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Build stable application integrations without coupling application code to provider-specific implementations.',
      },
    ],
    ['meta', { name: 'twitter:image', content: '/og/uaif-og.png' }],
  ],

  cleanUrls: true,

  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/brand/uaif-symbol.svg',
    siteTitle: 'UAIF',

    nav: [
      { text: 'Guide', link: '/getting-started', activeMatch: '/getting-started|/concepts|/architecture' },
      { text: 'CLI', link: '/cli/', activeMatch: '/cli/' },
      { text: 'Providers', link: '/providers/', activeMatch: '/providers/' },
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/coderooz/uaif/blob/main/CHANGELOG.md' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is UAIF?', link: '/' },
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Core Concepts', link: '/concepts' },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'Contracts', link: '/architecture/contracts' },
            { text: 'Registry', link: '/architecture/registry' },
            { text: 'Compatibility', link: '/architecture/compatibility' },
            { text: 'Resolver', link: '/architecture/resolver' },
          ],
        },
        {
          text: 'CLI',
          items: [
            { text: 'Overview', link: '/cli/' },
            { text: 'Commands', link: '/cli/commands' },
          ],
        },
        {
          text: 'Providers',
          items: [
            { text: 'Overview', link: '/providers/' },
            { text: 'Clerk', link: '/providers/clerk' },
            { text: 'Firebase Auth', link: '/providers/firebase-auth' },
            { text: 'MongoDB', link: '/providers/mongodb' },
            { text: 'Cloudinary', link: '/providers/cloudinary' },
          ],
        },
        {
          text: 'Guides',
          items: [
            { text: 'Adding Providers', link: '/guides/adding-providers' },
            { text: 'Creating Adapters', link: '/guides/creating-adapters' },
            { text: 'Integration Manifest', link: '/guides/manifest' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'API Reference', link: '/api/' },
            { text: 'Troubleshooting', link: '/troubleshooting' },
          ],
        },
        {
          text: 'Project',
          items: [
            { text: 'Contributing', link: '/contributing' },
            {
              text: 'GitHub',
              link: 'https://github.com/coderooz/uaif',
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/coderooz/uaif' },
    ],

    editLink: {
      pattern: 'https://github.com/coderooz/uaif/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Coderooz',
    },
  },
});
