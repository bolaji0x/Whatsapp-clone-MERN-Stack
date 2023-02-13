import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";

const SearchUser = () => {
  const {contacts, searchUser, name, addContact} = useAppContext()

    useEffect(() => {
        searchUser()
        // eslint-disable-next-line
    }, [name])


    

    if (contacts.length === 0) {
        return (
            <h2 className='no-users'>Oops! No Users to display...</h2>
        );
    }
  return (
    <>
        <div className='addu-container'>
          <div>
            {contacts.map((user) => {
              const {_id, name} = user
              return (
                <Link key={_id} className='adcbtn'>
                  <button><BiUserCircle className='abc-icon' /></button>
                  <div className='adcbtn-grid'>
                    <h4 className='adcbtn-name'>{name}</h4>
                    <button onClick={() => addContact(_id)} type='button' className='adcbtn-text'>Add contact</button> 
                  </div>
                </Link>
              )
            })}
            
          </div>
        </div>
    </>
  )
}

export default SearchUser