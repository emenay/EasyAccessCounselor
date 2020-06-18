import React from 'react';
import {inputSearch} from './CaseloadPage.js';
// import {TableView} from './CaseloadPage.js';
import {BlockView} from "../components/dataViews/BlockView";
import {GridView} from "../components/dataViews/GridView";
import {TableView} from "../components/dataViews/TableView";
import * as data2 from '../data_caseload_management.json';
import '../css/CaseloadPage.css'
import 'bulma/css/bulma.css'

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
    this.fields = [
      "Goal",
      "Public Safety",
      "Public Target",
      "Public Reach",
      "Private Safety",
      "Private Target",
      "Public Reach",
      "GPA",
      "SAT",
      "ACT",
      "EFC",
      "Ability to Pay",
      "ZIP",
      "State",
      "Want to Attend (Region)",
      "Major"
    ];
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
            <DropdownMenu onClick={this.changeSort}/>
          </div>
          <div id="render_view">
            {
             {
               'grid_view': <GridView data={this.state.currentData} />,
               'block_view': <BlockView data={this.state.currentData} />,
               'table_view': <TableView data={this.state.currentData} fields={this.fields}/>
             }[this.state.view]
            }
          </div>
        </div>
      )
    }
}



export default CollegeListPage;