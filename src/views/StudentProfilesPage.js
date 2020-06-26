import React from 'react';
import {GridView} from "../components/dataViews/GridView.js";
import {DropdownSortMenu} from "../components/dataViews/MainDataView.js";
import "../css/CaseloadPage.css";
import data2 from '../data_caseload_management.json';

class StudentDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = ["General Information", "Caseload Management", "College List", "Application Process"];
        this.state = {
            selectedTab: "General Information"
        }
    }

    changeTab = (tab) => {
        this.setState({selectedTab: tab})
    }

    render(){
        let info = this.props.info;
        return <div className="studentdetails-modal" onClick={this.props.exitModal}>
            <div className="studentdetails-background" onClick={(e)=> e.stopPropagation()}>
                <div className="studentdetails-tab-wrapper">
                    {this.tabs.map((name, index)=>{
                        return <div className={"studentdetails-tab" + (this.state.selectedTab === name ? " tab-selected" : "")} onClick={()=>this.changeTab(name)} key={index}>
                            <p className="tab-text">{name}</p>
                        </div>
                    })}
                </div>
                <p className="studentdetails-title">{info.Name}</p>
                <div className="studentdetails-innerbackground"/>
                <div className="studentdetails-content">
                    <p>{info.id}</p>
                </div>
            </div>
        </div>
    }
}

class StudentProfilesPage extends React.Component{
    constructor(props){
        super(props);
        let flagMap = new Map();
        let dataMap = new Map();
        data2.forEach(person=>{
            flagMap.set(person.id, false);
            dataMap.set(person.id, person);
        });
        this.state = {
            selectedCard: null,
            sortField: "Testing",
            sortReverse: false,
            searchString: "",
            flagMap: flagMap,
            dataMap: dataMap,
            flagToggle: false
        }
    }

    // Helper function for sorting
    compare = (a, b) => {
        let comparison = 0;
        if (b[this.state.sortField] > a[this.state.sortField]) {
          comparison = -1;
        } else if (b[this.state.sortField] < a[this.state.sortField]) {
          comparison = 1;
        }
        if (this.state.sortReverse) comparison *= -1;
        return comparison;
    }

    changeSort = (field) => {
        this.setState({sortField: field});
    }

    changeSearchString = (string) => {
        this.setState({searchString: string});
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
        let data = Array.from(this.state.dataMap).map(info => {return info[1]});
        data = this.state.flagToggle ? data.filter(person => {return this.state.flagMap.get(person.id)}) : data;
        if (this.state.searchString !== "") {
            data = data.filter(person=>{
                return this.state.searchString === person.Name.toLowerCase().slice(0, this.state.searchString.length);
            });
        }
        return <div className="profiles-content">
            <div className="profiles-header">
                <button className="flag-toggle" onClick={this.flagToggle}>Toggle Flags</button>
                <DropdownSortMenu changeSort={this.changeSort} />
                <button className="flag-toggle" onClick={this.reverseSortOrder}>Reverse Sort</button>
            </div>
            {this.state.selectedCard && <StudentDetailsModal exitModal={this.exitModal} info={this.state.dataMap.get(this.state.selectedCard)} />}
            <GridView data={data.sort(this.compare)} clickCard={this.clickCard} clickFlag={this.clickFlag} flags={this.state.flagMap}/>
        </div>
    }
}

export default StudentProfilesPage;