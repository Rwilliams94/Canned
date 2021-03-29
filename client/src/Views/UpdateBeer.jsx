import React, { Component } from 'react'
import axios from 'axios';

export class UpdateBeer extends Component {

    beerID = this.props.match.params.id;

    state = {
        name: "",
        description: "",
        abv: 0,
        imageURL: "",

        rendered: false,
    }

    componentDidMount() {
        axios
          .get(`http://localhost:4050/api/beers/${this.beerID}`)
          .then((response) => {
            if (response.data.name === undefined) this.props.history.push("/*");
            console.log(response.data);
            this.setState({ 
                name: response.data.name,
                description: response.data.description,
                abv: response.data.abv,
                imageURL: response.data.imageURL,
                rendered: !this.rendered});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value})
    }


    handleOnSubmit = (event) => {
        event.preventDefault();
        const newBeer = {
            name: this.state.name,
            description: this.state.description,
            abv: Number(this.state.abv),
            imageURL: this.state.imageURL,
        
        }
        
        axios.patch(`http://localhost:4050/api/beers/${this.beerID}`, newBeer)
        .then((response) => {
            this.setState({
                name: "",
                description: "",
                abv: 0,
                imageURL: "",
            })

            this.props.history.push("/beers/list")
        })
        .catch(err => {
            console.log(err);
        })

        console.log(newBeer)

    }




    render() {

        if (this.state.rendered === false) {
            return <div>One sec, just heading to the bar...</div>;
          }

        return (
            
            <div>
      
            <form className="form" onSubmit={this.handleOnSubmit}>
                <label className="form__label" htmlFor="name">Name</label>
                <input className="form__input" onChange={this.handleChange} value={this.state.name} type="text" name="name" id="name"/>

                <label className="form__label" htmlFor="description">Description</label>
                <input className="form__input" onChange={this.handleChange}  value={this.state.description} type="text" name="description" id="description"/>

      
                <label className="form__label" htmlFor="abv">ABV</label>
                <input className="form__input" onChange={this.handleChange}  value={this.state.abv} type="number" name="abv" id="abv"/>

                <label className="form__label" htmlFor="imageURL">Image URL</label>
                <input className="form__input" onChange={this.handleChange}  value={this.state.imageURL} type="text" name="imageURL" id="imageURL"/>

                <button className="form__button">UPDATE</button>
            </form>
                
            </div>
        )
    }
}

export default UpdateBeer
