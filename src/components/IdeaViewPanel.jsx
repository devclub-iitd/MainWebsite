import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomModal from './CustomModal';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class IdeaViewPanel extends React.Component {
  // state = { expanded: false };

  render() {
    // const { expanded } = this.state;
    const { classes, openProjectData, isLoading } = this.props;
    // const project_id = openProjectData.id;

    if (isLoading !== false) {
      return 'Loading IdeaViewPanel\n';
    }

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={openProjectData.id}
            id={openProjectData.id}
          >
            <Typography>{openProjectData.Projects}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CustomModal
              url={openProjectData.id}
              id={openProjectData.id}
              title={openProjectData.id}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

IdeaViewPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  openProjectData: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(IdeaViewPanel);
