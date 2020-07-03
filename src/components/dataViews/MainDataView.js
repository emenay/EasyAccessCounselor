import React from 'react';
// import ReactDOM from 'react-dom';
import * as data2 from '../../data_caseload_management.json';
import {BlockView} from "./BlockView";
import {GridView} from "./GridView";
import {TableView} from "./TableView";
import '../../css/StudentProfilesPage.css';
import '../../css/CaseloadPage.css';
import 'bulma/css/bulma.css';



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

// -- START Sort Menu 

/*
pass fields prop:
array of objs with fields name, displayName, submenu items

*/
export class DropdownSortMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          collapsed: true,
          openedSubmenu: null,
          smPosition: 0,
          selected: "SAT" 
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
    }
  
    handleToggle = (event) => {
        this.setState({ collapsed: !this.state.collapsed });
    }
  
    handleBlur = (event) => {
      this.setState({ collapsed: true, openedSubmenu: null });
    }

    changeSubmenu = (index, name) => {
      this.setState({openedSubmenu: name, smPosition: index});
    }
  
    changeSelected(selectedName, isReverse){
      this.props.changeEvent(selectedName, isReverse);
      this.setState({selected: selectedName});
    }

    displaySubmenu = () => {
      var selected = this.state.openedSubmenu;
      return (<div className="dropdown-submenu" style={{top: (this.state.smPosition + 1) * 32.5 + 12.5 + "px"}} role="menu">
        <a className="dropdown-item" onMouseDown={()=>this.changeSelected(selected.name, false)}>{selected.smitem[0]}</a>
        <a className="dropdown-item" onMouseDown={()=>this.changeSelected(selected.name, true)}>{selected.smitem[1]}</a>
      </div>);
    }
  
    render() {
        return(
            <div className={"dropdown" + (this.state.collapsed ? "" : " is-active")} tabIndex="0" onBlur={this.handleBlur}>
                <div className="dropdown-trigger">
                    <button className="dropdown-btn" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.handleToggle}>
                      <img className="filter-icon" src={this.props.icon} alt="sort icon" />
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content" id="sort-options">
                      {this.props.fields.map((field, index) => {
                        return <a className="dropdown-item" onMouseOver={()=>this.changeSubmenu(index, field)}>{field.displayName + "   \u25B7"}</a>
                      })}
                    </div>
                </div>
                {this.state.openedSubmenu !== null && this.displaySubmenu()}
                
            </div>
        );
    }
  }
  /*
                        <a className="dropdown-item" onMouseOver={()=>this.changeSubmenu("lastName")}>{"Name   \u25B7"}</a>
                      <a className="dropdown-item" onMouseDown={()=>this.changeSelected("uid")}>ID</a>
                      <a className="dropdown-item" onMouseDown={()=>this.changeSelected("SAT")}>SAT</a>
                      */
  
  
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
  
  
// -- END Sort Menu

// -- START Filter Menu

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
        event.target.classList.remove('is-active');
      } else {
        if(this.state[event.target.name + "filter"] != undefined){
          arr = this.state[event.target.name + "filter"]
          arr[arr.length] = event.target.id
        } else {
          arr = [event.target.id]
        }
        event.target.classList.add('is-active');
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

  // -- END Filter Menu
  
  class MainDataView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentData: data2,
        originalData: data2,
        view: 'table_view',
        sortState: "id"
      }
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
                <li className="btn is-active" id="tview" ><a id="table_view" className="navbar-item tab">Table View</a></li>
              </ul>
            </div>
            <DropdownSortMenu changeEvent={this.changeSort}/>
            <DropdownFilterMenu data={this.state.originalData} onFilter={this.changeFilter}/>
          </div>
          <div id="render_view">
            {
             {
               'table_view': <TableView data={data2} fields={this.props.fields} />
             }[this.state.view]
            }
          </div>
        </div>
      )
    }
  }
  
export default MainDataView;

/* 
'grid_view': <GridView data={data2.default}/>,
               'block_view': <BlockView data={this.state.currentData} />*/
