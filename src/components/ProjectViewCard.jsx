import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { GithubCircle, Web } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { grey } from '@material-ui/core/colors';
import styled from 'styled-components';
import CustomModal from './CustomModal';
import colors from './Pallete';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: '10px',
  },
  cardContent: {
    minHeight: '3em',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '&:hover': {
      color: grey[800],
    },
  },
});

const StyledCardActions = styled(CardActions)`
  background-color: ${props => props.theme.main};
`;

class ProjectViewCard extends React.Component {
  state = { expanded: false };

  backgroundColor = (i, type) => {
    let shade = 'light';
    if (type === 0) { shade = 'main'; }
    if (i % 4 === 0) {
      return colors.color1[shade];
    } if (i % 4 === 1) {
      return colors.color2[shade];
    } if (i % 4 === 2) {
      return colors.color3[shade];
    }
    return colors.color4[shade];
  };


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { expanded } = this.state;
    const { classes, projectData, isLoading } = this.props;

    if (isLoading !== false) {
      return 'Loading ProjectViewCard\n';
    }

    const arg = parseInt(projectData.arg, 10);
    const actionBackgroundTheme = {
      main: this.backgroundColor(arg, 0),
    };

    const expandBackgroundTheme = {
      backgroundColor: this.backgroundColor(arg, 1),
    };

    return (
      <Card className={classes.card}>
        <CardHeader
          title={projectData.name}
          // subheader={projectData.launchDate}
          subheader={projectData.start_date}
        />
        <CardMedia
          className={classes.media}
          // image="/static/images/cards/paella.jpg"
          image="https://picsum.photos/400/200/?random"
          title="Screenshot Image"
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p">
            {projectData.description}
          </Typography>
        </CardContent>
        <StyledCardActions className={classes.actions} theme={actionBackgroundTheme}>
          <div className={classes.social}>
            <a href={projectData['Github URL']} className={classes.socialIcon}><GithubCircle /></a>
            <a href={projectData['Website URL']} className={classes.socialIcon}><Web /></a>
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
            <Typography paragraph>
              {' '}
Working Team:
              {' '}
              {projectData.members}
            </Typography>
            <CustomModal
              url={projectData.id}
              id={projectData.id}
              title={projectData.id}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ProjectViewCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  projectData: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ProjectViewCard);
