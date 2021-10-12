import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'


const Navbar = ({icon, title}) => {
    return (
        <nav className='bg-pink-400 p-3 text-white flex flex-row mb-2'>
            <FontAwesomeIcon size='2x' color='white' icon={icon} className='mr-1'/>
            <h1 className='text-3xl font-bold'>
                {title}
            </h1>
            <ul className='flex flex-row flex-1 justify-end'>
                <li className='self-center m-2'>
                    <Link className='hover:text-gray-300' to='/'>Home</Link>
                </li>
                <li className='self-center m-2'>
                    <Link className='hover:text-gray-300' to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    ); 
}

Navbar.defaultProps = {
    title: 'Github finder',
    icon: faGithub
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
}

export default Navbar;