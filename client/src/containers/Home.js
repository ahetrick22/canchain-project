import React, { Component } from 'react';
import HomePage1 from '../components/HomePages/HomePage1';
import HomePage2 from '../components/HomePages/HomePage2';
import HomePage4 from '../components/HomePages/HomePage4';
import HomePage5 from '../components/HomePages/HomePage5';
import HomePage6 from '../components/HomePages/HomePage6';


 class Home extends Component {

  state = {
    pageNum: 1
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
      return (<div className="home-component"><HomePage1 increasePageNum={this.increasePageNum} /></div>)
      case 2: 
      return (<div className="home-component"><HomePage2 increasePageNum={this.increasePageNum} decreasePageNum={this.decreasePageNum}/></div>)
      case 3: 
      return (<div className="home-component"><HomePage4 increasePageNum={this.increasePageNum} decreasePageNum={this.decreasePageNum}/></div>)
      case 4: 
      return (<div className="home-component"><HomePage5 increasePageNum={this.increasePageNum} decreasePageNum={this.decreasePageNum}/></div>)
      case 5:
      return (<div className="home-component"><HomePage6 decreasePageNum={this.decreasePageNum}/></div>)
      default:
      return (<div className="home-component"><HomePage1 increasePageNum={this.increasePageNum}/></div>)
    }
  }
}

export default Home;