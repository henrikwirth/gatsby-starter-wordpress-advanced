import React from "react"

const TextBlock = ({ text, textColor, backgroundColor }) => {

  return (
    <section style={{backgroundColor: backgroundColor}}>
      <div style={{
        color: textColor,
        padding: '30px'
      }}>
        <div style={{
          color: textColor,
          textAlign: 'left',
        }} dangerouslySetInnerHTML={{__html: text}} />
      </div>

    </section>
  )
}

export default TextBlock
