import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const filter = createFilterOptions();

export default function Search_autocomplete({addToGrid, sync}) {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      selectOnFocus
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={university}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.college_name;
      }}
      renderOption={(props, option) => <li style={{color:"gray"}} {...props}>{option.college_name}</li>}
      freeSolo
      renderInput={(params) => (
        <div>
          <TextField {...params} style={{position: "relative", left:"25%", width: "50%"}} label="" />
          <Button variant="outlined" color="success" style={{position:"absolute", right:"150px"}} onClick={()=>{
            addToGrid(value)}}>search</Button>
            <Button variant="outlined" style={{position:"absolute", right:"62px"}} onClick={sync}>add</Button>
          <br/>
          <br/>
        </div>
      )}
    />
  );
}

const university = [
  {college_name: "University of North Carolina at Chapel hill", state: "NC", type: "public", percent: 100, to_add: true},
  {college_name: "Stanford University", state: "CA", type: "private", percent: 60, to_add: true},
  {college_name: "University of California, Los Angeles", state: "CA", type: "public", percent: 70, to_add: true},
  {college_name: "Harvard University", state: "MA", type: "private", percent: 83, to_add: true},
  {college_name: "Cornell University", state: "NY", type: "private", percent: 66, to_add: true},
  {college_name: "Duke University", state: "NC", type: "private", percent: 92, to_add: true},
  {college_name: "NC State University", state: "NC", type: "public", percent: 54, to_add: true},
  {college_name: "University of California, Berkeley", state: "CA", type: "public", percent: 47, to_add: true},
];