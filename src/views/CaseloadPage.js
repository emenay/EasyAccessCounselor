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
//import Autocomplete from '@material-ui/lab/Autocomplete';
import { db } from '../firebase/firebase';

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
      {/*<Autocomplete
        id="search-input"
        freeSolo
        options={props.default.map((option) => option.Name)}
        renderInput={(params) => (
          <TextField {...params} label="Find a student (Ex: John Doe)" margin="normal" variant="outlined" />
        )}
      />*/}
    </div>
  );
}

export function TableView(props) {
  let people = props.data.default;
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
  return (
    <div id="grid">
      {props.data.default.map(person => <span key={person.id} className="square">
        <div className="card" style={getBGColor(person)}>
          <div className="card-content">
            <p className="title is-4">{person.Name}</p>
            <p className="subtitle is-6">{person.Results}</p>
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

function getBGColor(person) {
  let bgcolor = {backgroundColor: "#ACE7FF"};
  switch (person.Results) {
    case 'Waitlisted': bgcolor.backgroundColor = "#FFF284"
      break;
    case 'Accepted': bgcolor.backgroundColor = "#C0FF97"
      break;
    case 'Rejected': bgcolor.backgroundColor = "#FFA4A4"
      break;
    default: bgcolor.backgroundColor = "#ACE7FF"
  }
  return bgcolor;
}

export function BlockView(props) {
  return (
    <div id="blockview">
      {props.data.default.map(person => <div key={person.id} className="blockview-child">
        <div className="card" style={getBGColor(person)}>
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

class DropdownSortMenu extends React.Component {
  constructor(props) {
      super(props);
      this.state = { collapsed: true };
      this.handleToggle = this.handleToggle.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
  }

  handleToggle = (event) => {
      this.setState({ collapsed: !this.state.collapsed });
  }

  handleBlur = (event) => {
    this.setState({ collapsed: true });
  }

  render() {
      return(
          <div className={"dropdown" + (this.state.collapsed ? "" : " is-active")} tabIndex="0" onBlur={this.handleBlur}>
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
  let newData = this.state.currentData.default.sort(sortFunction(event.target.id))
  this.setState({currentData: {default: newData}, sortStatus: event.target.id})

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

function changeFilter(filterSettings){
  let arr = [];
  let currData = this.state.originalData;
  Object.keys(currData).forEach(function (key) {
    arr.push(currData[key]);
  });
  var newData = arr[0].filter(function (el) {
    let goal = true;
    let early = true;
    let essay = true;
    let result = true;
    let decision = true;

    if(filterSettings["Goalfilter"] !== undefined && filterSettings["Goalfilter"].length > 0){
      if(!filterSettings["Goalfilter"].includes(el["Goal"])){
        goal = false;
      }
    }
    if(filterSettings["Early Appsfilter"] !== undefined && filterSettings["Early Appsfilter"].length > 0){
      if(!filterSettings["Early Appsfilter"].includes(el["Early Apps"])){
        early = false;
      }
    }
    if(filterSettings["Essayfilter"] !== undefined && filterSettings["Essayfilter"].length > 0){
      if(!filterSettings["Essayfilter"].includes(el["Essay"])){
        essay = false;
      }
    }
    if(filterSettings["Resultsfilter"] !== undefined && filterSettings["Resultsfilter"].length > 0){
      if(!filterSettings["Resultsfilter"].includes(el["Results"])){
        result = false;
      }
    }
    if(filterSettings["Decisionfilter"] !== undefined && filterSettings["Decisionfilter"].length > 0){
      if(!filterSettings["Decisionfilter"].includes(el["Decision"])){
        decision = false;
      }
    }

    return goal && early && essay && result && decision;
  });
  newData = newData.sort(sortFunction(this.state.sortStatus))
  this.setState({currentData: {default : newData}})
}

function arrayRemove(currData, value) {
  let data = [];
  Object.keys(currData).forEach(function (key) {
    data.push(currData[key]);
  });
  return data.filter(function(ele){ return ele !== value; });
}

class DropdownFilterMenu extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        "Goalcollapse": true,
        "Early Appscollapse": true,
        "Essaycollapse": true,
        "Resultscollapse": true,
        "Decisioncollapse": true,
        uniqueValues: this.getUniqueValues(props.data),
        "Goalfilter": [],
        "Early Appsfilter": [],
        "Essayfilter": [],
        "Resultsfilter": [],
        "Decisionfilter": []
      };
      this.handleToggle = this.handleToggle.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  getUniqueValues(data) {
    let unique = {
      "Goal": [],
      "Early Apps": [],
      "Essay": [],
      "Results": [],
      "Decision": []
    }

    let lookup1 = {};
    let lookup2 = {};
    let lookup3 = {};
    let lookup4 = {};
    let lookup5 = {};

    let arr = [];
    Object.keys(data).forEach(function (key) {
      arr.push(data[key]);
    });

    let dataArray = arr[0]

    for (var i = 0; i < dataArray.length; i++) {
      let person = dataArray[i];
      var goal = person["Goal"];
      var early = person["Early Apps"];
      var essay = person["Essay"];
      var results = person["Results"];
      var decision = person["Decision"];

      if (!(goal in lookup1)) {
        lookup1[goal] = 1;
        unique["Goal"].push(goal);
      }

      if (!(early in lookup2)) {
        lookup2[early] = 1;
        unique["Early Apps"].push(early);
      }

      if (!(essay in lookup3)) {
        lookup3[essay] = 1;
        unique["Essay"].push(essay);
      }

      if (!(results in lookup4)) {
        lookup4[results] = 1;
        unique["Results"].push(results);
      }

      if (!(decision in lookup5)) {
        lookup5[decision] = 1;
        unique["Decision"].push(decision);
      }
    }

    return unique;
  }

  handleToggle = (event) => {
    this.setState({ 
      [event.target.id + "collapse"]: !this.state[event.target.id + "collapse"]
    });
  }

  handleBlur() {
    this.setState({
      "Goalcollapse": true,
      "Early Appscollapse": true,
      "Essaycollapse": true,
      "Resultscollapse": true,
      "Decisioncollapse": true
    });
  }

  handleClick = (event) => {
    let arr = [];
    if (event.target.className.includes('is-active')) {
      if(this.state[event.target.name + "filter"] != undefined) {
        arr = arrayRemove(this.state[event.target.name + "filter"], event.target.id)
        this.state[event.target.name + "filter"] = arr;
      }
      event.target.classList.remove('is-active')
    } else {
      if(this.state[event.target.name + "filter"] != undefined){
        arr = this.state[event.target.name + "filter"]
        arr[arr.length] = event.target.id
      } else {
        arr = [event.target.id]
      }
      event.target.classList.add('is-active')
    }
    this.props.onFilter(this.state);
  }

  render() {
      return(
        <span>
          <span className="filter-label">Filter by:</span>
          {Object.entries(this.state.uniqueValues).map(([name, info]) =>
            (<div className={"dropdown filter-button" + (this.state[name + "collapse"] ? "" : " is-active")} tabIndex="0" key={name} onBlur={this.handleBlur}>
                <div className="dropdown-trigger">
                    <span><button id={name} className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.handleToggle}>
                        {name + ":"}
                    </button></span>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content" id="filter-options">
                      {info.map(value => <a id={value} name={name} key={value} className="dropdown-item" onClick={this.handleClick}>{value}</a>)}
                    </div>
                </div>
            </div>
            )
          )}
        </span>
      );
  }
}

class CaseloadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: data2,
      originalData: data2,
      view: 'grid_view',
      sortState: "id"
    }
    this.changeSort = changeSort.bind(this);
    this.changeFilter = changeFilter.bind(this);
  }

  // async componentDidMount() {
  //   let query = await db.collection("students").where("cuid", "==", this.props.cuid).get();
  //   console.log(query);
  //   this.setState({currentData: query.docs.map(doc => doc.data())})
  // }

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
      case 'grid_view': currentComponent.setState({ view: 'grid_view' })
        break;
      case 'block_view': currentComponent.setState({ view: 'block_view' })
        break;
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
              <li className="btn is-active" id="gview" onClick={this.handleClick}><a id="grid_view" className="navbar-item tab">Grid View</a></li>
              <li className="btn" id="bview" onClick={this.handleClick}><a id="block_view" className="navbar-item tab">Block View</a></li>
              <li className="btn" id="tview" onClick={this.handleClick}><a id="table_view" className="navbar-item tab">Table View</a></li>
            </ul>
          </div>
          <DropdownSortMenu onClick={this.changeSort}/>
          <DropdownFilterMenu data={this.state.originalData} onFilter={this.changeFilter}/>
        </div>
        <div id="render_view">
          {
           {
             'grid_view': <GridView data={this.state.currentData} />,
             'block_view': <BlockView data={this.state.currentData} />,
             'table_view': <TableView data={this.state.currentData} />
           }[this.state.view]
          }
        </div>
      </div>
    )
  }
}

export default CaseloadPage;