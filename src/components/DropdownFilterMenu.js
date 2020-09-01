import React from 'react';
import { Slider } from '@material-ui/core';
import '../css/StudentProfilesPage.css';

/*
    Props needed:
    fields: number fields {name: "gpa", displayName: "GPA", type: "number", step: 0.05, low: 0.00, high: 4.00}
            group fields {name: "race", displayName: "Race", type:"group"},
    filterGroupItems: object with group name keys with sets of values to be filtered for {"gender": new Set(), "race": new Set(), "major": new Set()}
    deleteFilter: callback for when an item is unchecked, called with filter group and value
    changeEvent: callback for when a slider is moved or a new item is checked, called with filter group and value
    filters: object of currently active filters. key is the field name and values are objects of following format: {type: field.type, values: values}
    icon: icon for the filter tab
    fields={this.filterFields} filterGroupItems={this.state.filterGroupItems} deleteFilter={this.deleteFilter} changeEvent={this.changeFilter} filters={this.state.filters} icon={Object.keys(this.state.filters).length === 0 ? filter_outline : filter_icon}
*/
class DropdownFilterMenu extends React.Component {
    constructor(props) {
        super(props);
        let checkFilters = new Map();
        this.marks = new Map();
        props.fields.forEach(field=>{
            checkFilters.set(field.name, false);
            if (field.type === "number") {
                this.marks.set(field.name, [{value: field.low, label: field.low}, {value: field.high, label: field.high}]);
            }
        });
        this.state = { 
          collapsed: true,
          openedSubmenu: null,
          smPosition: 0,
          checkFilters: checkFilters
        };
    }
  
    handleToggle = (event) => {
        event.stopPropagation();
        this.setState({ collapsed: !this.state.collapsed });
    }
  
    handleBlur = (event) => {
        if (event.relatedTarget === null || event.relatedTarget.className !== "filter-checkbox") this.setState({ collapsed: true, openedSubmenu: null });
    }

    changeSubmenu = (index, name) => {
      this.setState({openedSubmenu: name, smPosition: index});
    }

    handleChange = (e, value) =>{
        if (this.state.checkFilters.get(this.state.openedSubmenu.name)){
            this.props.changeEvent(this.state.openedSubmenu, value);
        }
    }

    changeChecked = (e) => {
        let isChecked = this.state.checkFilters.get(this.state.openedSubmenu.name);
        if (isChecked){
            // Delete field from parent
            this.props.deleteFilter(this.state.openedSubmenu, e.target.value);
        } 
        var new_map = new Map(this.state.checkFilters);
        new_map.set(this.state.openedSubmenu.name, !this.state.checkFilters.get(this.state.openedSubmenu.name))
        this.setState({checkFilters: new_map});
    }

    changedGroupCheck = (e)=>{
        let isChecked = this.state.openedSubmenu.name in this.props.filters && this.props.filters[this.state.openedSubmenu.name].values.has(e.target.value);
        if (isChecked){
            this.props.deleteFilter(this.state.openedSubmenu, e.target.value);
        } else {
            this.props.changeEvent(this.state.openedSubmenu, e.target.value);
        }
    }

    filterGroupsHelper = () =>{
        if (typeof this.props.filterGroupItems[this.state.openedSubmenu.name] === "undefined" || this.props.filterGroupItems[this.state.openedSubmenu.name].size === 0){
            return <p>No Groups</p>
        } else {
            return (
            Array.from(this.props.filterGroupItems[this.state.openedSubmenu.name]).map(filter_item=>{
                return(
                <label className="check-label" forhtml={filter_item} key={filter_item}>
                    <input className="filter-checkbox" type="checkbox" onChange={this.changedGroupCheck} checked={this.state.openedSubmenu.name in this.props.filters ? this.props.filters[this.state.openedSubmenu.name].values.has(filter_item) : false} id={filter_item} name={filter_item} value={filter_item} />{filter_item}
                </label>);
            }));
        }
    }


    displaySubmenu = () => {
        if (this.state.openedSubmenu.type === "number"){
            return (<div className="dropdown-submenu" style={{top: (this.state.smPosition + 1) * 32.5 + 12 + "px", width: "300px"}} role="menu">
            <label className="check-label" forhtml={this.state.openedSubmenu.name}>
                <input className="filter-checkbox" type="checkbox" onChange={this.changeChecked} checked={this.state.checkFilters.get(this.state.openedSubmenu.name)} id={this.state.openedSubmenu.name} name={this.state.openedSubmenu.name} />{this.state.openedSubmenu.displayName}
            </label>
            <Slider
                value={this.state.openedSubmenu.name in this.props.filters > 0 ? this.props.filters[this.state.openedSubmenu.name].values : [this.state.openedSubmenu.low, this.state.openedSubmenu.high]}
                max={this.state.openedSubmenu.high}
                min={this.state.openedSubmenu.low}
                step={this.state.openedSubmenu.step}
                marks={this.marks.get(this.state.openedSubmenu.name)}
                onChange={this.handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
            </div>);
        } else {
            return (<div className="dropdown-submenu" style={{top: (this.state.smPosition + 1) * 32.5 + 12 + "px", width: "300px"}} role="menu">
            {this.filterGroupsHelper()}
            </div>);
        }
      
    }

  
    render() {
        return(
            <div className={"dropdown" + (this.state.collapsed ? "" : " is-active")} tabIndex="0" onBlur={this.handleBlur}>
                <div className="dropdown-trigger">
                    <button className="dropdown-btn" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.handleToggle}>
                      <img className="filter-icon" src={this.props.icon} alt="filter icon" />
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content" id="sort-options">
                      {this.props.fields.map((field, index) => {
                        return <a key={index} className={"dropdown-item" + (this.state.selected === field.name ? " is-active": "")} onMouseOver={()=>this.changeSubmenu(index, field)}>{field.displayName + "   \u25B7"}</a>
                      })}
                    </div>
                </div>
                {this.state.openedSubmenu !== null && this.displaySubmenu()}
                
            </div>
        );
    }
  }

export default DropdownFilterMenu;