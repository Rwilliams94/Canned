import React, { Component } from 'react'
import axios from 'axios';
import SearchBar from '../Components/SearchBar'
import '../Styles/NewBeer.css'
// import apiHandler from '../API/apiHandler'

export class NewBeer extends Component {

    state = {
        showSearch: false,
        showForm: false,  
        selectedBeer: null,      
    }



    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value})
    }

    handleFormClick = () => {
        this.setState({showForm: !this.state.showForm})
    
    }

    handleSearchClick = () => {
        this.setState({showSearch: !this.state.showSearch})
        if (this.state.showForm) this.setState({showForm: false})
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        const newBeer = {
            name: this.state.name,
            description: this.state.description,
            abv: Number(this.state.abv),
            imageURL: this.state.imageURL,
        
        }
        
        axios.post('http://localhost:4050/api/beers', newBeer)
        .then((response) => {
            this.setState({
                name: "Barnard Castle",
                description: "Helps you see",
                abv: 6,
                imageURL: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/27/17/brewdog-dc.png?width=990&auto=webp&quality=75",
            })

            this.props.history.push("/beers/list")
        })
        .catch(err => {
            console.log(err);
        })

        console.log(newBeer)

    }

    handleBeerSelect = (beer) => {
 
        this.setState({
            selectedBeer: beer
        })
    }



    render() {

        return (
            <div className="newbeer__main">
                <div className="newbeer__link flex-center">
                <h1 className="" onClick={this.handleSearchClick}> {!this.state.showSearch ? "+" : "-" } Add Beer</h1>
                </div>
            
                <div>
                    {this.state.showSearch &&  (
                    <div className="newbeer__search flex-center">

                        <SearchBar onSelect={this.handleBeerSelect}/>
                        <h4 onClick={this.handleFormClick}>{!this.state.showForm ? "+" : "-" } can't find it? Let's add it to the Canniverse</h4>

                    </div>
                    )}
                </div>
            {this.state.showForm &&  (

            <form className="form newbeer__activeform" onSubmit={this.handleOnSubmit}>
                <label className="form__label" htmlFor="name">Name</label>
                <input className="form__input" onChange={this.handleChange} value={this.state.name} type="text" name="name" id="name"/>

                <label className="form__label" htmlFor="description">Description</label>
                <input className="form__input" onChange={this.handleChange}  value={this.state.description} type="text" name="description" id="description"/>

      
                <label className="form__label" htmlFor="abv">ABV</label>
                <input className="form__input" onChange={this.handleChange}  value={this.state.abv} type="number" name="abv" id="abv"/>

                <label className="form__label" htmlFor="imageURL">Image URL</label>
                <input className="form__input" onChange={this.handleChange}  value={this.state.imageURL} type="text" name="imageURL" id="imageURL"/>

                <button className="form__button">ADD NEW</button>
            </form>
        
            )}
                
            </div>
        )
    }
}

export default NewBeer
