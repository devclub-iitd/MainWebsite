import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Facebook, GithubCircle, Email } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import colors from './Pallete';

const styles = theme => ({
  card: {
    minWidth: 260,
    margin: '10px',
  },
  cardContent: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  intro: {
    minHeight: 70,
    marginTop: 10,
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
    width: 80,
    height: 80,
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '&:hover': {
      color: grey[800],
    },
  },
  memberDetails: {
    width: 250,
    margin: 'auto',
  },
  memberName: {
    width: '100%',
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
  backgroundColor = (string) => {
    if (string === 'Senior Undergraduate') {
      return colors.color1.main;
    } if (string === 'Junior Undergraduate') {
      return colors.color2.main;
    } if (string === 'Sophomore') {
      return colors.color3.main;
    }
    return colors.color4.main;
  };

  renderData() {
    const { classes, memberData, isLoading } = this.props;

    if (isLoading !== false) {
      return 'Loading MemberViewCard\n';
    }

    const backgroundTheme = {
      main: this.backgroundColor(memberData.category),
    };

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.memberDetails}>
            <MediaQuery maxDeviceWidth={1400}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={5}>
                  <div className={classes.avatarHolder}>
                    <Avatar alt={memberData.name} src={memberData.url.picture_url} className={classes.bigAvatar} />
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6" component="h4" className={classes.memberName}>
                    {memberData.name}
                  </Typography>
                </Grid>
              </Grid>
            </MediaQuery>
            <MediaQuery minDeviceWidth={1401}>
              <div className={classes.avatarHolder}>
                <Avatar alt={memberData.name} src={memberData.url.picture_url} className={classes.bigAvatar} />
              </div>
              <Typography variant="h6" component="h4" className={classes.memberName}>
                {memberData.name}
              </Typography>
            </MediaQuery>
          </div>
          <Typography component="p" className={classes.intro}>
            {memberData.intro}
          </Typography>
        </CardContent>
        <StyledCardActions theme={backgroundTheme}>
          <div className={classes.social}>
            <a href={memberData.url.fb_url} className={classes.socialIcon}><Facebook /></a>
            <a href={memberData.url.github_url} className={classes.socialIcon}><GithubCircle /></a>
            <a href={memberData.email} className={classes.socialIcon}><Email /></a>
          </div>
        </StyledCardActions>
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
