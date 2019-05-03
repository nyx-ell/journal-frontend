import React from "react";
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
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
                <Container>
                    <Row>
                        {this.state.journals.map((journal) => (
                            <Col key={journal.id} className="col-sm-4 d-inline journal-box">
                                <img src="/Users/nicolelin/journal-frontend/src/images/bg-1.jpg" alt="" className="img-thumbnail journal-img" />
                                <p className="journal-title"><Link to={"/journals/" + journal.id}>{journal.title}</Link></p>
                                <p className="journal-created-at">{journal.created_at}</p>
                            </Col>
                        ))}
                    </Row>

                </Container>

            </>
        )
    }
}