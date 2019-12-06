import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Image = ({ image, withFallback = false, ...props }) => {
  const data = useStaticQuery(graphql`
      query {
          fallBackImage: file(relativePath: { eq: "fallback.svg" }) {
              publicURL
          }
      }
  `)

  /**
   * Return fallback Image, if no Image is given.
   */
  if (!image) {
    return withFallback ? <img src={data.fallBackImage.publicURL} alt={"Fallback"} {...props}/> : null
  }

  return <img src={image.sourceUrl} alt={image.altText} {...props}/>
}

export default Image
