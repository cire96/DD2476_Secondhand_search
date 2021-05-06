import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MultilineTextField(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="filled-textarea"
          label='Free text: "audi 4wd gas"'
          placeholder="Search for everything you want :D"
          multiline
          variant="filled"
          onChange = {props.handleChange}
        />
      </div>
    </form>
  );
}