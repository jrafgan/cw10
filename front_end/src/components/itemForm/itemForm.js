import React, {Component} from 'react';
import {createPost} from "../../store/actions/newsActions";
import {connect} from "react-redux";

class ItemForm extends Component {
    state = {
        header: '',
        description: '',
        date: '',
        image: null
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();
        this.setState({date: new Date().toLocaleString()});

        Object.keys(this.state).forEach(key => {
            if (this.state[key] !== null) {
                formData.append(key, this.state[key]);
            }
        });

        this.props.createPost(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    selectChangeHandler = event => {
        console.log(event.target);
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    render() {
        console.log('[FORM:STATE]', this.state);
        return (
            <form onSubmit={this.submitFormHandler}>
                <div className="form_child_div">
                    <label htmlFor="header">Header</label>
                    <input
                        type="text" required
                        name="header" id="header"
                        placeholder="News Header"
                        value={this.state.header}
                        onChange={this.inputChangeHandler}/>
                </div>
                <div className="form_child_div">
                    <label htmlFor="category">Description</label>
                    <textarea
                        required
                        name="description" id="description"
                        placeholder="Your post"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}/>
                </div>
                <div className="form_child_div">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        name="image" id="image"
                        onChange={this.fileChangeHandler}/>
                </div>
                <div className="form_child_div">
                    <button type="submit" color="primary">Save</button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createPost: (newPost) => dispatch(createPost(newPost)),
});

export default connect(null, mapDispatchToProps)(ItemForm);