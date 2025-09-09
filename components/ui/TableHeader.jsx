import React from 'react'
import { BrainCircuit } from 'lucide-react'

const headerConfig = [
  {
  classname: "col-span-3",
    text: (
      <span className="flex items-center gap-2">
        <BrainCircuit className='text-emerald-600 w-5 h-5' />
        Company
      </span>
    )
  },
  {
    classname: "col-span-2 px-4",
    text: "Apply"
  }, {
    classname: "col-span-2",
    text: "Position"
  }, {
    classname: "col-span-1",
    text: "Visa Sponser"
  }]

export const TableHeader = () => {
  return (
    <div className='w-[1080px] sm:w-full grid-cols-8 bg-gray-100 rounded-md border-gray-200 gap-4 px-2 border-b-2 h-12 items-center text-left  font-semibold grid'>
      {headerConfig.map((item,index) => (
        <h1 className={item.classname} key={index}>{item.text}</h1>
         ))}
    </div>
  )
}
