import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Alert = ({alert}) => {
    return (
        alert !== null && (
            <div className={`self-center bg-${alert.type} pt-2 pb-2 pl-2 text-left w-11/12 text-gray-600`}>
                <FontAwesomeIcon icon={faInfoCircle} /> {alert.msg}
            </div>
        )
    )
}

export default Alert
