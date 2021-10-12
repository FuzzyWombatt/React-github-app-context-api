import React from "react"
import PropTypes from 'prop-types'

const RepoItem = ({repo}) => {
    return (
        <div className='border-2 pt-2 pb-2 mb-2'>
            <h3 className='pl-2 text-red-500 hover:text-red-900'>
                <a href={repo.html_url}>{repo.name}</a>
            </h3>
        </div>
    )
}

RepoItem.propTypes ={
    repo: PropTypes.object.isRequired
}

export default RepoItem
