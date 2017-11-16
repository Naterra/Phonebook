import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {bindActionCreators} from 'redux';
import { fetchContacts } from '../actions';
import { Link } from 'react-router-dom';

import Alpha from './alphabetMenu';


class RecordsList extends Component{
    componentWillMount(){
        this.props.fetchContacts();
    }

    renderContacts(){
        //console.log(this.props.contacts, 'PROPS renderContacts')
        return this.props.contacts.map(contact =>{
            return(
                <tr key={contact.Id}>
                <td>{contact.FirstName+' '+contact.LastName }</td>
                <td>{contact.CompanyName}</td>
                <td>{contact.OfficeNo}</td>
                <td>{contact.MobileNo}</td>
                <td>{contact.FaxNo}</td>
                <td>{contact.Category}</td>
                <td>{contact.Notes}</td>
                <td className="center-align" >
                    <Link to={`/edit_contact/${contact.Id}`}  className="waves-effect waves-light btn btn-small "><i className="material-icons ">create</i></Link>
                    <a className="waves-effect waves-light btn btn-small red lighten-2"><i className="material-icons ">delete</i></a>




                </td>
            </tr>
            )
        })
    }

    render(){
        return(
            <div>
            <Alpha />
            <div className="card " >
                {console.log(this.props.contacts, 'PROPS contacts')}

            <table className="bordered striped highlight  ">
                <thead className="teal lighten-1 white-text ">
                <tr className="">
                    <th>Name</th>
                    <th>Company Name</th>
                    <th>Work Phone</th>
                    <th>Mobile Phone</th>
                    <th>Fax No.</th>
                    <th>Category</th>
                    <th style={{width:'10%'}}>Notes</th>
                    <th tyle={{width:'35px'}}>Modify</th>
                </tr>
                </thead>

                <tbody>
                {this.renderContacts()}

                </tbody>
            </table>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {contacts: state.contacts }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchContacts}, dispatch);
// }

export default connect(mapStateToProps, {fetchContacts:fetchContacts})(RecordsList);
//export default connect(mapStateToProps, {fetchContacts})(RecordsList);