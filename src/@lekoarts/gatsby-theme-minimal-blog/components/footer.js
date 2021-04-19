/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"


const Footer = () => {
  const data = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            siteTitleAlt
            siteHeadline
            siteUrl
            siteDescription
            siteLanguage
            siteImage
            author
          }
        }
      }
    `)
  const { siteTitle } = data.site.siteMetadata;

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
      </div>
      {/* <div>
        <Link
          aria-label="My github"
          href="https://github.com/muditjuneja"
        >
          Theme
        </Link>
        {` `}
        by
        {` `}
        <Link aria-label="Link to the theme author's website" href="https://www.lekoarts.de/en">
          LekoArts
        </Link>
      </div> */}
    </footer>
  )
}

export default Footer
