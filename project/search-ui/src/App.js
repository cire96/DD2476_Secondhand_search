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
import GridResults from './components/gridResults'
import SortFilter from './material_ui/sortBy'

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
      results: "", 
      sort: -1,
      text: "",
      priceFrom: "", 
      priceTo: "", 
    };
    this.noFound = false
    this.priceFrom = "" 
    this.priceTo = ""

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.query = this.query.bind(this)
    this.handlePriceFrom = this.handlePriceFrom.bind(this)
    this.handlePriceTo = this.handlePriceTo.bind(this)
    this.sort = this.sort.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.queryPriceFilter = this.queryPriceFilter.bind(this)
  }
  handleChange(event) {
    this.text = event.target.value;
  }

  //receives res from query and then sets the state with the results
  queryPriceFilter(){
    // this.priceFrom, this.priceTo
    let wheels_res = []
    client.search(
        queries.car_price(this.text, this.priceFrom, this.priceTo)
      ).then(res => {
        if (res.hits.hits.length === 0) {
          console.log("nofound!")
          this.setState({
            noFound: true
          })
        }
        else {
          // query for each car
          // results.hits.hits.map(car => {
          //   client.search(...)
          // })
          res.hits.hits.map(car =>client.search(
              queries.wheels(car._source.product_name,car._source.location)
            ).then(res => {
              wheels_res.push(res.hits.hits[0]._source)
            })
          )
          setTimeout(() => { 
            console.log("wheels res: ", wheels_res)
            this.setState({
              noFound: false,
              hasSearched: true,
              results: res.hits.hits,
              wheel_results: wheels_res, 
              text: this.text, 
              sort: 0, 
              priceFrom: this.priceFrom,
              priceTo: this.priceTo,

              })}, 200);
        }
        })
    }

  query(tq){
  console.log(tq)
  // this.priceFrom, this.priceTo
  let wheels_res = []
  client.search(
      queries.car(tq)
    ).then(res => {
      if (res.hits.hits.length === 0) {
        console.log("nofound!")
        this.setState({
          noFound: true
        })
      }
      else {
        // query for each car
        // results.hits.hits.map(car => {
        //   client.search(...)
        // })
        res.hits.hits.map(car =>client.search(
            queries.wheels(car._source.product_name,car._source.location)
          ).then(res => {
            wheels_res.push(res.hits.hits[0]._source)
          })
        )
        setTimeout(() => { 
          console.log("wheels res: ", wheels_res)
          this.setState({
            noFound: false,
            hasSearched: true,
            results: res.hits.hits,
            wheel_results: wheels_res, 
            text: tq, 
            sort: 0
            })}, 200);
      }
      })
  }

  // TODO 
  sort(value) {
    if(value === 0 && this.state.priceFrom === "" && this.state.priceTo === "") {
      this.query(this.state.text)
    }

    else if (value === 1 || value === 2) {
      this.setState({sort: value})
    }

    else {
      this.queryPriceFilter(this.state.text, this.state.priceFrom, this.state.priceTo)
    }
    
  }

  handleClick() {
    if (this.priceFrom !== "" && this.priceTo !== "") {
      
      console.log("PRICE FILTER")
      console.log(this.priceFrom, this.priceTo)
      this.queryPriceFilter()
    }
    else {
      console.log("NORMAL QUERY")
      this.query(this.text)   
    }
    
  }

  handlePriceFrom(value){
    if (value == "") {
      console.log("OK")
    }
    this.priceFrom = value
    console.log(value)
  }

  handlePriceTo(value){
    this.priceTo = value
  }

  // TODO
  handleSort(value) {
    this.sort(value)
  }

    render() {
      return (
         <div style = {{height:"100%", display:"flex", flexDirection:"column"}}>
          <Searchfield handleChange = {this.handleChange} ></Searchfield>
          <PriceSelectFrom onSelect = {this.handlePriceFrom}></PriceSelectFrom>
          <PriceSelectTo onSelect = {this.handlePriceTo}></PriceSelectTo>
          <Button handleClick = {this.handleClick} > </Button>
          <SortFilter onSort = {this.handleSort}></SortFilter>
          {this.state.hasSearched ? (this.state.noFound ? <div style = {{backgroundColor: "white", textAlign: "center"}}> <h2 style = {{fontFamily: "Arial"}}> No Cars Found </h2> </div> : 
          <SearchResults car_results={this.state.results} wheel_results = {this.state.wheel_results} sort = {this.state.sort}/>) : null}
        </div>
      );
    }
}

export default App;
