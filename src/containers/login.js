import React from "react";
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            messageLogin: '',
            statusLogin: false,
            loggedinUsername: '',
            loggedinPic: '',
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    reset = () => {
        this.setState({
            email: '',
            password: '',
            messageLogin: '',
            statusLogin: false,
        })
    }

    loginNew = () => {
        axios.post('https://insta.nextacademy.com/api/v1/login',
            {
                email: this.state.email,
                password: this.state.password,
            }).then((response) => {
                this.setState({
                    messageLogin: 'Successfully logged in!',
                    statusLogin: true,
                    loggedinUsername: response.data.user.username,
                    loggedinPic: response.data.user.profile_picture,
                })
                localStorage.setItem('jwt', response.data.auth_token)
                this.props.loggedinCallback(this.state.loggedinUsername, this.state.loggedinPic)
            }).catch((error) => {
                this.setState({
                    messageLogin: 'Some error occured. Please try again.',
                    statusLogin: false,
                })
            })
    }

    logout = () => {
        localStorage.removeItem('jwt')
        this.props.toggleLoginModal()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.loginNew()
        if (this.state.statusLogin) {
            this.reset()
        }
    }

    render() {
        const { loginModal, toggleLoginModal, toggleSignupModal } = this.props
        const { messageLogin, statusLogin } = this.state
        return (
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader toggle={toggleLoginModal}>Log in to your NEXTagram account</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="emailInput"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="passwordInput"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                    </Form>
                    <p>{messageLogin}</p>
                </ModalBody>
                <ModalFooter>

                    <Button color="light" onClick={toggleSignupModal}>Sign up here if you don't have an account</Button>

                    {
                        (!statusLogin)
                            ? <Button color="primary" onClick={this.handleSubmit}>Log in</Button>
                            : <Button color="primary" onClick={this.logout}>Log out</Button>
                    }

                </ModalFooter>
            </Modal>

        )
    }
}

export default Login