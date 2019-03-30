import React from 'react';
import {NavLink} from "react-router-dom";


const Toolbar = () => {
    return <div>
        <NavLink to="/" exact>News</NavLink>
    </div>
};

export default Toolbar;