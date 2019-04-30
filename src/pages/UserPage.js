import React from "react";
import { Link, Route } from 'react-router-dom';
import { Table } from 'reactstrap';
import NewJournal from './NewJournal.js';
import axios from 'axios'

class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            journals: [],
        };
    }

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
                    <Route path="/journals/new" component={NewJournal} />
                </div>

                <Table>
                    <thead>
                        <tr>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Journal entry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.journals.map((journal) => (
                            <tr key={journal.id}>
                                <td>{journal.created_at}</td>
                                <td>{journal.updated_at}</td>
                                <td>{journal.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default UserPage;