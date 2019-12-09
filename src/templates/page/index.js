import React from "react"

import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import AllLayouts from "../../components/AllLayouts"


const Page = ({ pageContext }) => {
  const {
    page: { title, pageBuilder },
  } = pageContext

  const layouts = pageBuilder.layouts || []

  return (
    <Layout>
      <SEO title={title}/>
      <h1> {title} </h1>

      {
        layouts.map((layout, index) => {
          return <AllLayouts key={index} layoutData={layout} />
        })
      }

    </Layout>
  )
}

export default Page
