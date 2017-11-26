import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
//import {bindActionCreators} from 'redux';
import { fetchContacts, set_filter_term, set_filter_page} from '../actions';
import { Link } from 'react-router-dom';

import Alpha from '../components/alphabetMenu';
import Paging from '../components/paging';
import SearchBox from './SearchBox';



class RecordsList extends Component{
    constructor(props){
        super(props);

        this.onClickAlpha  = this.onClickAlpha.bind(this);
        this.pagingOnClick = this.pagingOnClick.bind(this);
        // console.log(this, "THIS constructor");
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
    // componentWillUpdate(nextProps, nextState) {
    //     // console.log('componentWillUpdate'); //, no! setState, no! dispatch actions
    // }

    //after render()
    componentDidUpdate(prevProps, prevState) {
        // console.log(  'componentDidUpdate');
    }


    onClickAlpha(letter, e){
        console.log('letter:', letter);
        //Update filter in store
        this.props.set_filter_term({term:letter,  type:'alpha'});
        this.props.set_filter_page(1);
    }

    pagingOnClick(el, e){
        console.log(el, 'pagingOnClick');
        this.props.set_filter_page(el);
        //update redux state.filter.page

    }

    renderContacts(){
        // let records_numb = Object.size(this.props.contacts.data);

        console.log('renderContacts()');
        // console.warn( Object.values(this.props.contacts.data)  , 'this.props.contacts.data type');

        if(this.props.contacts.data){
            // console.log(typeof(this.props.contacts.data), 'typeof');
            // console.log( this.props.contacts , 'contacts');
            console.log( this.props.contacts.data.length , 'length');

            if( this.props.contacts.data.length == 0){
                console.log('HEREEEE!!!');
                return <tr><td className="center" colSpan="8">No records to show</td></tr>
            }

            return this.props.contacts.data.map(contact =>{
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






    }

    render(){
        {console.log( 'RECORDSLIST: render')}
        // console.log(this.props.contacts.total, 'PROPS contacts TOTAL');
        return(
            <div>
                <div className="row">
                     <SearchBox />
                </div>
                <Alpha
                    set_filter_term={this.onClickAlpha}
                    active_term={this.props.filter.term}
                />

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
                    total={this.props.contacts.total}
                    records_perPage={this.props.filter.limit}
                    currentPage={this.props.filter.page}
                    pager_offset ='3'
                    pagingOnClick={this.pagingOnClick}
                />

            </div>
        )
    }
}

RecordsList.propTypes = {
    contacts: PropTypes.shape({
        data: PropTypes.array,
        total: PropTypes.number
    }),
}

function mapStateToProps(state){
    return {
        contacts: state.contacts,
        filter:   state.filter
    }
}


export default connect(mapStateToProps, {fetchContacts, set_filter_term, set_filter_page})(RecordsList);