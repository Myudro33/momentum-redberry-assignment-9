import React from 'react'
import TheButton from '../TheButton'

const FilterByDepartment = ({show,departments}) => {
  return (
    <div
    className={`absolute top-14 p-3 -left-6 w-[43rem] bg-white border border-[color:var(--solid-button)] rounded-[.625rem] ${
      show ? "block" : "hidden"
    } flex flex-wrap gap-2 `}
  >
    {departments &&
      departments.map((department) => (
        <div
          className="w-[45%] h-8 flex items-center font-normal text-sm"
          key={department.id}
        >
          <input
            value={department.name}
            id={department.name}
            className="w-5 h-5 shrink-0 cursor-pointer"
            type="checkbox"
          />
          <label className="ml-2 text-xs cursor-pointer" htmlFor={department.name}>
            {department.name}
          </label>
        </div>
      ))}
      <TheButton type='button' rounded solid style={{position:'absolute',bottom:10,right:10,height:'35px',alignItems:'center',display:'flex'}} text="არჩევა" />
  </div>
  )
}

export default FilterByDepartment
