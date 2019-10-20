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
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Attachment from '@material-ui/icons/Attachment';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Folder from '@material-ui/icons/Folder';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: grey[100],
  },
  superNested: {
    paddingLeft: theme.spacing(8),
    backgroundColor: grey[300],
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

  listIcon = (level) => {
    switch (level) {
      case 0: return <SendIcon color="primary" />;
      case 1: return <Folder />;
      case 3: return <Attachment />;
      default: return <Attachment />;
    }
  }

  handleClick(selfPath) {
    this.setState((prevState) => {
      if (prevState[selfPath] === undefined) {
        return ({ [selfPath]: true });
      }
      return ({ [selfPath]: !prevState[selfPath] });
    });
  }

  generateTree(obj, classes, level = 0, parentConcatenatedName) {
    const parentDirectory = parentConcatenatedName === undefined ? '' : parentConcatenatedName;

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
          <ListItem key={`${level}tree${i}`} className={className}>
            <ButtonBase target="_blank" rel="noopener noreferrer" href={obj[i].url}>
              <ListItemIcon>{this.listIcon(level)}</ListItemIcon>
              <Typography variant="body2">{obj[i].name}</Typography>
            </ButtonBase>
          </ListItem>
        );
        listItems.push(listItemJSX);
      }
      return (
        <List component="div" disablePadding>
          {listItems}
          <Divider />
        </List>
      );
    }

    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      const selfPath = `${parentDirectory}/${keys[i]}`;

      const { [selfPath]: selfPathOpenState } = this.state;
      const openState = selfPathOpenState === undefined ? false : selfPathOpenState;
      const listItemJSX = (
        <div key={`${level}tree${i}`}>
          <ListItem
            key={`${level}tree${i}`}
            button
            className={className}
            onClick={
              e => this.handleClick(selfPath, e)
            }
          >
            <ListItemIcon>
              {this.listIcon(level)}
            </ListItemIcon>
            <ListItemText primary={keys[i]} secondary={parentDirectory.split('/').pop()} />
            {openState ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
        </div>
      );
      listItems.push(listItemJSX);
      const subListJSX = (
        <Collapse key={`${level}treeCollapse${i}`} in={openState} timeout="auto" unmountOnExit>
          {this.generateTree(obj[keys[i]], classes, level + 1, `${parentDirectory}/${keys[i]}`)}
        </Collapse>
      );
      listItems.push(subListJSX);
    }


    return (
      <div className={classes.root}>
        <Box boxShadow={2}>
          <List component="div" disablePadding>
            <Divider />
            {listItems}
          </List>
        </Box>
      </div>
    );
  }

  render() {
    const { classes, data, isLoading } = this.props;

    if (isLoading !== false) {
      return 'Loading TreeView\n';
    }

    return (
      <React.Fragment>
        {this.generateTree(data, classes)}
      </React.Fragment>
    );
  }
}

TreeView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TreeView);
