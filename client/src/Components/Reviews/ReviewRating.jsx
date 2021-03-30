
import React, { Component } from 'react'
import '../../Styles/Rating.css'

export class ReviewRating extends Component {

    state = {
        rating: 0,
        starOne: "empty",
        starTwo: "empty",
        starThree: "empty",
        starFour: "empty",
        starFive: "empty",
    }

    
    handleOne = () => {
        this.setState({
            rating: 1,
            starOne: "",
            starTwo: "empty",
            starThree: "empty",
            starFour: "empty",
            starFive: "empty",
          
        })

        this.props.setRate(this.state.rating)
        console.log(this.state);
    }

    handleTwo = () => {
        this.setState({
            rating: 2,
            starOne: "",
            starTwo: "",
            starThree: "empty",
            starFour: "empty",
            starFive: "empty",
        })
        this.props.setRate(this.state.rating)
        console.log(this.state);
    }

    handleThree = () => {
        this.setState({
            rating: 3,
            starOne: "",
            starTwo: "",
            starThree: "",
            starFour: "empty",
            starFive: "empty",
   
        })
        this.props.setRate(this.state.rating)
        console.log(this.state);
    }

    handleFour = () => {
        this.setState({
            rating: 4,
            starOne: "",
            starTwo: "",
            starThree: "",
            starFour: "",
            starFive: "empty",
        })
        this.props.setRate(this.state.rating)
        console.log(this.state);
    }

    handleFive = () => {
        this.setState({
            rating: 5,
            starOne: "",
            starTwo: "",
            starThree: "",
            starFour: "",
            starFive: "",
        })
        this.props.setRate(this.state.rating)
        console.log(this.state);
    }

    render() {

        

        return (
            <div>
                <div className="review__star__box">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                    <span onClick={this.handleOne} className={`fa fa-star ${this.state.starOne}`} ></span>
                    <span onClick={this.handleTwo} className={`fa fa-star ${this.state.starTwo}`}></span>
                    <span onClick={this.handleThree} className={`fa fa-star ${this.state.starThree}`}></span>
                    <span onClick={this.handleFour} className={`fa fa-star ${this.state.starFour}`}></span>
                    <span onClick={this.handleFive} className={`fa fa-star ${this.state.starFive}`}></span>
            
                </div>
                        
            </div>
        )
    }
}

export default ReviewRating

