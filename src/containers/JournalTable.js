import React from "react";
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
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
            url: 'https://journal-nyx.herokuapp.com/api/v1/journals/',
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
            <Row id="journal-grid">
                {this.state.journals.map((journal) => (
                    <Col key={journal.id} className="col-sm-3 d-inline">
                        <img src={'https://s3.amazonaws.com/journal-nyx/' + journal.image_path} alt="" className="img-thumbnail journal-img" />
                        <p><Link to={"/journals/" + journal.id}>{journal.title}</Link></p>
                        <p className="journal-created-at">{journal.created_at}</p>
                    </Col>
                ))}
            </Row>
        )
    }
}