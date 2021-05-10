import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(product_name, a1, a2, a3, a4, a5, a6, wheels, wheels_price, total_price) {
  return { product_name, a1, a2, a3, a4, a5, a6, wheels, wheels_price, total_price};
}


function readData(results) {
  let data = []
  results.map(res => {
    data.push(createData(res._source.product_name, res._source.drive, res._source.transmission, res._source.price, res._source.fuel, res._source.condition, res._source.type, res._source.wheels, res._source.wheels_price, res._source.total_price))})
    // odometer, fuel, category, title, product_name, price, title, title_status, transmission 
  return data


}


export default function BasicTable(props) {
  const classes = useStyles();
  let shouldSort = props.sort; // -1 none, 0 relevance, 1 price, can only receive 1

  // todo props so it shows 
  for (var i = 0 ; i < props.car_results.length ; i++ ) {
    props.car_results[i]._source['wheels'] = props.wheel_results[i].title
    props.car_results[i]._source['wheels_price'] = props.wheel_results[i].price
    props.car_results[i]._source['total_price'] = props.wheel_results[i].price + props.car_results[i]._source.price
  }

  //sort by highest
  if (shouldSort === 1) {
    props.car_results.sort((a, b) => (a._source.total_price > b._source.total_price) ? -1 : 1)
  }
  // sort by lowest
  else if (shouldSort === 2) {
    props.car_results.sort((a, b) => (a._source.total_price > b._source.total_price) ? 1 : -1)
  }

  //props.car_results.map(obj => {obj['wheel'] = props.wheel})
  let data = readData(props.car_results)
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RESULTS</TableCell>
            <TableCell align="right">DRIVE</TableCell>
            <TableCell align="right">TRANSMISSION</TableCell>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="right">FUEL</TableCell>
            <TableCell align="right">CONDITION</TableCell>
            <TableCell align="right">TYPE</TableCell>
            <TableCell align="right">WHEELS</TableCell>
            <TableCell align="right">WHEELS PRICE</TableCell>
            <TableCell align="right">TOTAL BUNDLE PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell align="right">{row.a1}</TableCell>
              <TableCell align="right">{row.a2}</TableCell>
              <TableCell align="right">{row.a3}</TableCell>
              <TableCell align="right">{row.a4}</TableCell>
              <TableCell align="right">{row.a5}</TableCell>
              <TableCell align="right">{row.a6}</TableCell>
              <TableCell align="right">{row.wheels}</TableCell>
              <TableCell align="right">{row.wheels_price}</TableCell>
              <TableCell align="right">{row.total_price}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
