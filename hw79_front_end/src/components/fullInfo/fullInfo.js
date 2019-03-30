import React, {Component, Fragment} from 'react';
import {fetchItem, fetchItems} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ItemThumbnail from "../../components/itemThumbnail/itemThumbnail";

class FullInfo extends Component {
    componentDidMount() {
        this.props.fetchItem(this.props.match.params.id);
    };


    render() {
        console.log('CAT_LIST');

        return (
            <Fragment>
                <Link to="/items/new">
                    <button>
                        Изменить предмет
                    </button>
                </Link>
                {this.props.item ? <div className="fullInfo_div">
                    <ItemThumbnail image={this.props.item.image}/>
                    <p>{this.props.item.name}</p>
                    <p>Категория: {this.props.categories[this.props.item.category_fk - 1].name}</p>
                    <p>Местоположение: {this.props.places[this.props.item.place_fk - 1].name}</p>
                    <p>{this.props.item.description}</p>
                </div> : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    item: state.items.item,
    categories: state.items.categories,
    places: state.items.places
});

const mapDispatchToProps = dispatch => ({
    fetchItem: (id) => dispatch(fetchItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullInfo);