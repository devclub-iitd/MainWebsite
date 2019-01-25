import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    // maxWidth: 360,
    paddingLeft: theme.spacing.unit * 4,
  },
  superNested: {
    // maxWidth: 360,
    paddingLeft: theme.spacing.unit * 4 * 2,
  },
});

class TreeView extends React.Component {
  state = {
  };

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
    this.generateTree.bind(this);
  }

  handleClick(name, parentDirectory) {
    this.setState((prevState) => {
      if (prevState[parentDirectory] === undefined) {
        return ({
          [parentDirectory]: {
            [name]: true,
          },
        });
      }
      if (prevState[parentDirectory][name] === undefined) {
        return ({
          [parentDirectory]: {
            ...prevState[parentDirectory],
            [name]: true,
          },
        });
      }
      return ({
        [parentDirectory]: {
          ...prevState[parentDirectory],
          [name]: !prevState[parentDirectory][name],
        },
      });
    });
  }

  generateTree(obj, classes, level = 0, parentDirectoryInput) {
    let className = '';

    const parentDirectory = parentDirectoryInput === undefined ? 'root' : parentDirectoryInput;

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

    // const onClickFunction = (keys) => this.handleClick(keys);

    for (let i = 0; i < keys.length; i += 1) {
      let openState = false;
      if (level === 0) {
        const { root } = this.state;
        if (root !== undefined && root[keys[i]] !== undefined) {
          openState = root[keys[i]];
        }
      } else if (level === 1) {
        const { [parentDirectory]: parent } = this.state;
        if (parent !== undefined && parent[keys[i]] !== undefined) {
          openState = parent[keys[i]];
        }
      }

      const listItemJSX = (
        <ListItem
          button
          className={className}
          onClick={
            e => this.handleClick(keys[i], parentDirectory, e)
          }
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary={keys[i]} />
          {openState ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      );
      listItems.push(listItemJSX);
      const subListJSX = (
        <Collapse in={openState} timeout="auto" unmountOnExit>
          {this.generateTree(obj[keys[i]], classes, level + 1, keys[i])}
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

  render() {
    const { classes, data } = this.props;
    return (
      <React.Fragment>
        {this.generateTree(data, classes)}
      </React.Fragment>
    );
  }
}

TreeView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeView);
