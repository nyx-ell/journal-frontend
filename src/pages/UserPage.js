import React from "react";
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import NewJournal from './NewJournal.js';

class UserPage extends React.Component {

    render() {
        return (
            <div>
                <Link to="/journals/new">New Journal Entry</Link>
                <Route path="/journals/new" component={NewJournal} />
            </div>
        )
    }
}

export default UserPage;