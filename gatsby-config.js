// https://dev.to/ekafyi/gatsby-theme-shadowing-for-beginners-how-i-built-a-starter-for-lekoarts-minimal-blog-theme-1lfm


require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  // pathPrefix: `/me`,
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Mudit Juneja`,
    // Default title of the page
    siteTitleAlt: `Mudit Juneja - Full-stack, DevOps`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Mudit Juneja - Full-stack, DevOps`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://www.muditjuneja.com`,
    // Used for SEO
    siteDescription: `Mostly about me - Mudit Juneja`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `@being_mudit`,
  },
  plugins: [
    'gatsby-plugin-svg-sprite',
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/being_mudit`,
          },
          {
            name: `Instagram`,
            url: `https://www.instagram.com/being_mudit/`,
          },
          {
            name: 'Github',
            url: `https://github.com/muditjuneja/`,
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
        short_name: `minimal-blog`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          // {
          //   src: `/android-chrome-192x192.png`,
          //   sizes: `192x192`,
          //   type: `image/png`,
          // },
          // {
          //   src: `/android-chrome-512x512.png`,
          //   sizes: `512x512`,
          //   type: `image/png`,
          // },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
