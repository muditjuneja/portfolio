/** @jsx jsx */
import { Fragment } from "react";
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";

import '../styles/main-1.css'
type PageProps = {
  data: {
    page: {
      title: string
      slug: string
      excerpt: string
      body: string
    }
  }
  [key: string]: any
}

const Page = ({ data: { page } }: PageProps) => (
  <Layout>

    <SEO title={page.title} description={page.excerpt} />
    <Heading as="h3" variant="styles.h3">
      {page.title ? page.title : ''}
    </Heading>

    <section sx={{ my: 5, variant: `layout.content` }}>
      <MDXRenderer>{page.body}</MDXRenderer>
    </section>
  </Layout>
)

export default Page
