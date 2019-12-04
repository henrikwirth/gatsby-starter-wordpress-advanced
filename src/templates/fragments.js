
module.exports.fluidImageFragment = () => {
  return `
    fragment GatsbyImageSharpFluid_tracedSVG on ImageSharpFluid {
      tracedSVG
      aspectRatio
      src
      srcSet
      sizes
    }
  `
}

// module.exports.fluidImageFragment = fluidImageFragment
