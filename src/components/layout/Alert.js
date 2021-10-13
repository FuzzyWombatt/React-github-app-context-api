import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import AlertContext from '../../context/alert/alertContext'

const Alert = () => {
    const alertContext = useContext(AlertContext);

    const {alert} = alertContext;
    
    return (
        alert !== null && (
            <div className={`self-center ${alert.type} pt-2 pb-2 pl-2 text-left w-11/12 text-gray-600`}>
                <FontAwesomeIcon icon={faInfoCircle} /> {alert.msg}
            </div>
        )
    )
}

export default Alert
