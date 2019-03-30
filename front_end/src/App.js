import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import News from "./containers/News/News";
import NewPost from "./containers/NewPost/NewPost";
import './App.css'
import fullInfo from "./components/fullInfo/fullInfo";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
            <Toolbar/>
        </header>
        <div style={{marginTop: '20px'}}>
            <Switch>
                <Route path="/" exact component={News} />
                <Route path="/news/new" exact component={NewPost} />
                <Route path="/news/:id" exact component={fullInfo} />
            </Switch>
        </div>
      </Fragment>
    );
  }
}

export default App;