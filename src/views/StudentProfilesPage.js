import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import {DropdownSortMenu} from "../components/dataViews/MainDataView.js";
import { Slider } from '@material-ui/core';
import "../css/StudentProfilesPage.css";
import "../css/searchBar.css";
import StudentDetailsModal from '../components/StudentDetailsModal.js';
import orange_flag from "../assets/orange_flag.png";
import unflagged from "../assets/unflagged.png";
import {db} from "../firebase/firebase";
import filter_icon from "../assets/filter_icon.png";
import filter_outline from "../assets/filter_outline.png";
import sorted_ascend from "../assets/sorted_ascend.png";
import sorted_descend from "../assets/sorted_descend.png";
import unsorted_icon from "../assets/unsorted_icon.png";
import {UserContext} from '../providers/UserProvider';


export class DropdownFilterMenu extends React.Component {
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
        if (event.relatedTarget === null) this.setState({ collapsed: true, openedSubmenu: null });
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
                    <input type="checkbox" onChange={this.changedGroupCheck} checked={this.state.openedSubmenu.name in this.props.filters ? this.props.filters[this.state.openedSubmenu.name].values.has(filter_item) : false} id={filter_item} name={filter_item} value={filter_item} />{filter_item}
                </label>);
            }));
        }
    }


    displaySubmenu = () => {
        if (this.state.openedSubmenu.type === "number"){
            return (<div className="dropdown-submenu" style={{top: (this.state.smPosition + 1) * 32.5 + 12 + "px", width: "300px"}} role="menu">
            <label className="check-label" forhtml={this.state.openedSubmenu.name}>
                <input type="checkbox" onChange={this.changeChecked} checked={this.state.checkFilters.get(this.state.openedSubmenu.name)} id={this.state.openedSubmenu.name} name={this.state.openedSubmenu.name} />{this.state.openedSubmenu.displayName}
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


class StudentProfilesPage extends React.Component{
    static contextType = UserContext;
    constructor(props){
        super(props);
        this.sortFields = [
            {name: "SAT", displayName: "SAT", smitem: ["Low to High", "High to Low"]},
            {name: "gpa", displayName: "GPA", smitem: ["Low to High", "High to Low"]},
            {name: "ACT", displayName: "ACT", smitem: ["Low to High", "High to Low"]},
            {name: "firstName", displayName: "First Name", smitem: ["A to Z", "Z to A"]},
            {name: "lastName", displayName: "Last Name", smitem: ["A to Z", "Z to A"]}
        ]
        this.filterFields = [
            {name: "gpa", displayName: "GPA", type: "number", step: 0.05, low: 0.00, high: 4.00},
            {name: "sat", displayName: "SAT", type: "number", step: 10, low: 0, high: 1600},
            {name: "act", displayName: "ACT", type: "number", step: 1, low: 0, high: 36},
            {name: "race", displayName: "Race", type:"group"},
            {name: "gender", displayName: "Gender", type:"group"},
            {name: "major", displayName: "Major", type:"group"},
            {name: "schools", displayName: "Schools", type:"group"}
        ]
        this.state = {
            data: [],
            selectedCard: null,
            sortField: "uid",
            sortReverse: false,
            filters: {},
            searchString: "",
            flagSet: new Set(),
            flagToggle: false,
            sortIcon: unsorted_icon,
            lastCohort: null,
            filterGroupItems: {"gender": new Set(), "race": new Set(), "major": new Set()}
        }
    }

    getCohortData = () => {
        if (this.context.state && this.state.lastCohort !== this.context.state.selectedCohort){
            db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students")
            .get()
            .then(querySnapshot => {
            // array of student objects
                return querySnapshot.docs.map(doc => {
                    var ent = doc.data();
                    ent.uid = doc.id;
                    return ent;
                });
                
            })
            .then(data => {
                let flagSet = new Set();
                let filterGroupItems = Object.assign(this.state.filterGroupItems, {});
                data.forEach(person=>{
                    if (person.flagged === true) flagSet.add(person.uid);
                    for (const field in filterGroupItems){
                        if (person[field] !== undefined) filterGroupItems[field].add(person[field]);
                    }
                });
                this.setState({
                    data: data,
                    flagSet: flagSet,
                    lastCohort: this.context.state.selectedCohort,
                    filterGroupItems: filterGroupItems
                });
            })
            .catch(error => {console.log(error)});
        }
    }

    componentDidMount() {
        this.getCohortData();
    }

    componentDidUpdate() {
        this.getCohortData();
    }

    // Helper function for sorting
    compare = (field, isReverse) => {
        return function (a, b){
            let comparison;
            let aVal = a[field];
            let bVal = b[field];
            if (!aVal || !bVal) {
                if (!aVal && bVal){
                    comparison = -1;
                } else if (!bVal && aVal){
                    comparison = 1;
                }
            } else {
                if (bVal > aVal) {
                    comparison = -1;
                } else if (aVal > bVal) {
                    comparison = 1;
                }
            }

            if (isReverse) comparison *= -1;
            return comparison;
        }
    }

    changeSort = (field, isReverse) => {
        let data = this.state.data;
        // ONLY SORT WHEN NECESSARY
        if (field !== this.state.sortField || isReverse !== this.state.sortReverse){
            data = data.slice().sort(this.compare(field, isReverse));
        }
        this.setState({data: data, sortField: field, sortReverse: isReverse, sortIcon: isReverse ? sorted_ascend : sorted_descend});
    }

    changeSearchString = (event) => {
        this.setState({searchString: event.target.value});
    }

    clickCard = (person) => {
        this.setState({selectedCard: person});
    }

    clickFlag = (id) => {
        if (this.state.flagSet.has(id)) {
            var new_set = new Set(this.state.flagSet);
            new_set.delete(id);
            this.setState({flagSet: new_set});
        } else {
            this.setState({flagSet: this.state.flagSet.add(id)})
        }

        if (this.context.state.user) {
            db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students").doc(id)
            .update({flagged: this.state.flagSet.has(id)});
        }
    }

    flagToggle = () => {
        this.setState({flagToggle: !this.state.flagToggle});
    }

    exitModal = () => {
        this.setState({selectedCard: null});
    }

    changeFilter = (field, values) => {
        var new_filter = Object.assign(this.state.filters, {});
        
        if (field.type === "number") {
            new_filter[field.name] = {type: field.type, values: values};
        } else {
            if (typeof new_filter[field.name] === "undefined") {
                new_filter[field.name] = {type: field.type, values: new Set([values])}
            } else {
                new_filter[field.name] = {type: field.type, values: new_filter[field.name].values.add(values)}
            }
        }
        this.setState({filters: new_filter});
    }

    deleteFilter = (field, value) => {
        var new_filter = Object.assign(this.state.filters, {});
        if (field.type === "number") {
            delete new_filter[field.name];
        } else {
            new_filter[field.name].values.delete(value);
            if (new_filter[field.name].values.size === 0) delete new_filter[field.name];
        }
        this.setState({filters: new_filter});
    }

    render(){
        let data = this.state.data;
        data = this.state.flagToggle ? data.filter(person => {return this.state.flagSet.has(person.uid)}) : data;
        if (this.state.searchString !== "") {
            data = data.filter(person=>{
                if ((person.firstName && person.firstName.toLowerCase().slice(0, this.state.searchString.length) === this.state.searchString.toLowerCase()) || (person.lastName && person.lastName.toLowerCase().slice(0, this.state.searchString.length) === this.state.searchString.toLowerCase())){
                    return true;
                }
                return false;
            });
        }
        // TODO: Make this data filtering more efficient
        data = data.filter(person => {
            for (const [field, filterInfo] of Object.entries(this.state.filters)) {
                if (typeof person[field] === "undefined") return false;
                if (filterInfo.type === "number"){
                    if (person[field] > filterInfo.values[1] || person[field] < filterInfo.values[0]) return false;
                } else {

                    if (!filterInfo.values.has(person[field])) return false; 
                }
                
            }
            return true;
        });

        return <div className="profiles-content">
            <div className="profiles-header">
                <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search for Students.." />
                <button className="flag-button" onClick={this.flagToggle}><img className="flag-image" alt="Select flagged fields icon" src={this.state.flagToggle? orange_flag : unflagged} /></button>
                <DropdownFilterMenu fields={this.filterFields} filterGroupItems={this.state.filterGroupItems} deleteFilter={this.deleteFilter} changeEvent={this.changeFilter} filters={this.state.filters} icon={Object.keys(this.state.filters).length === 0 ? filter_outline : filter_icon} />
                <DropdownSortMenu fields={this.sortFields} changeEvent={this.changeSort} icon={this.state.sortIcon}/>
            </div>
            {this.state.selectedCard && <StudentDetailsModal flagged={this.state.flagSet.has(this.state.selectedCard.uid)} exitModal={this.exitModal} info={this.state.selectedCard} />}
            <GridView data={data} clickCard={this.clickCard} clickFlag={this.clickFlag} flags={this.state.flagSet}/>
        </div>
    }
}

export default StudentProfilesPage;