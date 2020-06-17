import React from 'react';
import {inputSearch} from './CaseloadPage.js';
// import {TableView} from './CaseloadPage.js';
import {GridView} from './CaseloadPage.js';
import {BlockView }from './CaseloadPage.js';
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

// --- START TablePagination

// Creates styling for the TablePaginationActions
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

// The TablePaginationActions Component handles the bottom section of a table where a user can click back and forth through pages
// It does NOT handle selecting the number of rows to display
// The onChangePage is a function passed as a prop that selects which page to display. The handle functions are wrappers to select the exact page num
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

// Makes the props required
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// --- END TablePagination


// --- START TableView

// Styles to use with TableView
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

// Component for creating the actual table view of the data
function TableView(props) {

  // Section for loading the data from the example json
  // Loops through array of maps and assigns to people
  var arr = [];
  Object.keys(props.data).forEach(function (key) { 
    arr.push(props.data[key]);
  });
  let people = arr[0];
  // I have no idea what this section is for
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
  const [page, setPage] = React.useState(0); // Hook for starting at first page of data
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Hook that sets default rows per page to 5

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, people.length - page * rowsPerPage);

  // Function to change to a specific Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to set the rows per page to a certain number
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // NOTE: currently sets page to first page
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Goal</TableCell>
            <TableCell align="right">Public Safety</TableCell>
            <TableCell align="right">Public Target</TableCell>
            <TableCell align="right">Public Reach</TableCell>
            <TableCell align="right">Private Safety</TableCell>
            <TableCell align="right">Private Target</TableCell>
            <TableCell align="right">Private Reach</TableCell>
            <TableCell align="right">GPA</TableCell>
            <TableCell align="right">SAT</TableCell>
            <TableCell align="right">ACT</TableCell>
            <TableCell align="right">EFC</TableCell>
            <TableCell align="right">Ability to Pay</TableCell>
            <TableCell align="right">ZIP</TableCell>
            <TableCell align="right">state</TableCell>
            <TableCell align="right">Want to Attend (Region)</TableCell>
            <TableCell align="right">Major</TableCell>
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
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">{people.Testing}</TableCell>
              <TableCell align="right">{people.Testing}</TableCell>
              <TableCell align="right">{people.Testing}</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
              <TableCell align="right">""</TableCell>
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

class DropdownMenu extends React.Component {
  constructor(props) {
      super(props);
      this.state = { collapsed: true };
      this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = (event) => {
      this.setState({ collapsed: !this.state.collapsed });
  }

  handleBlur = (event) => {
    this.setState({ collapsed: true });
  }

  render() {
      return(
          <div className={"dropdown" + (this.state.collapsed ? "" : " is-active")} tabIndex="0" onBlur={this.handleToggle}>
              <div className="dropdown-trigger">
                  <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.handleToggle}>
                      <span id="sort-status">Sort By: ID</span>
                  </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content" id="sort-options">
                    <a id="Name" className="dropdown-item" onClick={this.props.onClick}>Name</a>
                    <a id="id" className="dropdown-item is-active" onClick={this.props.onClick}>ID</a>
                    <a id="Results" className="dropdown-item" onClick={this.props.onClick}>Results</a>
                  </div>
              </div>
          </div>
      );
  }
}

function changeSort(event){
  let arr = [];
  let currData = this.state.currentData;
  Object.keys(currData).forEach(function (key) {
    arr.push(currData[key]);
  });
  let newData = arr[0].sort(sortFunction(event.target.id))
  this.setState({data: newData})

  let navNodes = document.getElementById("sort-options").childNodes
  navNodes.forEach(e => {
    if (e.className.includes('is-active'))
      e.classList.remove('is-active')
  })
  event.target.classList.add('is-active')

  document.getElementById("sort-status").innerHTML = "Sort by: " + event.target.innerHTML;
}

function sortFunction(prop) {
  return function(a, b) {
      if (a[prop] > b[prop]) {
          return 1;
      } else if (a[prop] < b[prop]) {
          return -1;
      }
      return 0;
  }
}

class CollegeListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: data2,
      view: 'table_view'
    }
    this.changeSort = changeSort.bind(this);
  }

  handleClick = (event) => {
    event.persist()
    let currentComponent = this;

    // switches active state of tabs
    let navNodes = document.getElementById("navigation").childNodes;
    navNodes.forEach(e => {
      if (e.className.includes('is-active'))
        e.classList.remove('is-active')
    })
    event.target.parentElement.classList.add('is-active')

    switch (event.target.id) {
      // case 'grid_view': currentComponent.setState({ view: 'grid_view' })
      //   break;
      // case 'block_view': currentComponent.setState({ view: 'block_view' })
      //   break;
      case 'table_view': currentComponent.setState({ view: 'table_view' })
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
                {/* <li className="btn is-active" id="gview" onClick={this.handleClick}><a id="grid_view" className="navbar-item tab">Grid View</a></li>
                <li className="btn" id="bview" onClick={this.handleClick}><a id="block_view" className="navbar-item tab">Block View</a></li> */}
                <li className="btn" id="tview" onClick={this.handleClick}><a id="table_view" className="navbar-item tab">Table View</a></li>
              </ul>
            </div>
            <DropdownMenu onClick={this.changeSort}/>
          </div>
          <div id="render_view">
            {
             {
              //  'grid_view': <GridView data={this.state.currentData} />,
              //  'block_view': <BlockView data={this.state.currentData} />,
               'table_view': <TableView data={this.state.currentData} />
             }[this.state.view]
            }
          </div>
        </div>
      )
    }
}



export default CollegeListPage;