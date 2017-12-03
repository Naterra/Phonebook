import React from "react";
import { Link } from "react-router-dom";

const recordsListItem = ({ contact, deleteContact }) => {
  return (
    <tr>
      <td>{contact.FirstName + " " + contact.LastName}</td>
      <td>{contact.CompanyName}</td>
      <td>{contact.OfficeNo}</td>
      <td>{contact.MobileNo}</td>
      <td>{contact.Category}</td>
      <td>{contact.Notes}</td>
      <td className="center-align">
        <Link
          to={`/edit_contact/${contact.Id}`}
          className="waves-effect waves-light btn btn-small "
        >
          <i className="material-icons ">create</i>
        </Link>
        <a
          onClick={e => deleteContact(contact.Id)}
          className="waves-effect waves-light btn btn-small red lighten-2"
        >
          <i className="material-icons ">delete</i>
        </a>
      </td>
    </tr>
  );
};

export default recordsListItem;
