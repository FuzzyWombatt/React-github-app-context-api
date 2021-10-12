import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


const Users = ({users, loading}) => {
    if (loading){
        return <Spinner />
    } else {
        return ( 
            <div className='grid gap-4 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 justify-center mr-4 ml-4 mb-2'>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }   
}

Users.protoTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default Users
