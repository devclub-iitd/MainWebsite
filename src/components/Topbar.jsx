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
import Menu from './Menu';

const logo = require('../logo.svg');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',
  },
  inline: {
    display: 'inline',
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey.A100}`,
    marginLeft: 32,
    paddingLeft: 24,
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

  logoClick = () => {
    this.setState({ value: 0 });
  };

  current = () => {
    const { location } = this.props;
    const currentPath = location.pathname;

    switch (currentPath) {
      case '/home': return 0;
      case '/contact': return 1;
      case '/events': return 2;
      case '/team': return 3;
      case '/projects': return 4;
      case '/ideas': return 5;
      case '/misc': return 6;
      default: return 0;
    }
  }

  render() {
    const { classes, noTabs, location } = this.props;
    const { menuDrawer, value } = this.state;
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={24} alignItems="baseline">
            <Grid item xs={12} container alignItems="baseline" className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className={classes.link}>
                    <img onClick={this.logoClick} width={20} src={logo} alt="Logo" />
                    <span onClick={this.logoClick} className={classes.tagline}>DevClub</span>
                  </Link>
                </Typography>
              </div>
              {!noTabs && (
                <React.Fragment>
                  <div className={classes.productLogo}>
                    <Typography>
                      IIT Delhi
                    </Typography>
                  </div>
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
