import React, {useState } from 'react'

const Search = ({searchUsers, clearable, clear, setAlert}) => {
    
    const[text, setText] = useState('');

    const onChange = (e) => {
       setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === ''){
            setAlert('Please enter something', 'gray-100')
        } else{
            searchUsers(text);
            setText('');
        }
       
    }

    return (
        <div className='self-center flex flex-col w-11/12'>
            <form className='flex flex-col' onSubmit={onSubmit}>
                <input className='border-2 mb-4 mt-4' type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange}></input>
                <input className='text-white bg-gray-600 mb-2 border-2 p-1 cursor-pointer hover:bg-gray-200 hover:text-black' type="submit" value="Search"></input>
            </form>
                {clearable && (<button className='text-white bg-gray-600 mb-2 align-middle border-2 p-1 hover:bg-gray-200 hover:text-black' onClick={clear}>Clear</button>)}
        </div>
    )
}

export default Search
