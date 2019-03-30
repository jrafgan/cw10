import React, {Component} from 'react';
import {fetchItems, selectItem} from "../../store/actions/itemActions";
import {connect} from "react-redux";

class ItemForm extends Component {
    constructor(props) {
        super(props);
        console.log('[ITEM-INFO] ',props.item);

        if (props.item) {

            console.log('SSSSS',props.categories);
            this.state = {
                ...props.item,
                // category: props.categories[props.item[category_fk - 1]],
                // place: props.places[props.item[place_fk - 1]]
            };
            console.log('WE ARE HERE');
        } else {
            this.state = {
                name: '',
                category: '',
                place: '',
                description: '',
                image: null
            };
        }
    }
    //
    // state = {
    //     name: '',
    //     category: '',
    //     place: '',
    //     description: '',
    //     image: null
    // };


    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (this.state[key] !== null) {
                formData.append(key, this.state[key]);
            }
        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        console.log(event.target);
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
        console.log('[FORM:STATE]',this.state);
        return (
            <form onSubmit={this.submitFormHandler}>
                <div className="form_child_div">
                    <label htmlFor="name">Название</label>
                    <input
                        type="text" required
                        name="name" id="name"
                        placeholder="Название предмета"
                        value={this.state.name}
                        onChange={this.inputChangeHandler}/>
                </div>
                <div className="form_child_div">
                    <label htmlFor="category">Категория</label>
                    <select id="category" onChange={this.selectChangeHandler}>
                        <option>--Выберите категорию--</option>
                        {this.props.categories.map(item => <option value={item.id}>{item.name}</option>)}

                    </select>
                </div>
                <div className="form_child_div">
                    <label htmlFor="place">Местоположение</label>
                    <select id="place" onChange={this.selectChangeHandler}>
                        <option>--Выберите местоположение--</option>
                        <option value="1">Кабинет директора</option>
                        <option value="2">Учительская</option>
                        <option value="3">Офис №1</option>
                    </select>
                </div>
                <div className="form_child_div">
                    <label htmlFor="description">Описание</label>
                    <input
                        type="text" required
                        name="description" id="description"
                        placeholder="Подробности"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}/>
                </div>
                <div className="form_child_div">
                    <label htmlFor="image">Изображение</label>
                    <input
                        type="file"
                        name="image" id="image"
                        onChange={this.fileChangeHandler}/>
                </div>
                <div className="form_child_div">
                    <button type="submit" color="primary">Сохранить</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.items.categories,
    places: state.items.places,
});

const mapDispatchToProps = dispatch => ({
    onFetchItems: () => dispatch(fetchItems()),
    selectItem: (e) => dispatch(selectItem(e.currentTarget.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);