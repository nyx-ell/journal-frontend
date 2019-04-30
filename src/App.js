import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar';
import UserPage from './pages/UserPage';
import NewJournal from './pages/NewJournal';
import JournalEntry from './containers/JournalEntry';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserPage />

        {/* Routes */}
        <Route path="/journals/new" component={NewJournal} />
        <Route path="/journals/:id" component={JournalEntry} />

      </div>
    );
  }
}

export default App;