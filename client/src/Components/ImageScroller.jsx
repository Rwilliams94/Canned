import React, { Component } from 'react'
import '../Styles/ImageScroller.css'
import apiHandler from '../API/apiHandler'

export class ImageScroller extends Component {

    images = this.props.imagesList

    state = {
        photos: this.images,
        number: 0,
        photo: 0,
        showPhoto: false,
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

    handleShowPhoto = (photo) => {
      this.setState({
        showPhoto: !this.state.showPhoto,
        photoClicked: photo,
      })
    }

    handleShowPhoto = (photo) => {
      this.setState({
        showPhoto: !this.state.showPhoto,
        photoClicked: photo,
      })
    }

    handleDeleteImage = (photoId) => {
      apiHandler
      .deleteimage(photoId)
      .then(response => {
        console.log("success", response);
        this.props.history.push("/profile")
      })
      .catch(err => {console.log(err)})
      
    }

    render() {

        const array = this.state.photos
        const num = this.state.photo


        if(this.state.images) {
            return <div>loading images...</div>
        }

        return (
          <div className="flex-center">
            {this.state.showPhoto && (
            <div className="flex-center image__large-box">
              <h2 className="thin">{this.state.photoClicked.beername}</h2>
              <img className="image__large-image" src={this.state.photoClicked.image} alt=""/>
              <h5 onClick={this.handleShowPhoto}>back</h5>
              <p className="settings" onClick={this.handleDeleteImage}>delete this image?</p>
            </div>
            )}
            {this.state.photos.length === 0 ? (<div><h4>no photos to display</h4></div>) :
            (<div className="image__gallery-box ">
              <p onClick={this.handlePreviousPhoto}>{`<`}</p>
              <div className="image__gallery-grid">
                <div className="flex-center image__image-box" onClick={() => {this.handleShowPhoto(array[num])}}>
                    <img className="image__gallery-photo" src={array[num].image} alt={num}/>
                </div>
                <div className="flex-center image__image-box" onClick={() => {this.handleShowPhoto(array[num+1])}}>
                   {this.state.photos.length > 1 ? <img className="image__gallery-photo" src={array[num+1].image} alt={num+1}/> : ""}
                </div>
                <div className="flex-center image__image-box" onClick={() => {this.handleShowPhoto(array[num+2])}}>
                {this.state.photos.length > 2 ? <img className="image__gallery-photo" src={array[num+2].image} alt={num+2}/> : ""}
                </div>
              </div>
              <p onClick={this.handleNextPhoto}>{'>'}</p>
            </div>)}
          </div>
        );
    }
}

export default ImageScroller
