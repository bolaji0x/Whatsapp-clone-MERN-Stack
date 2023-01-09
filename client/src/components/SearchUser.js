import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";

const SearchUser = () => {
  const {isLoading, users, searchUser, phoneNo, addContact} = useAppContext()

    useEffect(() => {
        searchUser()
        // eslint-disable-next-line
    }, [phoneNo])

    if (users.length === 0) {
        return (
            <h2 className='no-users'>Oops! Users to display...</h2>
        );
    }
  return (
    <>
        <div className='addu-container'>
          <div>
            {users.map((user) => {
              const {_id, phoneNo} = user
              return (
                <Link className='adcbtn'>
                  <button><BiUserCircle className='abc-icon' /></button>
                  <div className='adcbtn-grid'>
                    <h4 className='adcbtn-name'>{phoneNo}</h4>
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