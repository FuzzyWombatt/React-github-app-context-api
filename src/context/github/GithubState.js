import React,{useReducer, useState, useEffect} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS, SET_USERS } from '../types'
//global App level State
const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const[state, dispatch] = useReducer(GithubReducer, initialState);
    const[initialUsers, setInitial] = useState([]);

    //setup initial 30 users for when App is refreshed or intially started
    const getInitial = async () => {
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setInitial(res.data);
    }

    const setUsers = (users) => {
        dispatch({type:SET_USERS, payload: users});
    }
    //keep dependency empty to launch only once. If initialUsers is put in as a dependency it could launch as a conditional
    useEffect(() => {
        getInitial();
        setUsers(initialUsers);
    }, [])

    //search user
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({type: SEARCH_USERS, payload: res.data.items})
    }

    //get user
    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        //res.data is an object
        dispatch({type:GET_USER, payload: res.data})
    }
    
    //get repos
    const getRepos = async (username)  => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({type: GET_REPOS, payload: res.data}) 
    }
    
    //clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS})
    
    //set loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;