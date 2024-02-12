import React from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Admin from './Admin'
import UserMainPage from './user/UserMainPage'
export default function AdminRouter(props) {
 return(
  <Router>
 
<div>
  <Route path='/Admin' exact strict component={Admin}  history={props.history}/>
  <Route path='/Dashboard' exact strict component={Dashboard}  history={props.history}/>
  <Route path='/UserMainPage' exact strict component={UserMainPage}  history={props.history}/>

</div>

  </Router>  

  

 )
}