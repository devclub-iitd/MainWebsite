import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ButtonBase from '@material-ui/core/ButtonBase';
import { indigo } from '@material-ui/core/colors';
import Menu from './Menu';

const logo = require('../logo.png');

const styles = theme => ({
  appBar: {
    position: 'fixed',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',
  },
  inline: {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  },
  clubLogo: {
    display: 'inline-block',
    overflow: 'hidden',
  },
  clubImage: {
    display: 'inline-block',
    height: 60,
    width: 'auto',
  },
  productLogo: {
    display: 'inline-block',
    position: 'relative',
    lineHeight: 1.75,
    marginLeft: 132,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 24,
    overflow: 'hidden',
    borderLeft: `1px solid ${theme.palette.grey.A100}`,
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  iconButton: {
    float: 'right',
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto',
  },
});

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 60,
      width: '100%',
      backgroundColor: indigo[400],
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(17),
    marginRight: theme.spacing(1),
    '&:focus': {
      color: indigo[600],
      opacity: 1,
    },
    '&:hover': {
      color: indigo[600],
      opacity: 1,
    },
    '&$selected': {
      color: indigo[800],
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))(props => <Tab disableRipple {...props} />);


class Topbar extends Component {
  state = {
    value: 0,
    menuDrawer: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  mobileMenuOpen = () => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = () => {
    this.setState({ menuDrawer: false });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleLogoClick = () => {
    this.setState({ value: 0 });
  }

  current = () => {
    const { location } = this.props;
    const currentPath = location.pathname;

    // switch (currentPath) { // use this when ideas page is ready
    //   case '/home': return 0;
    //   case '/team': return 1;
    //   case '/projects': return 2;
    //   case '/ideas': return 3;
    //   case '/events': return 4;
    //   case '/misc': return 5;
    //   case '/contact': return 6;
    //   default: return 0;
    // }

    switch (currentPath) {
      case '/home': return 0;
      case '/team': return 1;
      case '/projects': return 2;
      // case '/ideas': return 3;
      case '/events': return 3;
      case '/misc': return 4;
      // case '/contact': return 5;
      case '/partners': return 5;
      default: return 0;
    }
  }

  render() {
    const { classes, noTabs, location } = this.props;
    const { menuDrawer, value } = this.state;

    const logoPosition = window.innerWidth < 960 ? 'relative' : 'absolute';
    const iitMargin = window.innerWidth < 960 ? 0 : 132;

    return (
      <AppBar position="absolute" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="baseline">
            <Grid item xs={12} container alignItems="baseline" className={classes.flex}>
              <ButtonBase onClick={this.handleLogoClick} className={classes.clubLogo} style={{ position: `${logoPosition}` }}>
                <Link to="/" className={classes.link}>
                  <img src={logo} alt="Logo" className={classes.clubImage} />
                </Link>
              </ButtonBase>
              {!noTabs && (
                <React.Fragment>
                  <Typography className={classes.productLogo} style={{ marginLeft: `${iitMargin}` }}>
                    IIT Delhi
                  </Typography>
                  <div className={classes.iconContainer}>
                    <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} aria-label="Menu">
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer anchor="right" open={menuDrawer} onOpen={this.mobileMenuOpen} onClose={this.mobileMenuClose}>
                      <AppBar title="Menu" />
                      <div
                        role="presentation"
                        onClick={this.mobileMenuClose}
                        onKeyDown={this.mobileMenuClose}
                      >
                        <List>
                          {Menu.map(item => (
                            <ListItem
                              key={item.label}
                              component={Link}
                              to={{ pathname: item.pathname, search: location.search }}
                              button
                            >
                              <ListItemText primary={item.label} />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    </SwipeableDrawer>
                    <StyledTabs
                      value={this.current() || value}
                      onChange={this.handleChange}
                    >
                      {Menu.map(item => (
                        <StyledTab
                          key={item.label}
                          component={Link}
                          to={{ pathname: item.pathname, search: location.search }}
                          label={item.label}
                        />
                      ))}
                    </StyledTabs>
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

Topbar.propTypes = {
  noTabs: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Topbar.defaultProps = {
  noTabs: false,
};

export default withRouter(withStyles(styles)(Topbar));
