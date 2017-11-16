import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { updateContact, fetchContact } from '../actions';
import formFields from './formFields';
import formFieldsTempl from './formFieldTempl';




class EditContactForm extends Component{
    componentWillMount(){
        //console.log(this.props, 'PROPS');
        const  { id }   =  this.props.match.params;
        console.log(id, 'ID');

        //get rec
        this.props.fetchContact(id);
    }

    formSubmit(){
        console.log(this.props, 'submit form');
    }

    renderFields(){
        return formFields.map(field=>{
            return(
                    <Field key={field.name} name={field.name} component={formFieldsTempl} label={field.label} type="text" />
            );
        });
    }

    render(){
        //console.log( state, 'state');
        return(
           <form onSubmit={ this.props.handleSubmit(this.formSubmit) }>
               { this.renderFields()}
               <Link to="/" className="red btn-flat white-text">Cansel</Link>
               <button type="submit" className="teal btn-flat right white-text">Save <i className="material-icons right">done</i> </button>
           </form>
        )
    }
}

// function mapStateToProps(state, ownProps){
    // console.log( state, 'state');
    // console.log( ownProps, 'ownProps');
    //
    // const  { id }  =  ownProps.match.params;
    // console.log( id, 'id');
    //
    // const record =state.contacts.find( rec =>{
    //     return rec.Id == id;
    // });
    //
    // if(!record){
    //     //axios
    // }
    //
    // console.log( record, 'record');
    //
    // return {
    //     formValues: record
    // };
// }

function validate(values){
    const errors ={};

    if(!values.firstName){
        errors.title = "Enter a First Name";
    }

    return errors;
}



export default reduxForm({
    form:'ContactForm',
    fields: ['title','categories','content']
})(
    connect( null, { fetchContact})(EditContactForm)
);


