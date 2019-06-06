import * as urls from '../config/API';

export const fetchMembers = () => (dispatch) => {
  dispatch({
    type: 'FETCH_MEMBERS',
    payload: fetch(urls.membersAPI).then(response => (response.json())),
  });
};

export const fetchProjects = () => (dispatch) => {
  dispatch({
    type: 'FETCH_PROJECTS',
    payload: fetch(urls.projectsAPI).then(response => (response.json())),
  });
};

export const fetchEvents = () => (dispatch) => {
  dispatch({
    type: 'FETCH_EVENTS',
    payload: fetch(urls.eventsAPI).then(response => (response.json())),
  });
};

export const fetchResources = () => (dispatch) => {
  dispatch({
    type: 'FETCH_RESOURCES',
    payload: fetch(urls.resourcesAPI).then(response => (response.json())),
  });
};

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_LABEL1: 'SHOW_LABEL1',
  SHOW_LABEL2: 'SHOW_LABEL2',
  SHOW_LABEL3: 'SHOW_LABEL3',
};
