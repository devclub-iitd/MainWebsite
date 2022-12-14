/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
// import { Facebook, Github, Email, Linkedin } from 'mdi-material-ui';
import { Facebook, Github, Email, Linkedin } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { grey } from '@material-ui/core/colors';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import colors from './Pallete';


/* eslint-disable */

const avatarSize = window.innerWidth < 960 ? '80px' : '100px';

const styles = theme => ({
  card: {
    minWidth: 160,
    margin: '10px',
  },
  cardContent: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingTop: 10,
  },
  chip: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cover: {
    width: '100%',
    height: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatarHolder: {
    width: '100%',
    margin: 10,
  },
  bigAvatar: {
    margin: '0 auto',
    width: `${avatarSize}`,
    height: `${avatarSize}`,
  },
  expand: {
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  socialIcon: {
    color: '#050401',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      color: grey[800],
    },
  },
  memberDetails: {
    // width: 250,
    margin: 'auto',
  },
  memberName: {
    width: '100%',
    height: '50px',
    fontWeight: '600',
    letterSpacing: '1px'
  },
});

const StyledCardActions = styled(CardActions)`
  background-color: ${props => props.theme.main};
  // background: -webkit-linear-gradient(250deg, #ffffff 60%, ${props => props.theme.main} 60%);
  // background: -o-linear-gradient(250deg, #ffffff 60%, ${props => props.theme.main} 60%);
  // background: -moz-linear-gradient(250deg, #ffffff 60%, ${props => props.theme.main} 60%);
  // background: linear-gradient(250deg, #ffffff 60%, ${props => props.theme.main} 60%);
`;

class MemberViewCard extends Component {
  state = { expanded: false };

  backgroundColor = (string) => {
    if (string === 'Overall Coordinator') {
      return colors.color1.main;
    } if (string === 'Executive') {
      return colors.color2.main;
    } if (string === 'Developer') {
      return colors.color3.main;
    } if (string === 'Event Coordinator') {
      return colors.color4.main;
    }
    return colors.color5.main; // Alumni
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  renderData() {
    const { expanded } = this.state;
    const { classes, memberData, isLoading } = this.props;

    if (isLoading !== false) {
      return 'Loading MemberViewCard\n';
    }

    const backgroundTheme = {
      main: this.backgroundColor(memberData.category),
    };

    const expandBackgroundTheme = {
      backgroundColor: this.backgroundColor(memberData.category, 1),
    };

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.memberDetails}>
            <Grid container justifyContent="center">
              <MediaQuery maxDeviceWidth="960px">
                <Typography variant="body1" component="h4" className={classes.memberName}>
                  {memberData.name}
                </Typography>
              </MediaQuery>
              <MediaQuery minDeviceWidth="961px">
                <Typography variant="h6" component="h4" className={classes.memberName}>
                  {memberData.name}
                </Typography>
              </MediaQuery>
              <CardMedia
                className={classes.cover}
                image={memberData.url.picture_url}
                title={memberData.name}
              />
            </Grid>
          </div>
        </CardContent>
        <StyledCardActions theme={backgroundTheme}>
          <div className={classes.social}>
            {
              memberData.url.fb_url === "" ? "" : <a target="_blank" rel="noopener noreferrer" href={memberData.url.fb_url} className={classes.socialIcon}><Facebook /></a>
            }
            {
              memberData.url.linkedin_url ?
              (
                memberData.url.linkedin_url === "" ? "" 
                : <a target="_blank" rel="noopener noreferrer" href={memberData.url.linkedin_url} className={classes.socialIcon}><Linkedin /></a>
              )
              : null
            }
            {
              memberData.url.github_url === "" ? "" : <a target="_blank" rel="noopener noreferrer" href={memberData.url.github_url} className={classes.socialIcon}><Github /></a>
            }
            {
              memberData.email === "" ? "" : <a href={`mailto:${memberData.email}`} className={classes.socialIcon}><Email /></a>
            }
          </div>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </StyledCardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={expandBackgroundTheme}>
            <Typography component="p">
              {memberData.intro}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.renderData()}
        </div>
      </React.Fragment>
    );
  }
}

MemberViewCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  memberData: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MemberViewCard);
