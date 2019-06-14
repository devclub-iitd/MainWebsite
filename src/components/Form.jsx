import React from 'react';
import Iframe from 'react-iframe';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      height: '0px',
    };
  }

  showForm = () => {
    this.setState({
      isLoading: false,
      height: '850px',
    });
  };

  render() {
    const { isLoading, height } = this.state;
    return (
      <React.Fragment>
        {isLoading ? (
          <Typography>
            Loading
          </Typography>
        ) : (
          null
        )
        }
        <Box>
          <Iframe
            onLoad={this.showForm}
            frameBorder="0"
            url="http://bit.ly/2U0uIOe"
            width="100%"
            height={height}
          />
        </Box>
      </React.Fragment>
    );
  }
}

export default Form;
