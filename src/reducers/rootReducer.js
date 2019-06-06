import {
  combineReducers,
} from 'redux';
import completeReducer from './allReducers';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  completeReducer,
  visibilityFilter,
});
