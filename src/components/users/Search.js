import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext';

const Search = ( {setAlert}) => {
    const githubContext =  useContext(GithubContext)

    const[text, setText] = useState('');

    const onChange = (e) => {
       setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === ''){
            setAlert('Please enter something', 'gray-100')
        } else{
            githubContext.searchUsers(text);
            setText('');
        }
       
    }

    return (
        <div className='self-center flex flex-col w-11/12'>
            <form className='flex flex-col' onSubmit={onSubmit}>
                <input className='border-2 mb-4 mt-4' type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange}></input>
                <input className='text-white bg-gray-600 mb-2 border-2 p-1 cursor-pointer hover:bg-gray-200 hover:text-black' type="submit" value="Search"></input>
            </form>
                {githubContext.users.length > 0 && (<button className='text-white bg-gray-600 mb-2 align-middle border-2 p-1 hover:bg-gray-200 hover:text-black' onClick={githubContext.clearUsers}>Clear</button>)}
        </div>
    )
}

export default Search
