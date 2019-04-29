import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import UserPage from './pages/UserPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserPage />
      </div>
    );
  }
}

export default App;