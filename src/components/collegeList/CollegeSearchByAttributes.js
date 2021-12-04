import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
// import { Card } from 'reactstrap'
// import { CardContent } from '@mui/material'
// import Search_college from './Search_college'
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

const schoolTypes = [
  {
    value: 'Public',
    label: 'Public',
  },
  {
    value: 'Private',
    label: 'Private',
  },
]

const years = [
  {
    value: '2yr',
    label: '2yr',
  },
  {
    value: '4yr',
    label: '4yr',
  },
]

const states = [
  {
    name: 'Alabama',
    code: 'AL',
  },
  {
    name: 'Alaska',
    code: 'AK',
  },
  {
    name: 'Arizona',
    code: 'AZ',
  },
  {
    name: 'Arkansas',
    code: 'AR',
  },
  {
    name: 'California',
    code: 'CA',
  },
  {
    name: 'Colorado',
    code: 'CO',
  },
  {
    name: 'Connecticut',
    code: 'CT',
  },
  {
    name: 'Delaware',
    code: 'DE',
  },
  {
    name: 'Florida',
    code: 'FL',
  },
  {
    name: 'Georgia',
    code: 'GA',
  },
  {
    name: 'Hawaii',
    code: 'HI',
  },
  {
    name: 'Idaho',
    code: 'ID',
  },
  {
    name: 'Illinois',
    code: 'IL',
  },
  {
    name: 'Indiana',
    code: 'IN',
  },
  {
    name: 'Iowa',
    code: 'IA',
  },
  {
    name: 'Kansas',
    code: 'KS',
  },
  {
    name: 'Kentucky',
    code: 'KY',
  },
  {
    name: 'Louisiana',
    code: 'LA',
  },
  {
    name: 'Maine',
    code: 'ME',
  },
  {
    name: 'Maryland',
    code: 'MD',
  },
  {
    name: 'Massachusetts',
    code: 'MA',
  },
  {
    name: 'Michigan',
    code: 'MI',
  },
  {
    name: 'Minnesota',
    code: 'MN',
  },
  {
    name: 'Mississippi',
    code: 'MS',
  },
  {
    name: 'Missouri',
    code: 'MO',
  },
  {
    name: 'Montana',
    code: 'MT',
  },
  {
    name: 'Nebraska',
    code: 'NE',
  },
  {
    name: 'Nevada',
    code: 'NV',
  },
  {
    name: 'New Hampshire',
    code: 'NH',
  },
  {
    name: 'New Jersey',
    code: 'NJ',
  },
  {
    name: 'New Mexico',
    code: 'NM',
  },
  {
    name: 'New York',
    code: 'NY',
  },
  {
    name: 'North Carolina',
    code: 'NC',
  },
  {
    name: 'North Dakota',
    code: 'ND',
  },
  {
    name: 'Ohio',
    code: 'OH',
  },
  {
    name: 'Oklahoma',
    code: 'OK',
  },
  {
    name: 'Oregon',
    code: 'OR',
  },
  {
    name: 'Pennsylvania',
    code: 'PA',
  },
  {
    name: 'Rhode Island',
    code: 'RI',
  },
  {
    name: 'South Carolina',
    code: 'SC',
  },
  {
    name: 'South Dakota',
    code: 'SD',
  },
  {
    name: 'Tennessee',
    code: 'TN',
  },
  {
    name: 'Texas',
    code: 'TX',
  },
  {
    name: 'Utah',
    code: 'UT',
  },
  {
    name: 'Vermont',
    code: 'VT',
  },
  {
    name: 'Virginia',
    code: 'VA',
  },
  {
    name: 'Washington',
    code: 'WA',
  },
  {
    name: 'West Virginia',
    code: 'WV',
  },
  {
    name: 'Wisconsin',
    code: 'WI',
  },
  {
    name: 'Wyoming',
    code: 'WY',
  },
]

const sats = [
  {
    value: '1500+',
    label: '1500+',
  },
  {
    value: '1400+',
    label: '1400+',
  },
  {
    value: '1300+',
    label: '1300+',
  },
  {
    value: '1200+',
    label: '1200+',
  },
  {
    value: '1000+',
    label: '1000+',
  },
  {
    value: '1000-',
    label: '1000-',
  },
]

const acts = [
  {
    value: '35+',
    label: '35+',
  },
  {
    value: '30+',
    label: '30+',
  },
  {
    value: '25+',
    label: '25+',
  },
  {
    value: '20+',
    label: '20+',
  },
  {
    value: '10+',
    label: '10+',
  },
  {
    value: '10-',
    label: '10-',
  },
]

export default function CollegeSearchByAttributes() {
  const [schoolType, setSchoolType] = React.useState('Public')

  const handleChangeSchoolType = (event) => {
    setSchoolType(event.target.value)
  }

  const [state, setState] = React.useState('NC')

  const handleChangeState = (event) => {
    setState(event.target.value)
  }

  const [year, setYear] = React.useState('2yr')

  const handleChangeYear = (event) => {
    setYear(event.target.value)
  }

  const [sat, setSat] = React.useState('1300+')

  const handleChangeSat = (event) => {
    setSat(event.target.value)
  }

  const [act, setAct] = React.useState('25+')

  const handleChangeAct = (event) => {
    setAct(event.target.value)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const SeachByAttribute = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
      <div>
        <TextField
          required
          id="select-state"
          select
          label="Select"
          value={state}
          variant="filled"
          onChange={handleChangeState}
          helperText="Please select the state of the preferred school">
          {states.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          required
          id="select-school-type"
          select
          label="Select"
          value={schoolType}
          variant="filled"
          onChange={handleChangeSchoolType}
          helperText="Please select the type of the preferred school">
          {schoolTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          required
          id="select-year"
          select
          label="Select"
          value={year}
          variant="filled"
          onChange={handleChangeYear}
          helperText="Please select the year of the preferred school">
          {years.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          required
          id="select-sat"
          select
          label="Select"
          value={sat}
          variant="filled"
          onChange={handleChangeSat}
          helperText="Please select the SAT range">
          {sats.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          required
          id="select-act"
          select
          label="Select"
          value={act}
          variant="filled"
          onChange={handleChangeAct}
          helperText="Please select the ACT range">
          {acts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
      <Button variant="contained" color="success" onClick={SeachByAttribute}>
        Search
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Should Search for Colleges base on Input</Typography>
      </Popover>

      </div>

    </Box>
  )
}

