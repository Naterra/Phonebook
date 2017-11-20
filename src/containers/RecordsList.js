import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {bindActionCreators} from 'redux';
import { fetchContacts, set_filter_term } from '../actions';
import { Link } from 'react-router-dom';

import Alpha from '../components/alphabetMenu';
import Paging from '../components/paging';
import SearchBox from './SearchBox';


class RecordsList extends Component{
    constructor(props){
        super(props);
        this.set_filter_term = this.set_filter_term.bind(this);
    }


    componentDidMount() {
       console.log('componentDidMount');
       this.props.fetchContacts(this.props.filter);
    }

    //UPDATERS
    componentWillReceiveProps(nextProps) {
        console.log( 'componentWillReceiveProps');

        if(this.props.filter !== nextProps.filter ){
            console.log('FILTER WAS CHANGED');
            this.props.fetchContacts(nextProps.filter);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        //do not rerender when filter.term is changed, rerender when contacts[] get update
        return this.props.filter !== nextProps.filter ?    false : true ;
    }

    //before render() couse infiniti loop
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate'); //, no! setState, no! dispatch actions
    }

    //after render()
    componentDidUpdate(prevProps, prevState) {
        console.log(  'componentDidUpdate');
    }


    set_filter_term(letter, e){
        console.log('letter:', letter);
        //Update filter in store
        this.props.set_filter_term({term:letter,  type:'alpha'});
    }

    pagingClick(){
        console.log('pagingClick');
    }

    renderContacts(){
        if(this.props.contacts.length<=0){
            return <tr><td className="center" colSpan="8">No records to show</td></tr>
        }
        return this.props.contacts.map(contact =>{
            return(
                <tr key={contact.Id}>
                    <td>{contact.FirstName+' '+contact.LastName }</td><td>{contact.CompanyName}</td><td>{contact.OfficeNo}</td><td>{contact.MobileNo}</td><td>{contact.FaxNo}</td><td>{contact.Category}</td><td>{contact.Notes}</td>
                    <td className="center-align" >
                        <Link to={`/edit_contact/${contact.Id}`}  className="waves-effect waves-light btn btn-small "><i className="material-icons ">create</i></Link>
                        <a className="waves-effect waves-light btn btn-small red lighten-2"><i className="material-icons ">delete</i></a>
                    </td>
                </tr>
            )
        })
    }

    render(){
        {console.log( 'render')}
        {console.log(this.props.contacts, 'PROPS contacts')}
        return(
            <div>
                <div className="row">
                     <SearchBox />
                </div>
                <Alpha set_filter_term={this.set_filter_term} active_term={this.props.filter.term}/>

                <div className="card " >
                    <table className="bordered striped highlight  ">
                        <thead className="teal lighten-1 white-text ">
                            <tr className="">
                                <th>Name</th><th>Company Name</th><th>Work Phone</th><th>Mobile Phone</th><th>Fax No.</th><th>Category</th><th style={{width:'10%'}}>Notes</th><th tyle={{width:'35px'}}>Modify</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderContacts()}
                        </tbody>
                    </table>
                </div>

                <Paging
                    records_total=""
                    pagingClick={this.pagingClick}
                />

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        contacts: state.contacts,
        filter:   state.filter
    }
}


export default connect(mapStateToProps, {fetchContacts, set_filter_term})(RecordsList);