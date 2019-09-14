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
    display: 'inline-flex',
    position: 'relative',
    lineHeight: 1.75,
    overflow: 'hidden',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    display: 'inline-block',
    height: 40,
    boxSizing: 'border-box',
  },
  productLogo: {
    display: 'inline-block',
    position: 'relative',
    lineHeight: 1.75,
    marginLeft: 32,
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

    switch (currentPath) {
      case '/home': return 0;
      case '/team': return 1;
      case '/projects': return 2;
      case '/ideas': return 3;
      case '/events': return 4;
      case '/misc': return 5;
      case '/contact': return 6;
      default: return 0;
    }
  }

  render() {
    const { classes, noTabs, location } = this.props;
    const { menuDrawer, value } = this.state;
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="baseline">
            <Grid item xs={12} container alignItems="baseline" className={classes.flex}>
              <ButtonBase onClick={this.handleLogoClick} className={classes.clubLogo}>
                <div className={classes.inline}>
                  {/* <Link to="/" className={classes.link}> */}
                  <div className={classes.imageContainer}>
                    <div className={classes.logoImage}>
                      <img height={40} src={logo} alt="Logo" />
                    </div>
                  </div>
                  {/* <span className={classes.tagline}>DevClub</span> */}
                  {/* </Link> */}
                </div>
              </ButtonBase>
              {!noTabs && (
                <React.Fragment>
                  <Typography className={classes.productLogo}>
                    IIT Delhi
                  </Typography>
                  <div className={classes.iconContainer}>
                    <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer anchor="right" open={menuDrawer} onOpen={this.mobileMenuOpen} onClose={this.mobileMenuClose}>
                      <AppBar title="Menu" />
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
                    </SwipeableDrawer>
                    <Tabs
                      value={this.current() || value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      {Menu.map(item => (
                        <Tab
                          key={item.label}
                          component={Link}
                          to={{ pathname: item.pathname, search: location.search }}
                          classes={{ root: classes.tabItem }}
                          label={<span className={classes.tabLabel}>{item.label}</span>}
                        />
                      ))}
                    </Tabs>
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
