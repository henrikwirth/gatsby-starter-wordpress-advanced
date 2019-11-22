import React  from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"


const Page = ({ pageContext }) => {
  const {
    page: { id, postId, title, content, excerpt },
  } = pageContext;

  return (
    <Layout>
      <SEO title={title} />

      <h1> {title} </h1>
      <div dangerouslySetInnerHTML={{__html: content}} />

    </Layout>
  )
}

export default Page
