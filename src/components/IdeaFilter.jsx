import React from 'react';
import Typography from '@material-ui/core/Typography';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions/allActions';

const IdeaFilter = () => (
  <div>
    <Typography>Filters:</Typography>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All Projects</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_LABEL1}>label 1</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_LABEL2}>label 2</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_LABEL3}>label 3</FilterLink>
  </div>
);

export default IdeaFilter;
