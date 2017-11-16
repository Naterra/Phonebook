import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <nav className="main_nav">
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Dib Management Phone Book</a>

                    <a href="#" data-activates="mobile-demo" className="button-collapse">
                        <i className="material-icons">menu</i></a>

                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Search Contacts</a></li>
                        <li><a href="badges.html">Show All Contacts</a></li>
                        <li><a href="collapsible.html">Add New Contact</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="sass.html">Search Contacts</a></li>
                        <li><a href="badges.html">Show All Contacts</a></li>
                        <li><a href="collapsible.html">Add New Contact</a></li>
                    </ul>
                </div>
            </nav>
        );
    };
}

export default Header;