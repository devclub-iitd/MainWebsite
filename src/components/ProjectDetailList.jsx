import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  id: {
    color: grey[600],
  },
});

class ProjectDetailList extends React.Component {
  listItem = (str1, str2) => {
    if (str2 === '' || str2 === '-') {
      return null;
    }
    return <ListItem><ListItemText primary={str1} secondary={str2} /></ListItem>;
  }

  render() {
    const { openProjectData, classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="caption" className={classes.id}>
          {`#${openProjectData.id}`}
        </Typography>
        <List>
          {this.listItem('Description', openProjectData.Description)}
          {this.listItem('Extra', openProjectData.Extra)}
          {this.listItem('Working Team', openProjectData['Working Team'])}
          {this.listItem('Issuing Authority / Contact', openProjectData['Issuing Authority / Contact'])}
          {this.listItem('Email ID / Number of Contact', openProjectData['Email ID / Number of Contact'])}
          {this.listItem('Date of Issue', openProjectData['Date of Issue (dd-mm-yyyy)'])}
          {this.listItem('Date of Closure', openProjectData['Date of Closure (If not Active)'])}
          {this.listItem('Comments on Status', openProjectData['Comment on Status'])}
          {this.listItem('Requirements', openProjectData['Requirement if still Active'])}
          {this.listItem('Rewards/Benefit', openProjectData['Rewards/Benefit'])}
          {this.listItem('Document', openProjectData.Document)}
        </List>
      </React.Fragment>
    );
  }
}

ProjectDetailList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  openProjectData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(ProjectDetailList);
