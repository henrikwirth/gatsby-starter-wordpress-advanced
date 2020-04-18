const PageTemplateFragment = `
    fragment PageTemplateFragment on WPGraphQL_Page {
        id
        title
        pageId
        content
        uri
        slug
        isFrontPage
        featuredImage {
            sourceUrl
            altText
            imageFile {
                childImageSharp {
                    fluid(maxHeight: 400, maxWidth: 800, quality: 90, cropFocus: CENTER) {
                        ...GatsbyImageSharpFluid_tracedSVG
                    }
                }
            }
        }
    }
`

module.exports.PageTemplateFragment = PageTemplateFragment
