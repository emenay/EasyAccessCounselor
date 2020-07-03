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

class StudentProfilesPage extends React.Component{
    constructor(props){
        super(props);
        this.sortFields = [
            {name: "firstName", displayName: "First Name", smitem: ["A to Z", "Z to A"]},
            {name: "lastName", displayName: "Last Name", smitem: ["A to Z", "Z to A"]},
            {name: "SAT", displayName: "SAT", smitem: ["Low to High", "High to Low"]}
        ]
        this.state = {
            data: [],
            selectedCard: null,
            sortField: "uid",
            sortReverse: false,
            searchString: "",
            flagMap: new Map(),
            dataMap: new Map(),
            flagToggle: false
        }
    }

    componentDidMount() {
        db.collection("student_counselor").doc("Vt4H50TQklsch0mJNGBM").collection("students")
        .get()
        .then(querySnapshot => {
        // array of student objects
            return querySnapshot.docs.map(doc => doc.data());
         
        })
        .then(data => {
            let flagMap = new Map();
            let dataMap = new Map();
            data.forEach(person=>{
                flagMap.set(person.uid, false);
                dataMap.set(person.uid, person);
            });
            this.setState({
                data: data,
                flagMap: flagMap,
                dataMap: dataMap
            });
        })
        .catch(error => {console.log(error)});
    }

    // Helper function for sorting
    compare = (a, b) => {
        let comparison;
        let aVal = a[this.state.sortField];
        let bVal = b[this.state.sortField];
        if (!aVal || !bVal) {
            if (!aVal && bVal){
                comparison = -1;
            } else if (!bVal && aVal){
                comparison = 1;
            }
        } else {
            if (bVal > aVal) {
                comparison = 1;
            } else if (aVal > bVal) {
                comparison = -1;
            }
        }
        console.log(comparison);

        if (this.state.sortReverse) comparison *= -1;
        return comparison;
    }

    changeSort = (field, isReverse) => {
        this.setState({sortField: field, sortReverse: isReverse});
    }

    changeSearchString = (event) => {
        this.setState({searchString: event.target.value});
    }

    reverseSortOrder = () => {
        this.setState({sortReverse: !this.state.sortReverse});
    }

    clickCard = (id) => {
        this.setState({selectedCard: id});
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
        console.log(this.state.sortField, this.state.sortReverse);
        let data = this.state.data;
        data = this.state.flagToggle ? data.filter(person => {return this.state.flagMap.get(person.id)}) : data;
        if (this.state.searchString !== "") {
            data = data.filter(person=>{
                if ((person.firstName.toLowerCase().slice(0, this.state.searchString.length) === this.state.searchString.toLowerCase()) || (person.lastName.toLowerCase().slice(0, this.state.searchString.length) === this.state.searchString.toLowerCase())){
                    return true;
                }
                return false;
            });
        }
        data = data.slice().sort(this.compare);
        return <div className="profiles-content">
            <div className="profiles-header">
                <input type="text" id="myInput" onKeyUp={this.changeSearchString} placeholder="Search for Students.." />
                <button className="flag-button" onClick={this.flagToggle}><img className="flag-image" src={this.state.flagToggle? orange_flag : black_flag} /></button>
                <DropdownSortMenu fields={this.sortFields} changeEvent={this.changeSort} icon={this.state.sortReverse ? sorted_ascend : sorted_descend}/>
                <button className="flag-toggle" onClick={this.reverseSortOrder}>Reverse Sort</button>
            </div>
            {this.state.selectedCard && <StudentDetailsModal exitModal={this.exitModal} info={this.state.dataMap.get(this.state.selectedCard)} />}
            <GridView data={data} clickCard={this.clickCard} clickFlag={this.clickFlag} flags={this.state.flagMap}/>
        </div>
    }
}

export default StudentProfilesPage;