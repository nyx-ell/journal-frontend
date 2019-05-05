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
            file: null,
            url: null,
        };
        this.handleInput = this.handleInput.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleFile = (event) => {
        this.setState({
            file: event.target.files[0],
            url: URL.createObjectURL(event.target.files[0]),
        })
    }

    handleUpdate = () => {
        const { title, content, file } = this.state
        const fd = new FormData()
        fd.set('title', title)
        fd.set('content', content)

        if (file != null) {
            fd.append('file', file, file.name)
        }

        const { match: { params } } = this.props;
        const id = params.id
        const token = localStorage.getItem('token')
        axios.post(`https://journal-nyx.herokuapp.com/api/v1/journals/${id}`, fd, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.status === "success") {
                console.log('Journal updated successfully')
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                }
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
            url: `https://journal-nyx.herokuapp.com/api/v1/journals/${id}/delete`,
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            if (response.data.status === "success") {
                console.log('Journal deleted successfully')
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                }
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
            url: `https://journal-nyx.herokuapp.com/api/v1/journals/${id}`,
            headers: {
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
                    url: 'https://s3.amazonaws.com/journal-nyx/' + response.data.journal.image_path
                })
            } else {
                console.log('Could not retrieve journals. Please check authorization.');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const { created_at, updated_at, title, content, file, url } = this.state
        return (
            <>
                <AvForm onValidSubmit={this.handleUpdate} id="update">
                    <AvField placeholder={title} name="title" value={title} onChange={this.handleInput} id="title" type="text" validate={{
                        required: { value: true, errorMessage: 'Please give your journal a title' },
                        maxLength: { value: 255, errorMessage: 'Your title cannot exceed 255 characters' }
                    }} />
                    <textarea placeholder={content} name="content" value={content} onChange={this.handleInput} id="content" type="text" className="form-control"></textarea>
                    <br />
                    <p id="created-at">Created at: {created_at}</p>
                    <p id="updated-at">Updated at: {updated_at}</p>
                    <br /><br />
                    <div className="input-group col-sm-6">
                        <input type="file" className="custom-file-input" id="file" onChange={this.handleFile} />
                        <label className="custom-file-label" htmlFor="file">{(file) ? file.name : "Current image in preview"}</label>
                    </div>
                    <br />
                    <img src={url} alt="" className="img-thumbnail" />
                    <br /><br />
                    <Button light color="secondary" form="update" type="submit" className="float-right">Save your changes</Button>
                    <Button outline color="secondary" onClick={this.handleDestroy} id="delete-button" className="float-right">Delete</Button>
                </AvForm>
            </>
        )
    }
}
