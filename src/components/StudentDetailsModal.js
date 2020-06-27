import React from 'react';

class GeneralInformationPanel extends React.Component {
    render() {
        return <div className="geninfo-panel">
            General Panel
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
                return <GeneralInformationPanel />
            default:
                return <p>Hello world</p>
        }
    }

    render(){
        let info = this.props.info;
        return <div className="studentdetails-modal" onClick={this.props.exitModal}>
            <div className="studentdetails-background" onClick={(e)=> e.stopPropagation()}>
                {this.tabs.map((name, index)=>{
                    return <div style={{left: (index * 25.02666)+"%"}} className={"studentdetails-tab" + (this.state.selectedTab === name ? " tab-selected" : "")} onClick={()=>this.changeTab(name)} key={index}>
                        <p className="tab-text">{name}</p>
                    </div>
                })}
                <p className="studentdetails-title">{info.Name}</p>
                <div className="studentdetails-innerbackground"/>
                <div className="studentdetails-content">
                    {this.whichPanel(this.state.selectedTab)}
                </div>
            </div>
        </div>
    }
}

export default StudentDetailsModal;