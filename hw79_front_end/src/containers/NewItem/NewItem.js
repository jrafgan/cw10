import React, {Component, Fragment} from 'react';
import ItemForm from "../../components/itemForm/itemForm";
import {createItem} from "../../store/actions/itemActions";
import {connect} from "react-redux";

class NewItem extends Component {
    createItem = itemData => {
        this.props.onItemCreated(itemData).then(() => {
           this.props.history.push('/');
        });
    };

    render() {
        return (
            <Fragment>
                {this.props.item ? <h2>Изменить предмет</h2> : <h2>Создать новый предмет</h2>}
                <ItemForm onSubmit={this.createItem} />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onItemCreated: itemData => dispatch(createItem(itemData))
});

export default connect(null, mapDispatchToProps)(NewItem);