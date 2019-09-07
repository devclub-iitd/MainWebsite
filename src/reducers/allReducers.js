const initialState = {
  data: {},
  isLoading: {},
  errorFetching: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MEMBERS_PENDING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          members: true,
        },
      };
    case 'FETCH_MEMBERS_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          members: action.payload.data,
        },
        isLoading: {
          ...state.isLoading,
          members: false,
        },
        errorFetching: {
          ...state.errorFetching,
          members: false,
        },
      };
    case 'FETCH_MEMBERS_REJECTED':
      return {
        ...state,
        errorFetching: {
          ...state.errorFetching,
          members: true,
        },
      };
    case 'FETCH_EVENTS_PENDING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          events: true,
        },
      };
    case 'FETCH_EVENTS_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          events: action.payload.data,
        },
        isLoading: {
          ...state.isLoading,
          events: false,
        },
        errorFetching: {
          ...state.errorFetching,
          events: false,
        },
      };
    case 'FETCH_EVENTS_REJECTED':
      return {
        ...state,
        errorFetching: {
          ...state.errorFetching,
          events: true,
        },
      };
    case 'FETCH_PROJECTS_PENDING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          projects: true,
        },
      };
    case 'FETCH_PROJECTS_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          projects: action.payload.data,
        },
        isLoading: {
          ...state.isLoading,
          projects: false,
        },
        errorFetching: {
          ...state.errorFetching,
          projects: false,
        },
      };
    case 'FETCH_PROJECTS_REJECTED':
      return {
        ...state,
        errorFetching: {
          ...state.errorFetching,
          projects: true,
        },
      };
    case 'FETCH_RESOURCES_PENDING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          resources: true,
        },
      };
    case 'FETCH_RESOURCES_FULFILLED':
      return {
        ...state,
        data: {
          ...state.data,
          resources: action.payload.data,
        },
        isLoading: {
          ...state.isLoading,
          resources: false,
        },
        errorFetching: {
          ...state.errorFetching,
          resources: false,
        },
      };
    case 'FETCH_RESOURCES_REJECTED':
      return {
        ...state,
        errorFetching: {
          ...state.errorFetching,
          resources: true,
        },
      };
    default:
      return state;
  }
};
