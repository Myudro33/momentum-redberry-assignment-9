import React from 'react'

const TheButton = (props) => {
  return (
    <button style={props.style} type={props.type} onClick={props.onClick} className={`py-2.5 px-5  cursor-pointer   ${props.solid?'bg-[color:var(--solid-button)] hover:bg-[color:var(--hover-button)]  text-white':"border border-[color:var(--solid-button)] hover:border-[color:var(--hover-button)] "} ${props.rounded?'rounded-[1.3rem]':'rounded-[.3rem]'} `} >
      {props.text}
    </button>
  )
}

export default TheButton
