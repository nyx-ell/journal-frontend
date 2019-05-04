import axios from 'axios'
import React from 'react';
import { Link } from 'react-router-dom';
import JournalTable from '../containers/JournalTable.js';

class UserPage extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token')
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/journals/',
            'headers': {
                'Access-Control-Allow-Origin': '*',
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
                    <div className="w-100">
                        <div className="col-md-6 d-inline-block">
                            <h2 id="welcome-message">Welcome, {localStorage.getItem('firstName')}</h2>
                        </div>
                        <Link to="/journals/new" className="btn btn-outline-secondary col-md-4 float-right" id="new-journal-button">Write a new journal</Link>
                    </div>
                </div>
                <div>
                    <JournalTable />
                </div>
            </>
        )
    }
}

export default UserPage;