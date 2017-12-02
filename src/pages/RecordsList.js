import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  fetchContacts,
  set_filter_term,
  set_filter_page,
  delete_contact
} from "../actions";
import { Link } from "react-router-dom";

import Alpha from "../components/alphabetMenu";
import Paging from "../components/paging";
import SearchBox from "../containers/SearchBox";
import RecordsListItem from "../components/recordsListItem";

class RecordsList extends Component {
  constructor(props) {
    super(props);

    this.onClickAlpha = this.onClickAlpha.bind(this);
    this.pagingOnClick = this.pagingOnClick.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchContacts(this.props.filter);
  }

  //UPDATERS
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");

    if (this.props.filter !== nextProps.filter) {
      console.log("FILTER WAS CHANGED");
      this.props.fetchContacts(nextProps.filter);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //do not rerender when filter.term is changed, rerender when contacts[] get update
    return this.props.filter !== nextProps.filter ? false : true;
  }

  //before render() couse infiniti loop
  // componentWillUpdate(nextProps, nextState) {
  //     // console.log('componentWillUpdate'); //, no! setState, no! dispatch actions
  // }

  //after render()
  componentDidUpdate(prevProps, prevState) {
    // console.log(  'componentDidUpdate');
  }

  onClickAlpha(letter, e) {
    console.log("letter:", letter);
    //Update filter in store
    this.props.set_filter_term({ term: letter, type: "alpha" });
    this.props.set_filter_page(1);
  }

  pagingOnClick(el, e) {
    console.log(el, "pagingOnClick");
    this.props.set_filter_page(el);
    //update redux state.filter.page
  }

  deleteContact(id) {
    console.log(id, "deleteContact " + id);
    this.props.delete_contact(id);
  }

  renderContacts() {
    console.log("renderContacts()");

    if (this.props.contacts.data) {
      if (this.props.contacts.data.length == 0) {
        return (
          <tr>
            <td className="center" colSpan="8">
              No records to show
            </td>
          </tr>
        );
      }

      return this.props.contacts.data.map(contact => {
        return (
          <RecordsListItem
            deleteContact={this.deleteContact}
            key={contact.Id}
            contact={contact}
          />
        );
      });
    }
  }

  render() {
    {
      console.log("RecordsList: render");
    }
    // console.log(this.props.contacts.total, 'PROPS contacts TOTAL');
    return (
      <div>
        <div className="row">
          <SearchBox />
        </div>

        <Alpha
          set_filter_term={this.onClickAlpha}
          active_term={this.props.filter.term}
        />

        <div className="card ">
          <table className="bordered striped highlight  ">
            <thead className="teal lighten-1 white-text ">
              <tr>
                <th>Name</th>
                <th>Company Name</th>
                <th>Work Phone</th>
                <th>Mobile Phone</th>
                <th>Fax No.</th>
                <th>Category</th>
                <th style={{ width: "10%" }}>Notes</th>
                <th tyle={{ width: "35px" }}>Modify</th>
              </tr>
            </thead>

            <tbody>{this.renderContacts()}</tbody>
          </table>
        </div>

        <Paging
          total={this.props.contacts.total}
          records_perPage={this.props.filter.limit}
          currentPage={this.props.filter.page}
          pager_offset="3"
          pagingOnClick={this.pagingOnClick}
        />
      </div>
    );
  }
}

RecordsList.propTypes = {
  contacts: PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number
  })
};

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    filter: state.filter
  };
}

export default connect(mapStateToProps, {
  fetchContacts,
  set_filter_term,
  set_filter_page,
  delete_contact
})(RecordsList);
