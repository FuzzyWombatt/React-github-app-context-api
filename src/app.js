import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios'




class App extends Component{
    state = {
        users: [],
        repos: [],
        user: {},
        loading: false,
        alert: null,
    }


    async componentDidMount() {
        //console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
        this.setState({loading: true})
        // must use back ticks for variable string syntax (`)
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users: res.data, loading: false})
    }
    //search github users
    searchUsers = async (text) => {
        //console.log(text);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        //github api user search JSON object is different from initial User Request
        this.setState({users: res.data.items, loading: false})
    }
    //get single github user
    getUser = async (username) => {
        this.setState({loading: true})
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({user: res.data, loading: false})
    }
    //retrieves 5 most recent repos from the user from the endpoint
    getRepos = async (username)  => {
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({repos: res.data, loading: false})
    }
    
    //clear users
    clear = () => {
        this.setState({users: [], loading: false})
    }

    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}})
        setTimeout(() => this.setState({alert: null}), 1000)
    }

    render(){
        //destructuring to get rid of this.state._____
        const {users, user, loading, repos} =  this.state;

        return(
        <Router>
            <div className='font-roboto'>
                <div>
                    <Navbar />
                    <div className='flex flex-col'>
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search 
                                        searchUsers={this.searchUsers} 
                                        clear={this.clear} 
                                        clearable = { users.length > 0 ? true : false}
                                        setAlert={this.setAlert}/>
                                    <Users loading={loading} users={users}/>    
                                </Fragment>
                            )}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/user/:login' render={props => (
                                <User 
                                    {...props}  
                                    getUser={this.getUser} 
                                    getRepos={this.getRepos}
                                    user={user} 
                                    repos={repos}
                                    loading={loading}/>
                            )} />
                        </Switch> 
                    </div>
                </div>
            </div>
        </Router>
        );
    }
}


export default App; 