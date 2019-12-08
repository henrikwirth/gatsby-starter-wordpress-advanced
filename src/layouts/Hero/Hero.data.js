
module.exports = () => {
  return `
      ... on WPGraphQL_Page_Pagebuilder_Layouts_Hero {
          fieldGroupName
          image {
              sourceUrl
              altText
              imageFile {
                  childImageSharp {
                      fluid(maxHeight: 400, quality: 90, cropFocus: CENTER) {
                          ...GatsbyImageSharpFluid_tracedSVG
                      }
                  }
            }
          }
          text
          textColor
      }
  `
}
