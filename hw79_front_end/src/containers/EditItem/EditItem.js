import React, {Component, Fragment} from 'react';
import ItemForm from "../../components/itemForm/itemForm";
import {connect} from "react-redux";
import {fetchCategories, fetchItem, fetchPlaces} from "../../store/actions/itemActions";

class EditItem extends Component {
    componentDidMount() {
        this.props.fetchItem(this.props.match.params.id);
    }

    render() {
        if (!this.props.item) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <h1>Edit page</h1>
                <ItemForm
                    item={this.props.item}
                    categories={this.props.categories}
                    places={this.props.places}
                />
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    item: state.items.item, // {id: awkdlkaw, name: awjdiajwd, category:
    categories: state.items.categories,
    places: state.items.places

});

const mapDispatchToProps = dispatch => ({
    fetchItem: (id) => dispatch(fetchItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);