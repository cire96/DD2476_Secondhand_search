import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [price, setPrice] = React.useState('');

  const handleChange = (event) => {
    setPrice(event.target.value);
    props.onSelect(event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Select price to </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={price}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10 $</MenuItem>
          <MenuItem value={100}>100 $</MenuItem>
          <MenuItem value={1000}>1000 $</MenuItem>
          <MenuItem value={10000}>10000 $</MenuItem>
          <MenuItem value={20000}>20000 $</MenuItem>
          <MenuItem value={30000}>30000 $</MenuItem>
          <MenuItem value={40000}>40000 $</MenuItem>
          <MenuItem value={50000}>50000 $</MenuItem>
          <MenuItem value={60000}>60000 $</MenuItem>
          <MenuItem value={70000}>70000 $</MenuItem>
          <MenuItem value={80000}>80000 $</MenuItem>
          <MenuItem value={90000}>90000 $</MenuItem>
          <MenuItem value={100000}>100000 $</MenuItem>
          <MenuItem value={200000}>200000 $</MenuItem>
          <MenuItem value={1000000}>1000000 $</MenuItem>
        </Select>
        <FormHelperText>kanske lägg till något här</FormHelperText>
      </FormControl>
    </div>
  );
}
