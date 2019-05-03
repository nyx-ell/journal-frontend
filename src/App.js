import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import NewJournal from './pages/NewJournal';
import Navbar from './containers/navbar';
import UpdateJournal from './pages/UpdateJournal';
import Homepage from './pages/Homepage'

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/journals" exact component={UserPage} />
        <Route path="/journals/new" component={NewJournal} />
        <Route path="/journals/:id(\d+)" component={UpdateJournal} />
      </>

    );
  }
}

export default App;