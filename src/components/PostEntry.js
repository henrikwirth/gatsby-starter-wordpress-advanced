import React from "react"
import { Link } from "gatsby"
import Image from "./Image"
import { blogURI } from "../../globals"

const PostEntry = ({ post }) => {

  const { uri, title, featuredImage, excerpt } = post

  return (
    <div style={{ marginBottom: "30px" }}>
      <header>
        <Link to={`${blogURI}/${uri}/`}>
          <h2 style={{ marginBottom: "5px" }}>{title}</h2>
          <Image image={featuredImage} style={{ margin: 0 }}/>
        </Link>

      </header>

      <div dangerouslySetInnerHTML={{ __html: excerpt }}/>
    </div>
  )
}

export default PostEntry
