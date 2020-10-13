import React, {useState} from 'react';
import '../css/AccountTypePage.css';
import {UserContext} from '../providers/UserProvider';

import {auth} from '../firebase/firebase';
import {history} from './App';

class AccountTypeComponent extends React.Component {
    static contextType = UserContext;
    constructor(props){
        super(props);
        this.state = ({
        });

        this.content = {
            name: props.content.name,
            type: props.content.type,
            header: props.content.header,
            price: props.content.price,
            desc: props.content.desc,
            list: props.content.list,
            primaryColor: props.content.primaryColor
        }
        
    }

    render() {
        return(
            <div className="typeContainer">
                <div className="typeHeader">
                    <h3>{this.content.header}</h3>
                </div>
                <div className="typeMainBody">
                    <h5>Always</h5>
                    <div className="typeCostContainer">
                    <h1 className="typeCost">{this.content.price}</h1><h4 className="typeMonth">/month</h4>
                    </div>
                    <p className="typeDesc">{this.content.desc}</p>
                    <ul className="typeList">{this.content.list}</ul>
                    <button className="typeButton" onClick={()=>setType(this.content.type)}>Sign-up for {this.content.name}</button>
                </div>
            </div>
        )
    }
}

function setType(type) {
    switch(type) {
        case 'free':
            // TODO: set user type to free
            history.push("/cohortcreation");
            if (document.getElementsByClassName("sidenav-container").length === 1) {
                document.getElementsByClassName("sidenav-container")[0].style.display = "initial";
            }

            if (document.getElementsByClassName("header-select").length === 1) {
                document.getElementsByClassName("header-select")[0].style.display = "initial";
            }
            break;
        case 'counselor':
            // TODO: set user type to counselor
            history.push("/PaymentPortal");
            break;
        case 'school':
            // TODO: set user type to schoo
            history.push("/PaymentPortal");
            break;
        default:
            // TODO: Figure out what should go here
            break;
    }
}

function AccountTypePage() {

    if (document.getElementsByClassName("sidenav-container").length === 1) {
        document.getElementsByClassName("sidenav-container")[0].style.display = "none";
    }
    
    if (document.getElementsByClassName("header-select").length === 1) {
        document.getElementsByClassName("header-select")[0].style.display = "none";
    }

    const freeProps = {
        name: "Free Version",
        type: "free",
        header: "Free Forever",
        price: 0,
        desc: "Save time in your caseload management, organize cohorts",
        list: ["Cohort Creation", "Caseload Management", "Space Holder"],
        primaryColor: [55, 55, 55] // set this to grey this is just a place holder
    }

    const counselorProps = {
        name: "Counselor Plan",
        type: "counselor",
        header: "For Counselors",
        price: 100,
        desc: "Save time and improve your ability to help your students achieve their dreams",
        list: [
            "Premium Cohort Creation",
            "Premium Caseload Management",
            "Space Holder...",
            "Space Holder 2...",
        ],
        primaryColor: [0, 0, 255] // Should be Easy Access blue
    }

    const schoolProps = {
        name: "School Plan",
        type: "school",
        header: "For Schools",
        price: 250,
        desc: "Teamp up on caseload management by granting access to all of your cohorts across your team",
        list: [
            "Multiple Cohort Creation",
            "Team Based Caseload Management",
            "Space Holder...",
            "Space Holder 2..."
        ],
        primaryColor: [255, 100, 0] // Should be orange
    }

    return(
        // login header
        // some kind of body
        <div className="accountTypeOverlay">
            <AccountTypeComponent content = {freeProps}></AccountTypeComponent>
            <AccountTypeComponent content = {counselorProps}></AccountTypeComponent>
            <AccountTypeComponent content = {schoolProps}></AccountTypeComponent>
        </div>
    )
}

export default AccountTypePage;