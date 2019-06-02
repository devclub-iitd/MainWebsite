import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import CustomModal from './CustomModal';

const styles = theme => ({
  root: {
    width: '100%',
  },
  id: {
    color: grey[400],
  },
  panel: {
    //
  },
  panelSummary: {
    borderBottom: '1px solid rgba(0, 0, 0, .055)',
  },
  panelName: {
    flexBasis: 'auto',
    justifyContent: 'flex-start',
  },
  panelDetail: {
    backgroundColor: grey[50],
  },
  serialNumber: {
    width: 25,
    height: 25,
  },
});

class IdeaViewPanel extends React.Component {
  listItem = (str1, str2) => {
    if (str2 === '' || str2 === '-') {
      return null;
    }
    return <ListItem><ListItemText primary={str1} secondary={str2} /></ListItem>;
  }

  acceptLabel = (str) => {
    if (str === 'Y') {
      return <Grid item><Chip icon={<DoneIcon />} label="Accepted" color="primary" variant="outlined" /></Grid>;
    }
    return null;
  }

  Label = (str) => {
    if (str === '' || str === '-') {
      return null;
    }
    return <Grid item><Chip label={str} variant="outlined" /></Grid>;
  }

  render() {
    const { classes, openProjectData, isLoading, serialNo } = this.props;

    if (isLoading !== false) {
      return 'Loading IdeaViewPanel\n';
    }

    return (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Box boxShadow={5}>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={openProjectData.id}
                id={openProjectData.id}
                className={classes.panelSummary}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <Grid container justify="flex-start" spacing={2}>
                      <Grid item><Avatar className={classes.serialNumber}><Typography>{serialNo}</Typography></Avatar></Grid>
                      <Grid item>
                        <Box textAlign="left">
                          <Typography variant="body1">{openProjectData.Projects}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justify="flex-end" spacing={2}>
                      {/* To be replaced with labels from api */}
                      {this.Label('sample label')}
                      {this.acceptLabel(openProjectData['Accepted (Y/N)'])}
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelDetail}>
                <div className={classes.id}>
                  <Typography variant="caption"> #{openProjectData.id}</Typography>
                </div>
                <div>
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
                </div>
                <Grid container justify="flex-end">
                  <CustomModal
                    url={openProjectData.id}
                    id={openProjectData.id}
                    title={openProjectData.id}
                  />
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </div>
      </Container>
    );
  }
}

IdeaViewPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  openProjectData: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  serialNo: PropTypes.number.isRequired,
};

export default withStyles(styles)(IdeaViewPanel);
