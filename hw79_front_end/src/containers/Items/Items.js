import React, {Component, Fragment} from 'react';
import {fetchCategories, fetchItems, fetchPlaces, selectItem} from "../../store/actions/itemActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ItemThumbnail from "../../components/itemThumbnail/itemThumbnail";

class Items extends Component {
    componentDidMount() {
        this.props.onFetchItems();

    };

    render() {
        console.log(this.props.state);
        return (
           <Fragment>
                   <Link to="/items/new">
                        <button>
                            Добавить предмет
                        </button>
                   </Link>

               {this.props.items.map(item => (
                   <div key={item.id} style={{marginTop: '10px'}}>
                       <div className="thumbnail_div">
                           <ItemThumbnail image={item.image}/>
                           <Link to={'/items/' + item.id} onClick={this.props.selectItem} id={item.id}>
                               {item.name}
                           </Link>
                           <strong>
                               {item.description}
                           </strong>
                       </div>
                   </div>
               ))}

           </Fragment>
        );
    }
}

const mapStateToProps = state => ({
   items: state.items.items,
   state: state.items
});

const mapDispatchToProps = dispatch => ({
   onFetchItems: () => dispatch(fetchItems()),
   onFetchCategories: () => dispatch(fetchCategories()),
   onFetchPlaces: () => dispatch(fetchPlaces()),
   selectItem: (e) => dispatch(selectItem(e.currentTarget.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);