import React from 'react';
import imageNotAvailable from '../../assets/images/photo5801815967637023005.jpg';
import {apiURL} from "../../constants";

const styles = {
    width: '100px',
    height: '100px',
    marginRight: '10px',
};

const ItemThumbnail = props => {
    console.log(props.image);
    let image = '';

    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
        if (props.image === "null") {
            image = imageNotAvailable;
        }
    }

    return <img src={image} style={styles} className='img-thumbnail' alt='Item' />
};

export default ItemThumbnail;