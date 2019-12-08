import React from "react"
import FluidImage from "../../components/FluidImage"

const Hero = ({ image, text, textColor }) => {

  return (
    <section style={{ position: "relative" }}>
      <FluidImage image={image} style={{marginBottom: '15px'}}/>
      <p style={{
        color: textColor,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: '40px',
        textAlign: 'center',
        paddingTop:'80px',
        lineHeight: 1,
      }}>{text}</p>

    </section>
  )
}

export default Hero
