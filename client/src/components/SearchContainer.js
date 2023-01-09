import React from 'react'
import { BiSearchAlt2, BiFilter  } from "react-icons/bi";
const SearchContainer = () => {
  return (
    <>
      <div className='search-container'>
        <div className='sbtn-sinput'>
          <button><BiSearchAlt2 className='search-btn sc-btn' /></button>
          <input 
            type='search'
            placeholder='Search or start new chat'
            className='search-input'
          />
        </div>
        <button><BiFilter className='filter-btn sc-btn' /></button>
      </div>
    </>
  )
}

export default SearchContainer