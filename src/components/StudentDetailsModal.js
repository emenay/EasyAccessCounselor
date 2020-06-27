import React from 'react';

class GeneralInformationPanel extends React.Component {
    render() {
        let info = this.props.info;
        return <div className="geninfo-panel">
            <div className="geninfo-row1">
                <div className="geninfo-col1">
                    <p><span>Date of Birth: </span>--</p>
                    <p><span>Ethnicity: </span>--</p>
                    <p><span>Gender: </span>--</p>
                    <p><span>Race </span>--</p>
                    <p><span>GPA: </span>--</p>
                    <p><span>Class Rank: </span>--</p>
                    <p><span>SAT Score: </span>{info.Testing}</p>
                    <p><span>ACT Score: </span>--</p>
                </div>
                <div className="geninfo-col2">
                    <p><span>Parent Email: </span>goodparent@gmail.com</p>
                    <p><span>Parent Email 2: </span>--</p>
                    <p><span>Parent Phone: </span>--</p>
                    <p><span>Parent Phone 2: </span>--</p>
                    <p><span>Student Email: </span>goodstudent@gmail.com</p>
                    <p><span>Student Phone: </span>--</p>
                </div>
                <div className="geninfo-col3">
                    <img className="studentdetails-avatar" alt="avatar icon" src=""/>
                    <p><span>Student ID: </span>{info.id}</p>
                </div>
            </div>
            <p><span>Counselor Notes: </span>{info["Latest Note"]}</p>
        </div>
    }
}

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

    whichPanel = (tab) => {
        switch(tab){
            case 'General Information':
                return <GeneralInformationPanel info={this.props.info}/>
            default:
                return <p>Hello world</p>
        }
    }

    render(){
        return <div className="studentdetails-modal" onClick={this.props.exitModal}>
            <div className="studentdetails-background" onClick={(e)=> e.stopPropagation()}>
                {this.tabs.map((name, index)=>{
                    return <div style={{left: (index * 25.06666)+"%"}} className={"studentdetails-tab" + (this.state.selectedTab === name ? " tab-selected" : "")} onClick={()=>this.changeTab(name)} key={index}>
                        <p className="tab-text">{name}</p>
                    </div>
                })}
                <p className="studentdetails-title">{this.props.info.Name}</p>
                <div className="studentdetails-innerbackground"/>
                <div className="studentdetails-content">
                    {this.whichPanel(this.state.selectedTab)}
                </div>
            </div>
        </div>
    }
}

export default StudentDetailsModal;