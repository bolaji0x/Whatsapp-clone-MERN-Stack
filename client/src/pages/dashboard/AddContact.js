import React from 'react'
import {SearchContact, SearchUser} from '../../components'

const AddContact = () => {
  return (
    <div className='add-contact-container'>
        <SearchContact />
        <SearchUser />
    </div>
  )
}

export default AddContact