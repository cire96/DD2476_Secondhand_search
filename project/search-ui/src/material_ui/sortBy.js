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
    props.onSort(event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Sort By </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={price}
          onChange={handleChange}
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Relevance</MenuItem>
          <MenuItem value={1}>Highest Price</MenuItem>
          <MenuItem value={2}>Lowest Price</MenuItem>
          
        </Select>
        <FormHelperText>kanske lägg till något här</FormHelperText>
      </FormControl>
    </div>
  );
}
