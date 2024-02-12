import React from 'react';
import Subcategory from "./subcomponents/Subcategory"
import Displayall from './subcomponents/Displayall';
import Formatteddisplay from "./subcomponents/DisplayAllSubcategory"
import Category from "./subcomponents/Category"
import Dashboard from './subcomponents/dashboard/Dashboard'
import Admin from "./subcomponents/Admin"
import Display from './subcomponents/DisplayAllVideo'
import Video from './subcomponents/Video';
import AdminRouter from './subcomponents/AdminRouter';
import DisplayallEpisode from './subcomponents/DisplayallEpisode';
import UserMainPage from './subcomponents/user/UserMainPage';
import UserCategoryAll from './subcomponents/user/UserCategoryAll'
import Userlogin from './subcomponents/user/Userlogin'

function App() {
  return (
    <div >
      <AdminRouter/>
    </div>
  );
}

export default App;
