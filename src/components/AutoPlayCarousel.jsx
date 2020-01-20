import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import ItemsCarousel from 'react-items-carousel';
import { withStyles } from '@material-ui/core/styles';

const noOfItems = 12;
const noOfCards = 1;
const autoPlayDelay = 5000;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const styles = () => ({
  imageElement: {
    height: '98%',
    overflow: 'hidden',
  },
});

class AutoPlayCarousel extends Component {
  state = {
    activeItemIndex: this.props.startIndex,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (this.props.mediaList.length - noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    const { mediaList, classes } = this.props;
    const { activeItemIndex } = this.state;

    const carouselItems = range(mediaList.length).map(index => (
      <SlideItem key={index}>
        <img src={mediaList[index].fullurl} alt="Event" className={classes.imageElement} />
      </SlideItem>
    ));

    return (
      <Wrapper>
        <ItemsCarousel
          gutter={12}
          numberOfCards={noOfCards}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={'>'}
          leftChevron={'<'}
          chevronWidth={chevronWidth}
          outsideChevron
        >
          {carouselItems}
        </ItemsCarousel>
      </Wrapper>
    );
  }
}

AutoPlayCarousel.propTypes = {
  startIndex: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AutoPlayCarousel);
