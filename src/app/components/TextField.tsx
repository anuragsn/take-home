import React from 'react'


interface Props {
  label: string, name: string, inputProps: { type: string, placeholder: string }, onChange: () => void, value: string
}

const TextField = ({ label, name, inputProps, onChange, value }: Props) => {
  return (
    <div className='flex flex-col'>
      <label className="mb-2 text-base text-gray-800">{label}</label>
      <input className="bg-gray-200 py-2 px-3 border-2 outline-none" {...inputProps} onChange={onChange} value={value} name={name} />
    </div>
  )
}

export default TextField