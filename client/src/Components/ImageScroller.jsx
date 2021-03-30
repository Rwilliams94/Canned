import React, { Component } from 'react'
import '../Styles/ImageScroller.css'

export class ImageScroller extends Component {

    images = this.props.imagesList

    state = {
        photos: this.images,
        number: 0,
        photo: 0,
    }

    handleNextPhoto = () => {
        const max = this.state.photos.length
        this.setState({number: this.state.number +1})
        const num = Math.abs(this.state.number)%max
        this.setState({photo: num})
        console.log(this.state.photo, this.state.number);

    }

    handlePreviousPhoto = () => {
        const max = this.state.photos.length
        this.setState({number: this.state.number -1})
        const num = Math.abs(this.state.number)%max
        this.setState({photo: num})
        console.log(this.state.photo, this.state.number);
    }

    render() {

        console.log(this.images);

        if(this.state.images) {
            return <div>loading images...</div>
        }

        return (
          <div>
            <div className="image__gallery-box ">
              <p onClick={this.handlePreviousPhoto}>P</p>
              <div className="image__gallery-grid">
                <div className="flex-center image__image-box">
                    <img className="image__gallery-photo" src={this.state.photos[this.state.photo].image} alt={this.state.photo}/>
                </div>
                <div className="flex-center image__image-box">
                   {this.state.photos.length > 1 ? <img className="image__gallery-photo" src={this.state.photos[this.state.photo+1].image} alt={this.state.photo+1}/> : ""}
                </div>
                <div className="flex-center image__image-box">
                {this.state.photos.length > 2 ? <img className="image__gallery-photo" src={this.state.photos[this.state.photo+2].image} alt={this.state.photo+2}/> : ""}
                </div>
              </div>
              <p onClick={this.handleNextPhoto}>N</p>
            </div>
          </div>
        );
    }
}

export default ImageScroller
