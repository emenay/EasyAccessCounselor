import React from 'react';
// import ReactDOM from 'react-dom';
import * as data2 from '../../data_caseload_management.json';
import {BlockView} from "./BlockView.js";
import {GridView} from "./GridView.js";
import {TableView} from "./TableView.js";
import DropdownSortMenu from "./DropdownSortMenu.js";
import DropdownFilterMenu from "./DropdownFilterMenu.js";
import '../../css/CaseloadPage.css'
import 'bulma/css/bulma.css'

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

function changeFilter(filterSettings){
  return null;
}
/*
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
  
*/

  class MainDataView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentData: data2,
        originalData: data2,
        view: 'grid_view'
      }
      this.sortFields = ["ID", "Name", "Result"];
      this.changeFilter = changeFilter.bind(this);
    }
  
    // async componentDidMount() {
    //   let query = await db.collection("students").where("cuid", "==", this.props.cuid).get();
    //   console.log(query);
    //   this.setState({currentData: query.docs.map(doc => doc.data())})
    // }
  
    changeSort = (sortName) => {
      /*
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
      event.target.classList.add('is-active');
    
      document.getElementById("sort-status").innerHTML = "Sort by: " + event.target.innerHTML;*/
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
            <DropdownSortMenu changeSort={this.changeSort} sortFields={this.sortFields}/>
            <DropdownFilterMenu data={this.state.originalData} onFilter={this.changeFilter}/>
          </div>
          <div id="render_view">
            {
             {
               'grid_view': <GridView data={this.state.currentData}/>,
               'block_view': <BlockView data={this.state.currentData} />,
               'table_view': <TableView data={this.state.currentData} fields={this.props.fields} />
             }[this.state.view]
            }
          </div>
        </div>
      )
    }
  }
  
export default MainDataView;