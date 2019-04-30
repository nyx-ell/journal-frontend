import axios from 'axios'
import React from 'react';
import { Link, Route } from 'react-router-dom';
import NewJournal from './NewJournal.js';
import JournalTable from '../containers/JournalTable.js';

class UserPage extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/journals/',
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                user_id: localStorage.getItem('userId'),
            }
        }).then(response => {
            if (response.data.status === "success") {
                this.setState({
                    journals: response.data.journals
                })
            } else {
                console.log('Could not retrieve journals. Please check authorization.');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <>
                <div>
                    <Link to="/journals/new">New Journal Entry</Link>
                </div>
                <JournalTable />
            </>
        )
    }
}

export default UserPage;