import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header';
import RecordsList from '../containers/RecordsList';
import EditContactPage from '../containers/EditContactPage';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">

                    <Header />
                    <Route exact  path="/" component={RecordsList} />
                    <Route exact path="/edit_contact/:id" component={EditContactPage} />
                    <Route path="/view_contact/:id" component={EditContactPage} />


                </div>
            </BrowserRouter>
        );
    }
}
