import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/appContext';

const SearchContact = () => {
  const [localSearch, setLocalSearch] = useState('');
    const { handleChange} = useAppContext()

    const debounce = () => {
        let timeoutID;
        return (e) => {
          setLocalSearch(e.target.value);
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            handleChange({ name: e.target.name, value: e.target.value });
          }, 1000);
        };
    };

    const optimizedDebounce = useMemo(() => debounce(), 
    // eslint-disable-next-line
    []);
  return (
    <>
        <form className=''>
            <h3 className='addc-title'>Add Contact</h3>
            <input
              type='text'
              name='name' 
              value={localSearch}
              className='adc-input'
              placeholder='Search for user'
              onChange={optimizedDebounce}
            />
        </form>
    </>
  )
}

export default SearchContact