import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import {DropdownSortMenu} from "../components/dataViews/MainDataView.js";
import "../css/StudentProfilesPage.css";
import "../css/searchBar.css";
import StudentDetailsModal from '../components/StudentDetailsModal.js';
import black_flag from "../assets/black_flag.png";
import orange_flag from "../assets/orange_flag.png";
import {db} from "../firebase/firebase";
import filter_icon from "../assets/filter_icon.png";
import sorted_ascend from "../assets/sorted_ascend.png";
import sorted_descend from "../assets/sorted_descend.png";
import unsorted_icon from "../assets/unsorted_icon.png";
import {UserContext} from '../providers/UserProvider';

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
        this.state = {
            data: [],
            selectedCard: null,
            sortField: "uid",
            sortReverse: false,
            searchString: "",
            flagMap: new Map(),
            flagToggle: false,
            sortIcon: unsorted_icon,
            lastCohort: null
        }
    }

    getCohortData = () => {
        if (this.context.state && this.state.lastCohort !== this.context.state.selectedCohort){
            console.log("getting cohor data");
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
                console.log(data);
                console.log(this.context.state.selectedCohort);
                let flagMap = new Map();
                data.forEach(person=>{
                    flagMap.set(person.uid, false);
                });
                this.setState({
                    data: data,
                    flagMap: flagMap,
                    lastCohort: this.context.state.selectedCohort
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
        this.setState({flagMap: this.state.flagMap.set(id, !this.state.flagMap.get(id))});
    }

    flagToggle = () => {
        this.setState({flagToggle: !this.state.flagToggle});
    }

    exitModal = () => {
        this.setState({selectedCard: null});
    }

    render(){
        let data = this.state.data;
        data = this.state.flagToggle ? data.filter(person => {return this.state.flagMap.get(person.uid)}) : data;
        if (this.state.searchString !== "") {
            data = data.filter(person=>{
                if ((person.firstName && person.firstName.toLowerCase().slice(0, this.state.searchString.length) === this.state.searchString.toLowerCase()) || (person.lastName && person.lastName.toLowerCase().slice(0, this.state.searchString.length) === this.state.searchString.toLowerCase())){
                    return true;
                }
                return false;
            });
        }
  
        return <div className="profiles-content">
            <div className="profiles-header">
                <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search for Students.." />
                <button className="flag-button" onClick={this.flagToggle}><img className="flag-image" alt="Select flagged fields icon" src={this.state.flagToggle? orange_flag : black_flag} /></button>
                <DropdownSortMenu fields={this.sortFields} changeEvent={this.changeSort} icon={this.state.sortIcon}/>
            </div>
            {this.state.selectedCard && <StudentDetailsModal exitModal={this.exitModal} info={this.state.selectedCard} />}
            <GridView data={data} clickCard={this.clickCard} clickFlag={this.clickFlag} flags={this.state.flagMap}/>
        </div>
    }
}

export default StudentProfilesPage;