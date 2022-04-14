import React from 'react'
import "./style.css"

const ImageCard = ({ src = "", alt = "", onClick }) => {
  return (
        <img className="ImageCard" src={src} alt={alt} onClick={onClick} />
    )
}

export default ImageCard