import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

import * as types from "./types";

export function delete_contact(id, callback) {
  const request = axios
    .post(`/api/index.php?action=delete_contact`, { id: id })
    .then(() => callback());

  return {
    type: types.DELETE_CONTACT,
    id
  };
}

export function reset_pager() {
  return {
    type: types.RESET_PAGER,
    payload: null
  };
}

export function reset_filter() {
  return {
    type: types.RESET_FILTER,
    payload: {}
  };
}
export function set_filter_page(term) {
  return {
    type: types.SET_FILTER_PAGE,
    payload: term
  };
}

export function set_filter_term(term) {
  return {
    type: types.SET_FILTER_TERM,
    payload: term
  };
}

export function saveContact(values, callback) {
  const request = axios
    .post(`/api/index.php?action=save_contact`, values)
    .then(() => callback());

  return {
    type: types.SAVE_CONTACT,
    payload: request
  };
}

export function fetchContact(id) {
  const request = axios.get(`/api/index.php?action=get_contact&id=${id}`);

  return {
    type: types.FETCH_CONTACT,
    payload: request
  };
}

export function fetchContacts(filter) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const request = axios.get(
    `/api/index.php?action=get_contacts&limit=${filter.limit}&filterBy=${
      filter.term
    }&page=${filter.page}`,
    config
  );

  return {
    type: types.FETCH_CONTACTS,
    payload: request
  };
}
