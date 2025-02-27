import React from "react"

export default function TextButton({
  id,
  btnName,
  onClick,
  btnColor,
  textColor,
  hoverColor,
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`${btnColor} ${textColor} rounded-lg border hover:${hoverColor} hover:cursor-pointer mb-1 px-2`}
    >
      <p className="font-semibold p-2 text-sm">{btnName}</p>
    </button>
  )
}
