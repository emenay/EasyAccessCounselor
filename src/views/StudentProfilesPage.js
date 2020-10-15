import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import DropdownSortMenu from "../components/DropdownSortMenu";
import DropdownFilterMenu from '../components/DropdownFilterMenu';
import "../css/StudentProfilesPage.css";
import "../css/searchBar.css";
import StudentDetailsModal from '../components/StudentDetailsModal.js';
import {db} from "../firebase/firebase";
import sorted_ascend from "../assets/sorted_ascend.png";
import sorted_descend from "../assets/sorted_descend.png";
import unsorted_icon from "../assets/unsorted_icon.png";
import {UserContext} from '../providers/UserProvider';
// New Icon Imports 
import filter_outline from "../assets/essentials_icons/svg/controls-4.svg"
import filter_icon from "../assets/essentials_filled/svg/controls-4-filled.svg"
import unflagged from "../assets/essentials_icons/svg/flag-3.svg";
import orange_flag from "../assets/essentials_filled/svg/flag-3-filled.svg";

// OLD Icon Imports
// import filter_outline from "../assets/filter_outline.png";
// import filter_icon from "../assets/filter_icon.png";
// import unflagged from "../assets/unflagged.png";
// import orange_flag from "../assets/orange_flag.png";


class StudentProfilesPage extends React.Component{
    static contextType = UserContext;
    constructor(props){
        super(props);
        // Array of objects representing sort fields
        this.sortFields = [
            {name: "sat", displayName: "SAT", smitem: ["Low to High", "High to Low"]},
            {name: "gpa", displayName: "GPA", smitem: ["Low to High", "High to Low"]},
            {name: "act", displayName: "ACT", smitem: ["Low to High", "High to Low"]},
            {name: "firstName", displayName: "First Name", smitem: ["A to Z", "Z to A"]},
            {name: "lastName", displayName: "Last Name", smitem: ["A to Z", "Z to A"]}
        ]
        // Array of objects representing filter fields
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
            data: [], // array of student objects to be returned by db
            selectedCard: null, // object for student details of selected student, null if none selected
            sortField: "uid", // which field to be sorted by
            sortReverse: false,
            filters: {}, // filters: object mapping field to a set of values to be filtered by
            searchString: "",
            flagSet: new Set(), // Set of uids for students flagged
            flagToggle: false, // True if only viewing flagged student
            sortIcon: unsorted_icon,
            lastCohort: null, // Used to not repeatedly load same cohort when cohort switched/reloaded
            filterGroupItems: {"gender": new Set(), "race": new Set(), "major": new Set()} //Each group filter has a set of fields to be filtered by
        }
    }

    // Retrieve data from database
    getCohortData = () => {
        if (this.context.state && this.state.lastCohort !== this.context.state.selectedCohort){
            db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students")
            .get()
            .then(querySnapshot => {
            // array of student objects
                return querySnapshot.docs.map(doc => {
                    // Adding id to doc data
                    var ent = doc.data();
                    ent.uid = doc.id;
                    return ent;
                });
                
            })
            .then(data => {
                let flagSet = new Set();
                let filterGroupItems = Object.assign(this.state.filterGroupItems, {});
                data.forEach(person=>{
                    // Checking to see if flagged
                    if (person.flagged === true) flagSet.add(person.uid);
                    // Add option to filter if not previously seen
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

    // Function to change sort based on field and if revers necessary
    changeSort = (field, isReverse) => {
        let data = this.state.data;
        // ONLY SORT WHEN NECESSARY
        if (field !== this.state.sortField || isReverse !== this.state.sortReverse){
            data = data.slice().sort(this.compare(field, isReverse));
        }
        this.setState({data: data, sortField: field, sortReverse: isReverse, sortIcon: isReverse ? sorted_ascend : sorted_descend});
    }

    // Set search string when changed
    changeSearchString = (event) => {
        this.setState({searchString: event.target.value});
    }

    // Change selected card when clicked
    clickCard = (person) => {
        this.setState({selectedCard: person});
    }

    clickFlag = (id) => {
        // Update flagSet to reflect change
        if (this.state.flagSet.has(id)) {
            var new_set = new Set(this.state.flagSet);
            new_set.delete(id);
            this.setState({flagSet: new_set});
        } else {
            this.setState({flagSet: this.state.flagSet.add(id)})
        }
        // Update database to reflect change
        if (this.context.state.user) {
            db.collection("student_counselors").doc(this.context.state.selectedCohort).collection("students").doc(id)
            .update({flagged: this.state.flagSet.has(id)});
        }
    }

    // Changes if flag toggled
    flagToggle = () => {
        this.setState({flagToggle: !this.state.flagToggle});
    }

    // Called when clicking out of the student information popup modal, allows exit
    exitModal = () => {
        this.setState({selectedCard: null});
    }

    // Called when filter fields changed by dropdown filter
    // filters: object mapping field to a set of values to be filtered by
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

    // Deleting a specific filter value
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