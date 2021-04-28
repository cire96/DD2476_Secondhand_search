import React, { Component } from "react";
import { render } from "react-dom";
import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults'
import * as queries from './queries'

const { Client } = require('elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
//var elasticsearch=require('elasticsearch');
//var client = new elasticsearch.Client( {node:'http://localhost:9200/'});


// const result = client.search({
//   index: 'test1',
//   title: "1993 Lincoln town car limo"
// })

// result.then(res => console.log(res))


client.search(queries.q5()).then(res => console.log("TEST", res.hits.total, res.hits.hits, res))

client.search({
      index: 'test1',
      body: {
        query: {
          
            term: { title: "1993" }
          
      }
      }}).then(res => console.log(res))



class App extends Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };
  }
  handleChange(event) {
    const search_query = event.target.value;
    client.search(queries.q5(search_query)).then(res => console.log("TEST", res.hits.total, res.hits.hits, res))


  }
    render() {
      return (
        <div className="container">
          <input type="text" onChange={this.handleChange} />
          <SearchResults results={this.state.results} />
        </div>
      );
    }
  
}

export default App;
