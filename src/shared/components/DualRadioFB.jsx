import React from "react"
import { Label, Radio } from "flowbite-react"

export default function DualRadioFB({
  id,
  nameLabel,
  valueA,
  optionA,
  valueB,
  optionB,
  onChange,
}) {
  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      <Label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 -mt-3"
      >
        {nameLabel}
      </Label>
      <div
        className="flex flex-row gap-5 mb-3 -mt-1"
        onChange={onChange}
      >
        <div className="flex items-center gap-2">
          <Radio id={valueA} name={id} value={valueA} />
          <Label htmlFor={valueA}>{optionA}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id={valueB} name={id} value={valueB} />
          <Label htmlFor={valueB}>{optionB}</Label>
        </div>
      </div>
    </fieldset>
  )
}
