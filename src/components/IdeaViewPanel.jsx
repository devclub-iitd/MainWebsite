import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
// import CustomModal from './CustomModal';
import ProjectDetailList from './ProjectDetailList';
import colors from './Pallete';

import DisqusBoard from './DisqusBoard';

const styles = ({
  root: {
    width: '100%',
  },
  panelSummary: {
    borderBottom: '1px solid rgba(0, 0, 0, .055)',
  },
  serialNumber: {
    width: 25,
    height: 25,
  },
  serialNumberColumn: {
    flexBasis: '5%',
  },
  nameColumn: {
    flexBasis: '50%',
  },
  labelColumn: {
    flexBasis: '45%',
  },
  disqusColumn: {
    flexBasis: '12%',
  },
  detailColumn: {
    flexBasis: '88%',
  },
});

class IdeaViewPanel extends React.Component {
  // state = {
  //   checked: false,
  // };

  backgroundColor = (i, type) => {
    let shade = 'light';
    if (type === 0) {
      shade = 'main';
    }
    if (i % 4 === 0) {
      return colors.color1[shade];
    } if (i % 4 === 1) {
      return colors.color2[shade];
    } if (i % 4 === 2) {
      return colors.color3[shade];
    }
    return colors.color4[shade];
  }

  labelColor = (str) => {
    if (str === 'label1') {
      return colors.color1.light;
    }
    if (str === 'label2') {
      return colors.color2.light;
    }
    if (str === 'label3') {
      return colors.color3.light;
    }
    return colors.color4.light;
  }

  acceptLabel = (str) => {
    if (str === 'Y') {
      return <Chip style={{ height: 27 }} icon={<DoneIcon />} label="Accepted" color="primary" variant="outlined" />;
    }
    return null;
  }

  // handleChange = () => {
  //   this.setState({ checked: true });
  // };

  render() {
    const {
      classes,
      openProjectData,
      isLoading,
      serialNo,
      handleChange,
      isChecked,
    } = this.props;

    // const { checked } = this.state;

    if (isLoading !== false) {
      return 'Loading IdeaViewPanel\n';
    }

    const colorBackgroundLight = {
      backgroundColor: this.backgroundColor(serialNo, 1),
    };

    const colorBackgroundDark = {
      backgroundColor: this.backgroundColor(serialNo, 0),
    };

    return (
      <div className={classes.root}>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={openProjectData.id}
            id={openProjectData.id}
            className={classes.panelSummary}
          >
            <div className={classes.serialNumberColumn}>
              <Avatar className={classes.serialNumber} style={colorBackgroundDark}><Typography variant="body2">{serialNo}</Typography></Avatar>
            </div>
            <div className={classes.nameColumn}>
              <Typography variant="body1">{openProjectData.Projects}</Typography>
            </div>
            <div className={classes.labelColumn}>
              <Grid container justify="flex-end" spacing={2}>
                {openProjectData.Labels.map(lb => (
                  <Grid item key={lb}>
                    <Chip
                      style={{ height: 27, background: this.labelColor(lb) }}
                      label={lb}
                    />
                  </Grid>
                ))}
                <Grid item>{this.acceptLabel(openProjectData['Accepted (Y/N)'])}</Grid>
              </Grid>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={colorBackgroundLight}>
            <div className={classes.detailColumn}>
              <ProjectDetailList openProjectData={openProjectData} />
            </div>
            <div className={classes.disqusColumn}>
              {/* <CustomModal
                url={openProjectData.id}
                id={openProjectData.id}
                title={openProjectData.id}
              /> */}
              <Fab color="primary" onClick={handleChange} variant="extended" className={classes.button}>Disqus This</Fab>
              <Slide direction="down" in={isChecked} mountOnEnter unmountOnExit>
                <Paper elevation={4} className={classes.paper}>
                  <div className={classes.paper}>
                    <Paper elevation={4}>
                      <DisqusBoard
                        url={openProjectData.id}
                        id={openProjectData.id}
                        title={openProjectData.id}
                        body="body"
                      />
                    </Paper>
                  </div>
                </Paper>
              </Slide>
            </div>
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
  serialNo: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default withStyles(styles)(IdeaViewPanel);
