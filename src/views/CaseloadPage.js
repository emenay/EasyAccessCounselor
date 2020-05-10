import React from 'react';
// import ReactDOM from 'react-dom';
import * as data2 from '../data_caseload_management.json';
import '../css/CaseloadPage.css'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export function inputSearch(props) {
  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        id="search-input"
        freeSolo
        options={props.default.map((option) => option.Name)}
        renderInput={(params) => (
          <TextField {...params} label="Find a student (Ex: John Doe)" margin="normal" variant="outlined" />
        )}
      />
      </div>);
      }

export function TableView(props) {
  var arr = [];
  Object.keys(props.data).forEach(function (key) {
    arr.push(props.data[key]);
  });
  let people = arr[0]
  for(var tdata of people){
    for(var tdatakey of Object.keys(tdata)){
       
      if(tdata[tdatakey] === true){
        tdata[tdatakey] = "true";
      }
      if(tdata[tdatakey] === false){
        tdata[tdatakey] = "false";
      }
    }
  }
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Goal</TableCell>
            <TableCell align="right">Meetings</TableCell>
            <TableCell align="right">Tasks</TableCell>
            <TableCell align="right">Visit</TableCell>
            <TableCell align="right">Testing</TableCell>
            <TableCell align="right">List</TableCell>
            <TableCell align="right">Fee Waiver</TableCell>
            <TableCell align="right">Early Apps</TableCell>
            <TableCell align="right">Essay</TableCell>
            <TableCell align="right">Teacher Recs</TableCell>
            <TableCell align="right">Counselor Rec</TableCell>
            <TableCell align="right">Resume</TableCell>
            <TableCell align="right">FAFSA</TableCell>
            <TableCell align="right">CSS Profile</TableCell>
            <TableCell align="right">Results</TableCell>
            <TableCell align="right">Verification</TableCell>
            <TableCell align="right">Award Letters</TableCell>
            <TableCell align="right">Appeal</TableCell>
            <TableCell align="right">Spring Visit</TableCell>
            <TableCell align="right">Decision</TableCell>
            <TableCell align="right">Latest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : people
          ).map((people) => (
            <TableRow key={people.id}>
              <TableCell component="th" scope="row"> {people.Name}</TableCell>
              <TableCell align="right">{people.Goal}</TableCell>
              <TableCell align="right">{people.Meetings}</TableCell>
              <TableCell align="right">{people.Tasks}</TableCell>
              <TableCell align="right">{people.Visit}</TableCell>
              <TableCell align="right">{people.Testing}</TableCell>
              <TableCell align="right">{people.List}</TableCell>
              <TableCell align="right">{people["Fee Waiver"]}</TableCell>
              <TableCell align="right">{people["Early Apps"]}</TableCell>
              <TableCell align="right">{people.Essay}</TableCell>
              <TableCell align="right">{people["Teacher Recs"]}</TableCell>
              <TableCell align="right">{people["Counselor Rec"]}</TableCell>
              <TableCell align="right">{people.Resume}</TableCell>
              <TableCell align="right">{people.FAFSA}</TableCell>
              <TableCell align="right">{people["CSS Profile"]}</TableCell>
              <TableCell align="right">{people.Results}</TableCell>
              <TableCell align="right">{people.Verification}</TableCell>
              <TableCell align="right">{people["Award Letters"]}</TableCell>
              <TableCell align="right">{people.Appeal}</TableCell>
              <TableCell align="right">{people["Spring Visit"]}</TableCell>
              <TableCell align="right">{people.Decision}</TableCell>
              <TableCell align="right">{people["Latest Note"]}</TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={22}
              count={people.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export function GridView(props) {
  var arr = [];
  Object.keys(props.data).forEach(function (key) {
    arr.push(props.data[key]);
  });
  return (
    <div id="grid">
      {arr[0].map(person => <span key={person.id} className="square">
        <div className="card">
          <div className="card-content">
            <p className="title is-4">{person.Name}</p>
            <p className="subtitle is-6">{person.Essay}</p>
            <div className="content">
              <p>{person["Early Apps"]}</p>
            </div>
          </div>
        </div>
      </span>
      )}
    </div>
  )
}

export function BlockView(props) {
  var arr = [];
  Object.keys(props.data).forEach(function (key) {
    arr.push(props.data[key]);
  });
  return (
    <div id="blockview">
      {arr[0].map(person => <div key={person.id} className="blockview-child">
        <div className="card">
          <div className="card-content">
            <p className="title is-4">{person.Name}</p>
            <p className="subtitle is-6">{person.Essay}</p>
            <div className="content">
              <p>{person["Tasks"]}</p>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}

class CaseloadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <GridView data={data2} />
    }
  }

  handleClick = (event) => {
    event.persist()
    let currentComponent = this;

    // switches active state of tabs
    let navNodes = document.getElementById("navigation").childNodes
    navNodes.forEach(e => {
      if (e.className.includes('is-active'))
        e.classList.remove('is-active')
    })
    event.target.parentElement.classList.add('is-active')

    switch (event.target.id) {
      case 'grid_view': currentComponent.setState({ view: <GridView data={data2} /> })
        break;
      case 'block_view': currentComponent.setState({ view: <BlockView data={data2} /> })
        break;
      case 'table_view': currentComponent.setState({ view: <TableView data={data2} /> })
        break;
      default: console.log("here")
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="field has-addons">
            {inputSearch(data2)}
          </div>
          <div className="tabs is-centered" id="tabs">
            <ul id="navigation">
              <li className="btn is-active" id="gview" onClick={this.handleClick}><a id="grid_view" className="navbar-item tab">Grid View</a></li>
              <li className="btn" id="bview" onClick={this.handleClick}><a id="block_view" className="navbar-item tab">Block View</a></li>
              <li className="btn" id="tview" onClick={this.handleClick}><a id="table_view" className="navbar-item tab">Table View</a></li>
            </ul>
          </div>
        </div>
        <div id="render_view">
          {this.state.view}
        </div>
      </div>
    )
  }
}

export default CaseloadPage;