import React from "react"
import GatsbyImage from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"


const FluidImage = ({image, ...props}) => {
  const data = useStaticQuery(graphql`
      query {
          fallbackImage: file(relativePath: { eq: "fallback.svg" }) {
              publicURL
          }
      }
  `)

  if(!image) {
    return <img src={data.fallbackImage.publicURL} alt={"Fallback"} {...props}/>
  }

  if(image && image.imageFile) {
    return <GatsbyImage fluid={image.imageFile.childImageSharp.fluid} alt={image.altText} {...props}/>
  } else {
    console.log(image)
    return <img src={image.sourceUrl} alt={image.altText} {...props}/>
  }

}

export default FluidImage
