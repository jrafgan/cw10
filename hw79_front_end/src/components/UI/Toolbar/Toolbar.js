import React from 'react';
import {NavLink} from "react-router-dom";


const Toolbar = () => {
    return <div>
        <NavLink to="/" exact>Главная</NavLink>
    </div>
};

export default Toolbar;