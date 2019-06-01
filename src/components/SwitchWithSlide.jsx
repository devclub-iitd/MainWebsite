// Source reference: https://codesandbox.io/s/y2vq3x874j?from-embed

import React from "react";
import { Switch, Route } from "react-router-dom";
import Slider from "./Slider";
import Menu from './Menu';

class SlideOut extends React.Component {
  constructor(props) {
    console.log("SlideOut Constructor");
    super(props);

    this.state = {
      childPosition: Slider.CENTER,
      curChild: props.children,
      curUniqId: props.uniqId,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    };
  }

  getMenuIndex(pathname) {
    let index = Menu.map(function(obj) { return obj['pathname']; })
                    .indexOf(pathname);
    console.log(index);
    return index;
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUniqId = this.getMenuIndex(prevProps.uniqKey);
    const uniqId = this.getMenuIndex(this.props.uniqKey);
    console.log(prevUniqId, uniqId);

    if (prevUniqId > uniqId) {
      console.log("To Right");
      this.setState({
        childPosition: Slider.TO_RIGHT,
        curChild: this.props.children,
        curUniqId: uniqId,
        prevChild: prevProps.children,
        prevUniqId,
        animationCallback: this.getFromLeft
      });
    } else if (prevUniqId < uniqId) {
      console.log("To Left");
      this.setState({
        childPosition: Slider.TO_LEFT,
        curChild: this.props.children,
        curUniqId: uniqId,
        prevChild: prevProps.children,
        prevUniqId,
        animationCallback: this.getFromRight
      });
    }
  }

  // Function to get the next component from Right side of the screen
  getFromRight = () => {
    console.log("Get from Right callback");
    this.setState({
      childPosition: Slider.FROM_RIGHT,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    });
  };

  // Function to get the next component from Left side of the screen
  getFromLeft = () => {
    console.log("Get from Left callback");
    this.setState({
      childPosition: Slider.FROM_LEFT,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    });
  };

  render() {
    console.log("Rendering Slide Out");
    return (
      <Slider
        position={this.state.childPosition}
        animationCallback={this.state.animationCallback}
      >
        {this.state.prevChild || this.state.curChild}
      </Slider>
    );
  }
}

const SwitchWithSlide = ({
  updateStep,
  children
}) => (
    <Route
      render={({ location }) => (
        <SlideOut 
          uniqKey={location.pathname}
          updateStep={updateStep}>
          <Switch location={location}>{children}</Switch>
        </SlideOut>
      )}
    />
  );

export default SwitchWithSlide;
