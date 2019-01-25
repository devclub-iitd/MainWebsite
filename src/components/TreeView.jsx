import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    // maxWidth: 360,
    // paddingLeft: theme.spacing.unit * 4,
  },
  superNested: {
    // maxWidth: 360,
    // paddingLeft: theme.spacing.unit * 4 * 2,
  },
});

function generateTree(obj, classes, level = 0) {

  let className = '';
  switch (level) {
    case 0: className = classes.root;
      break;
    case 1: className = classes.nested;
      break;
    case 2: className = classes.superNested;
      break;
    default:
      className = classes.superNested;
  }

  const listItems = [];

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i += 1) {
      const listItemJSX = (
        <ListItem button className={className}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary={obj[i].name} />
        </ListItem>
      );
      listItems.push(listItemJSX);
    }
    return (
      <List component="div" disablePadding>
        {listItems}
      </List>
    );
  }

  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i += 1) {
    const listItemJSX = (
      <ListItem button className={className}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText inset primary={keys[i]} />
        <ExpandLess />
      </ListItem>
    );
    listItems.push(listItemJSX);
    const subListJSX = (
      <Collapse in={true} timeout="auto" unmountOnExit>
        {generateTree(obj[keys[i]], classes, level + 1)}
      </Collapse>
    );
    listItems.push(subListJSX);
  }


  return (
      <List component="div" disablePadding>
        {listItems}
      </List>
  );
}

class TreeView extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, data } = this.props;
    return (
      <React.Fragment>
        { generateTree(data, classes) }
      </React.Fragment>
    );
  }
}

TreeView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeView);