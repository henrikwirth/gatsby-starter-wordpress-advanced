module.exports = (imports) => {
  return`
import React from "react"

import Layout from "../src/components/Layout"
import SEO from "../src/components/SEO"

// Sections
${imports.map(({ name, filePath }) => `import ${name} from '${filePath}';`).join('\n')}

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
          ${imports.map(({ name, dataName }) => {
            return `
              if (layout.fieldGroupName === '${dataName}') {
                  return <${name} {...layout} key={index} />;
              }
            `
          }).join('\n')}
        })
      }

    </Layout>
  )
}

export default Page
  `
}
