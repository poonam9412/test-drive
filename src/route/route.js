import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewsList from './../news'
import detail from './../news-detail'
const Main = () => (
    
    <Router>
        <Switch>
        <Route exact path='/' render={(props) => <NewsList {...props}/>} />
        <Route exact path='/:id' component={detail} />
        </Switch>
    </Router> 
)

export default Main; 