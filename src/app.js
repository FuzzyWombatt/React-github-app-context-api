import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';


const App = () =>{  
    return(
        <GithubState>
        <AlertState>
            <Router>
                    <Navbar/>
                    <div className='flex flex-col'>
                        <Alert/>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/user/:login' component={User} />
                            <Route component={NotFound} />
                        </Switch> 
                    </div>
            </Router>
        </AlertState>
        </GithubState>
    );
}

export default App; 