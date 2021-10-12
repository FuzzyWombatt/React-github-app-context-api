import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Repos from '../repos/Repos'


const User = ({user, loading, getUser, getRepos, repos, match}) => {
    useEffect(() => {
        getUser(match.params.login);
        getRepos(match.params.login);
        //eslint-disable-next-line
    }, []);

    const{
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company
    } = user;
    
    if(loading) return <Spinner/>
    
    return(       
           <Fragment>
               <div className='h-screen w-11/12 self-center'>
                    <div className='flex mb-2'>
                        <Link to='/' className='w-1/8 bg-gray-600 mr-2 pt-1 pb-1 pr-6 pl-6 text-center text-white border-2 hover:bg-gray-200 hover:text-black'>
                            Back to search
                        </Link>
                        <div className='self-center'>
                            Hireable: {' '}
                            {hireable ? <FontAwesomeIcon icon={faCheck} className='text-green-700'/> : <FontAwesomeIcon icon={faTimesCircle} className='text-red-800'/>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 border-2 mb-2'>
                        <div className='flex flex-col items-center text-center content-center justify-center'>
                            <img src={avatar_url} alt='' className='rounded-full w-150 mt-4 mb-2'/>
                            <h1>{name}</h1>
                            <p className='mb-2'>Location: {location}</p>
                        </div>
                        <div>
                            <h3 className='mt-4'><strong><u>Bio</u></strong></h3>
                            {bio ? (<Fragment><p className='mt-2 mb-2'>{bio}</p></Fragment>) : ((<Fragment><p className='mt-2 mb-2'>No Bio Provided</p></Fragment>))}
                            <a href={html_url} className='mt-2 text-white bg-gray-600 mb-2 align-middle border-2 p-1 hover:bg-gray-200 hover:text-black'>Visit Github Profile</a>
                            <ul className='mt-2 mb-2'>
                                <li>
                                    {login && (<Fragment>
                                        <strong>Username: </strong>{login}
                                    </Fragment>)}
                                </li>
                                <li>
                                    {company && (<Fragment>
                                        <strong>Company: </strong>{company}
                                    </Fragment>)}
                                </li>
                                <li>
                                    {blog && (<Fragment>
                                        <strong>Website: </strong>{blog}
                                    </Fragment>)}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='border-2 flex flex-row justify-center pt-2 pb-2 mb-2'>
                        <div className='badge bg-red-700 text-white'>Followers: {followers}</div>
                        <div className='badge bg-green-700 text-white'>Following: {following}</div>    
                        <div className='badge bg-pink-600 text-white'>Public Repos: {public_repos}</div>    
                        <div className='badge bg-gray-700 text-white'>Public Gists: {public_gists}</div>                                             
                    </div>
                    <Repos repos={repos}/>
                </div>
           </Fragment>
        
    )
}
User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
}

export default User
