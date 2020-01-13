
module.exports = (postType) => {
  return `
      ... on WPGraphQL_${postType}_Pagebuilder_Layouts_TextBlock {
          fieldGroupName
          text
          textColor
          backgroundColor
      }
  `
}
