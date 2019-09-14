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
import DisqusDialog from './DisqusDialog';
import ProjectDetailList from './ProjectDetailList';
import colors from './Pallete';

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

  render() {
    const {
      classes,
      openProjectData,
      isLoading,
      serialNo,
    } = this.props;

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
              <Typography variant="body1">{openProjectData.name}</Typography>
            </div>
            <div className={classes.labelColumn}>
              <Grid container justify="flex-end" spacing={2}>
                {openProjectData.labels.map(lb => (
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
              <DisqusDialog
                url={openProjectData.id}
                id={openProjectData.id}
                title={openProjectData.name}
              />
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
};

export default withStyles(styles)(IdeaViewPanel);
