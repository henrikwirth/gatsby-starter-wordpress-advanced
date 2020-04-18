
// This is a temporary generated file. Changes to this file will be overwritten eventually!
import React from "react"

import Layout from "../src/components/Layout"
import SEO from "../src/components/SEO"

// Sections
import Hero from '../src/layouts/Hero';
import TextBlock from '../src/layouts/TextBlock';

const Post = ({ pageContext }) => {
  const {
    post: { title, pageBuilder },
  } = pageContext

  const layouts = pageBuilder.layouts || []

  return (
    <Layout>
      <SEO title={title}/>
      <h1> {title} </h1>

      {
        layouts.map((layout, index) => {
          
              if (layout.fieldGroupName === 'post_Pagebuilder_Layouts_Hero') {
                  return <Hero {...layout} key={index} />;
              }
            

              if (layout.fieldGroupName === 'post_Pagebuilder_Layouts_TextBlock') {
                  return <TextBlock {...layout} key={index} />;
              }
            
        })
      }

    </Layout>
  )
}

export default Post
  