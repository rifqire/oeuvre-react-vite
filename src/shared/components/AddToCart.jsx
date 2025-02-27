import React from "react"
import IconButton from "./IconButton"

export default function AddToCart({
  header,
  type,
  price,
  name,
  icon,
  onClick,
  btnColor,
}) {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row justify-between mt-6">
        <p className="mb-2">
          <p className="sm-blue">{header}</p>
          <p className="sm-black mb-2">{type}</p>
        </p>
        <p className="lg-semibold-black me-4">Rp{price}</p>
      </div>
      <IconButton
      id="btn-cart"
        btnName={name}
        btnIcon={icon}
        onClick={onClick}
        color="bg-indigo-500"
        textColor="text-white"
        hoverColor="bg-indigo-700"
      />
      <p className="sm-semibold-gray pt-5 my-4">About shipping:</p>
      <p className="sm-semibold-gray font-semibold mb-2">
        1. Ships within X days
      </p>
      <p className="sm-black mb-4">
        The product will be shipped in X days after the seller packed and sealed
        the item, and the airway bill will be sent to you via email.
      </p>
      <p className="sm-semibold-gray mb-2">2. Available to download</p>
      <p className="sm-black mb-4">
        You will be able to download the digital product at any time after
        the product is sent to your email.
      </p>
    </div>
  )
}
