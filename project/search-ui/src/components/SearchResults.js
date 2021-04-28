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

function createData(product_name, a1, a2, a3, a4) {
  return { product_name, a1, a2, a3, a4 };
}


function readData(results) {
  let data = []
  results.map(res => {data.push(createData(res._source.product_name, res._source.fuel,res._source.transmission,res._source.price))})
  // odometer, fuel, category, title, product_name, price, title, title_status, transmission 
  return data


}

export default function BasicTable(props) {
  const classes = useStyles();
  // todo props so it shows 
  let data = readData(props.results)
  console.log(props.results)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Showing search results</TableCell>
            <TableCell align="right">fuel</TableCell>
            <TableCell align="right">transmission</TableCell>
            <TableCell align="right">price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.product_name}>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell align="right">{row.a1}</TableCell>
              <TableCell align="right">{row.a2}</TableCell>
              <TableCell align="right">{row.a3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
