import React from 'react';
import axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class JournalEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            created_at: '',
            updated_at: '',
            user_id: '',
            title: '',
            content: '',
        };
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleUpdate = () => {
        const { match: { params } } = this.props;
        const id = params.id
        const token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/v1/journals/${id}`,
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                title: this.state.title,
                content: this.state.content,
            }
        }).then(response => {
            if (response.data.status === "success") {
                console.log('Journal updated successfully')
            } else {
                console.log('Could not update journal entry.');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    handleDestroy = () => {
        const { match: { params } } = this.props;
        const id = params.id
        const token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/v1/journals/${id}/delete`,
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            if (response.data.status === "success") {
                console.log('Journal deleted successfully')
            } else {
                console.log('Could not delete journal entry.');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const id = params.id
        const token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/v1/journals/${id}`,
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            if (response.data.status === "success") {
                this.setState({
                    id: response.data.journal.id,
                    created_at: response.data.journal.created_at,
                    updated_at: response.data.journal.updated_at,
                    user_id: response.data.journal.user_id,
                    title: response.data.journal.title,
                    content: response.data.journal.content,
                })
            } else {
                console.log('Could not retrieve journals. Please check authorization.');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const { id, created_at, updated_at, user_id, title, content } = this.state
        return (
            <>
                <AvForm onValidSubmit={this.handleUpdate} id="update">
                    <AvField placeholder={title} name="title" value={title} onChange={this.handleInput} id="title" type="text" validate={{
                        required: { value: true, errorMessage: 'Please give your journal a title' },
                        maxLength: { value: 255, errorMessage: 'Your title cannot exceed 255 characters' }
                    }} />

                    <textarea placeholder={content} name="content" value={content} onChange={this.handleInput} id="content" type="text" className="form-control"></textarea><br />

                    <p id="created-at">Created at: {created_at}</p>
                    <p id="updated-at">Updated at: {updated_at}</p>
                    <br /><br />
                    <Button light color="secondary" form="update" type="submit" className="float-right">Save your changes</Button>
                    <Button outline color="secondary" onClick={this.handleDestroy} id="delete-button" className="float-right">Delete</Button>
                </AvForm>
            </>
        )
    }
}