import React from 'react';
import { Button, Row, Col, Label, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios({
            // Send POST request with registration information
            method: 'POST',
            url: 'http://localhost:5000/api/v1/users/register',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    // On success, display success message
                    console.log('Registration successful!')

                    // Save auth token and user details into local storage
                    localStorage.setItem('token', response.data['auth_token']);
                    localStorage.setItem('userId', response.data.user['id']);
                    localStorage.setItem('firstName', response.data.user['first_name']);
                } else {
                    // On response but email validation failure, display error toast
                    console.log('Uh oh! We already have an account with that email.')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                <ModalBody>
                    <Row>
                        <Col>
                            <p>Register for an account</p>
                        </Col>
                    </Row>
                    <AvForm onValidSubmit={this.handleSubmit} id="register">
                        <Row>
                            <Col>
                                <AvGroup>
                                    <Label>First Name</Label>
                                    <AvInput
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        aria-describedby="inputGroupPrepend"
                                        value={this.state.firstName} onChange={this.handleInput}
                                        id="firstName"
                                        required
                                    />
                                    <AvFeedback>
                                        Please enter a first name.
                                    </AvFeedback>
                                </AvGroup>
                            </Col>
                            <Col>
                                <AvGroup>
                                    <Label>Last Name</Label>
                                    <AvInput
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        aria-describedby="inputGroupPrepend"
                                        value={this.state.lastName} onChange={this.handleInput}
                                        id="lastName"
                                        required
                                    />
                                    <AvFeedback>
                                        Please enter a last name.
                                </AvFeedback>
                                </AvGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AvGroup>
                                    <Label>Email</Label>
                                    <AvInput name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInput} id="email" required />
                                    <AvFeedback>
                                        Please provide a valid email address.
                                </AvFeedback>
                                </AvGroup>
                            </Col>
                            <Col>
                                <AvGroup>
                                    <Label>Password</Label>
                                    <AvInput name="password" type="password" placeholder="Password" value={this.state.password} id="password" autoComplete="off" onChange={this.handleInput} required />
                                    <AvFeedback>
                                        Please provide a valid password.
                                    </AvFeedback>
                                </AvGroup>
                            </Col>
                        </Row>
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-lg" form="register" color="primary" type="submit">Register</Button>
                </ModalFooter>
            </>
        )
    }
}