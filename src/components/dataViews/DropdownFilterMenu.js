import React from "react";
import '../../css/CaseloadPage.css';
import 'bulma/css/bulma.css';

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
            selectedMenu: null,
            currentFilters: {}
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleToggle(filterField) {
        this.setState({selectedMenu: filterField});
    }

    handleBlur() {
        this.setState({selectedMenu: null});
    }

    handleClick() {
        console.log("implement");
    }

    render() {
        return(
          <span>
            <span className="filter-label">Filter by:</span>
            {Array.from(this.props.filterFields).map(([name, vals]) =>
              (<div className={"dropdown filter-button" + (name === this.state.selectedMenu ? " is-active" : "")} tabIndex="0" key={name} onBlur={this.handleBlur}>
                  <div className="dropdown-trigger">
                      <span><button id={name} className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={()=>this.handleToggle(name)}>
                          {name + ":"}
                      </button></span>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                      <div className="dropdown-content" id="filter-options">
                        {vals.map(value => <a id={value} name={name} key={value} className="dropdown-item" onClick={this.handleClick}>{value}</a>)}
                      </div>
                  </div>
              </div>
              )
            )}
          </span>
        );
    }
    
}
/*
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
  }*/

export default DropdownFilterMenu;
  