import React, { Component } from "react";
import { render } from "react-dom";
import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults'
import * as queries from './queries'
import Searchfield from './material_ui/searchtextfield'
import Button from './material_ui/button'
import PriceRangeSlider from './material_ui/slider'
import PriceSelectFrom from './material_ui/priceChooser1'
import PriceSelectTo from './material_ui/priceChooser2'

const { Client } = require('elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
//var elasticsearch=require('elasticsearch');
//var client = new elasticsearch.Client( {node:'http://localhost:9200/'});



//client.search(queries.q1()).then(res => console.log("q1", res.hits.total, res.hits.hits, res))

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      hasSearched: false, 
      noFound: false, 
      results: ""
    };
    this.noFound = false
    this.priceFrom = null 
    this.priceFrom = null 

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.query = this.query.bind(this)
    this.handlePriceFrom = this.handlePriceFrom.bind(this)
    this.handlePriceTo = this.handlePriceTo.bind(this)
    
  }
  handleChange(event) {
    this.text = event.target.value;
  }

  //receives res from query and then sets the state with the results
  query(tq){
  console.log(tq)
  // this.priceFrom, this.priceTo

  client.search(
      queries.car(tq)
    ).then(res => {
      if (res.hits.hits.length == 0) {
        console.log("nofound!")
        this.setState({
          noFound: true
        })
      }
      else {
        console.log("test")
        // query for each car
        // results.hits.hits.map(car => {
        //   client.search(...)
        // })
        let wheels_res = []
        res.hits.hits.map(car =>client.search(
            queries.wheels(car._source.title,car._source.location)
          ).then(res => {console.log(res.hits.hits[0])
            wheels_res.push(res.hits.hits[0])
          
            
          
          }
          
          
          )
        )
        //console.log(wheels_res._source.title)

        /*
        client.search(
          queries.wheels(res.hits.hits[0]._source.title,res.hits.hits[0]._source.location)
        ).then(res_wheels=>{
          console.log(res_wheels)
        })*/
        
        this.setState({
        noFound: false,
        hasSearched: true,
        results: res.hits.hits,
        wheels_results: wheels_res
       })
        
      }
      
      console.log(res)})
  }

  handleClick() {
    this.query(this.text) 
  }

  handlePriceFrom(value){
    this.priceFrom = value
    console.log(value)
  }

  handlePriceTo(value){
    this.priceTo = value
  }

    render() {
      return (
        <div className="container">
          <Searchfield handleChange = {this.handleChange} ></Searchfield>
          <PriceSelectFrom onSelect = {this.handlePriceFrom}></PriceSelectFrom>
          <PriceSelectTo onSelect = {this.handlePriceTo}></PriceSelectTo>
          <Button handleClick = {this.handleClick} > </Button>
          
          {this.state.hasSearched ? (this.state.noFound ? <div style = {{backgroundColor: "white", textAlign: "center"}}> <h2 style = {{fontFamily: "Arial"}}> No Cars Found </h2> </div> : <SearchResults results={this.state.results}/>) : null}
        </div>
      );
    }
}

export default App;
