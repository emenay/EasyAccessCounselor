import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function Search_autocomplete() {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
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
        return option.title;
      }}
      renderOption={(props, option) => <li style={{color:"gray"}} {...props}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} style={{position: "relative", left:"25%", width: "50%"}} label="" />
      )}
    />
  );
}

const university = [
  { title: 'University of North Carolina at Chapel hill'},
  { title: 'Duke University'},
  { title: 'University of Texas at Austin'},
  {
    title: "Alabama A & M University"
  },
  {
    title: "University of Alabama at Birmingham"
  },
  {
    title: "Amridge University"
  },
  {
    title: "University of Alabama in Huntsville"
  },
  {
    title: "Alabama State University"
  },
  {
    title: "University of Alabama System Office"
  },
  {
    title: "The University of Alabama"
  },
  {
    title: "Central Alabama Community College"
  },
  {
    title: "Athens State University"
  },
  {
    title: "Auburn University at Montgomery"
  },
  {
    title: "Auburn University"
  },
  {
    title: "Birmingham Southern College"
  },
  {
    title: "Chattahoochee Valley Community College"
  },
  {
    title: "Concordia College Alabama"
  },
  {
    title: "South University-Montgomery"
  },
  {
    title: "Enterprise State Community College"
  },
  {
    title: "James H Faulkner State Community College"
  },
  {
    title: "Faulkner University"
  },
  {
    title: "Gadsden State Community College"
  },
  {
    title: "New Beginning College of Cosmetology"
  },
  {
    title: "George C Wallace State Community College-Dothan"
  },
  {
    title: "George C Wallace State Community College-Hanceville"
  },
  {
    title: "George C Wallace State Community College-Selma"
  },
  {
    title: "Herzing University-Birmingham"
  },
  {
    title: "Huntingdon College"
  },
  {
    title: "Heritage Christian University"
  },
  {
    title: "J F Drake State Community and Technical College"
  },
  {
    title: "J F Ingram State Technical College"
  },
  {
    title: "Jacksonville State University"
  },
  {
    title: "Jefferson Davis Community College"
  },
  {
    title: "Jefferson State Community College"
  },
  {
    title: "John C Calhoun State Community College"
  },
  {
    title: "Judson College"
  },
];