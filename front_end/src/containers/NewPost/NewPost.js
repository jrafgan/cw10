import React, {Component, Fragment} from 'react';
import ItemForm from "../../components/itemForm/itemForm";
import {createPost} from "../../store/actions/newsActions";
import {connect} from "react-redux";

class NewPost extends Component {
    createItem = itemData => {
        this.props.onItemCreated(itemData).then(() => {
           this.props.history.push('/');
        });
    };

    render() {
        return (
            <Fragment>
                <h2>New post</h2>
                <ItemForm onSubmit={this.createItem} />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onItemCreated: itemData => dispatch(createPost(itemData))
});

export default connect(null, mapDispatchToProps)(NewPost);