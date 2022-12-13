import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  styled,
  Typography,
  withStyles,
} from '@material-ui/core';
import MediaQuery from 'react-responsive';
import PartnersAnim from '../components/PartnersAnim';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  fontSize: '20px',
  // padding: theme.spacing(1),
}));

/* eslint-disable */
const styles = (theme) => ({
  card: {
    margin: theme.spacing(2),
    // marginBottom: theme.spacing(6),
    borderRadius: 50,
  },
  grid: {
    // height: '100vh',
    // marginTop: theme.spacing(16),
  },
  middleGrid: {
    // height: '100vh',
    // paddingTop: theme.spacing(16),
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 0,
    paddingTop: theme.spacing(15),
    fontWeight: '700',
    // color:'white', 
  },
  line: {
    width: '80px',
    height: '10px',
    borderRadius: '4px',
    margin: '0px auto 30px auto',
    // marginBottom: '25px',
  },
});

/* eslint-disable */
class Partners extends React.Component {
  constructor(props) {
    super(props);
    const { color, varia } = this.props;
    console.log('LOL', varia, color);
    this.state = { color: 'red', isLoading: false };
    this.anothervar = 10;
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <PartnersAnim/>

        <Grid container className={classes.grid}>
          <Grid container item md={1} />

          <Grid
            // container
            // direction="column"
            // justifyContent="center"
            xs={12}
            md={10}
            // className={classes.middleGrid}
          >
            <Grid>
              <Typography
                gutterBottom
                variant="h4"
                className={classes.centerText}
              >
                <span>Our Partners</span>
              </Typography>
              <div className={classes.line} style={{ background: 'black' }} />
            </Grid>
            <Grid
              container
              direction="column"
              // justifyContent="center"
              alignItems="center"
              xs={12}
              md={12}
              className={classes.middleGrid}
            >
              <Card
                container
                direction="row"
                // xs={12}
                // md={12}
                sx={{ display: 'flex', margin: 'auto' }}
                className={classes.card}
              >
                <Grid container direction="row" justifyContent="center">
                  <MediaQuery minDeviceWidth="961px">
                    <Grid
                      container
                      alignContent="center"
                      item
                      xs={8}
                      md={5}
                      style={{
                        padding: '0px 30px',
                        background: 'skyblue',
                        borderStartEndRadius: '1000px',
                        borderEndEndRadius: '1000px',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: '200px' }}
                        image="https://www.1stop.ai/images/1Stop_logo_New_Png.png"
                        alt=""
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      md={7}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '15px 25px',
                      }}
                    >
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h3">
                          About Partner
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          component="div"
                        >
                          1stop is a strong platform with immense potential for
                          students from anywhere and anytime to access
                          cutting-edge Mentorship and Certification Program
                          widespread with a larger number of domains and niches
                          to explore learning.
                        </Typography>
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          component="div"
                          style={{paddingTop:'5px'}}
                        >
                          <Div>
                            Visit <a href="https://www.1stop.ai/" target='_blank' style={{textDecoration:'none', color:'darkblue'}}>Website!</a>
                          </Div>
                        </Typography>
                      </CardContent>
                    </Grid>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth="960px">
                    <Grid
                      container
                      alignContent="center"
                      item
                      xs={12}
                      md={4}
                      style={{
                        padding: '0px 150px',
                        background: 'skyblue',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: '50px' }}
                        image="https://www.1stop.ai/images/1Stop_logo_New_Png.png"
                        alt=""
                      />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      md={8}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <CardContent
                        sx={{ flex: '1 0 auto', textAlign: 'center' }}
                      >
                        <Typography component="div" variant="h4">
                          About 1stop
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          1stop is a strong platform with immense potential for
                          students from anywhere and anytime to access
                          cutting-edge Mentorship and Certification Program
                          widespread with a larger number of domains and niches
                          to explore learning.
                        </Typography>
                        <Typography
                          variant="h4"
                          color="text.secondary"
                          component="div"
                        >
                          Visit 1stop.ai
                        </Typography>
                      </CardContent>
                    </Grid>
                  </MediaQuery>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Grid container item md={1} />
        </Grid>
      </React.Fragment>
    );
  }
}

Partners.propTypes = {
  color: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

Partners.defaultProps = {
  isLoading: false,
  varia: 0,
  color: 'black',
};

export default withStyles(styles)(Partners);
