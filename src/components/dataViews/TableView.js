import React from 'react';
import '../../css/CaseloadPage.css';
import 'bulma/css/bulma.css';
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
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
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
  
  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });
  
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

    console.log(props);
    
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
              {props.fields.map(title=>{
                return <TableCell align="right">{title}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : people
            ).map((people) => (
              <TableRow key={people.id}>
                {props.fields.map(field=>{
                  return <TableCell align="right">{people[field]}</TableCell>
                })}
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

  TableView.propTypes = {
    fields: PropTypes.number.isRequired
  };
  
  
  
  /*
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


                <TableCell component="th" scope="row"> {people.Name}</TableCell>
                <TableCell align="right">{people["Goal"]}</TableCell>
                <TableCell align="right">{people["Meetings"]}</TableCell>
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
                <TableCell align="right">{people["Latest Note"]}</TableCell>*/