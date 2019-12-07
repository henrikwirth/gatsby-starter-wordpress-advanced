const FluidImageFragment = `
    fragment GatsbyImageSharpFluid_tracedSVG on ImageSharpFluid {
        tracedSVG
        aspectRatio
        src
        srcSet
        sizes
    }
`

module.exports.FluidImageFragment = FluidImageFragment
