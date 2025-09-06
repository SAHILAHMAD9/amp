import React from 'react'

export const TableHeader = () => {
  return (
      <div className='max-w-[1080px] grid-cols-8 bg-gray-100 rounded-md border-gray-200  border-b-2 h-12 items-center  font-semibold grid'>
          <h1 className='col-span-3'>Company</h1>
          <h1 className='col-span-2 '>Apply</h1>
          <h1 className='col-span-2 '>Position</h1>
          <h1 className='col-span-1  '>Visa Sponser</h1>
    </div>
  )
}
