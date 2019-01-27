import React, { Component } from 'react';
import HomePage1 from '../components/HomePages/HomePage1';
import HomePage2 from '../components/HomePages/HomePage2';
import HomePage3 from '../components/HomePages/HomePage3';
import HomePage4 from '../components/HomePages/HomePage4';
import HomePage5 from '../components/HomePages/HomePage5';

//assigns the correct Home component to show (defaults to the first)
class Home extends Component {

  state = {
    pageNum: 1,
    isWide: true
  }

  //use these listeners to adjust some styling based on the width of the viewing device
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate = () => {
    this.setState({ isWide: window.innerWidth > 500 });
  }

  increasePageNum = () => {
    this.setState({pageNum: this.state.pageNum+1});
  }

  decreasePageNum = () => {
    this.setState({pageNum: this.state.pageNum-1})
  }

  render () {
    switch (this.state.pageNum) {
      case 1:
      return (<div className={this.state.isWide ? "home-component smaller-button-width" : "home-component"}><HomePage1 increasePageNum={this.increasePageNum} /></div>)
      case 2: 
      return (<div className={this.state.isWide ? "home-component smaller-button-width" : "home-component"}><HomePage2 increasePageNum={this.increasePageNum} decreasePageNum={this.decreasePageNum}/></div>)
      case 3: 
      return (<div className={this.state.isWide ? "home-component smaller-button-width" : "home-component"}><HomePage3 increasePageNum={this.increasePageNum} decreasePageNum={this.decreasePageNum}/></div>)
      case 4: 
      return (<div className={this.state.isWide ? "home-component smaller-button-width" : "home-component"}><HomePage4 increasePageNum={this.increasePageNum} decreasePageNum={this.decreasePageNum}/></div>)
      case 5:
      return (<div className={this.state.isWide ? "home-component smaller-button-width" : "home-component"}><HomePage5 decreasePageNum={this.decreasePageNum}/></div>)
      default:
      return (<div className={this.state.isWide ? "home-component smaller-button-width" : "home-component"}><HomePage1 increasePageNum={this.increasePageNum}/></div>)
    }
  }
}

export default Home;