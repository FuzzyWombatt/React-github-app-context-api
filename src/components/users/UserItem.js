import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const UserItem = ({user: {login, avatar_url}}) => {
    return(
        <div className='flex flex-col items-center border-2'>
            <img
                src={avatar_url}
                alt=''
                className='m-2 rounded-full w-1/3 lg:w-1/4'
            />
            <h3 className='mb-2'>{login}</h3>
            <div className='mb-6'>
                <Link className='bg-gray-600 pt-1 pb-1 pr-6 pl-6 text-center text-white border-2 hover:bg-gray-200 hover:text-black' to={`/user/${login}`}>
                    More
                </Link>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem
