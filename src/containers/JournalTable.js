import React from "react";
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import axios from 'axios'

export default class JournalTable extends React.Component {
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
                                <td><Link to={"/journals/" + journal.id}>{journal.title}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
}