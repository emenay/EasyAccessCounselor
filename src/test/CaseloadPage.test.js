import React, { useContext, useState, createContext } from 'react';
import { expectation } from "sinon";
import CaseloadPage from "../views/CaseloadPage";
import UserProvider, { UserContext } from '../providers/UserProvider';
import { DownloadPopup } from "../views/CaseloadPage"
import customHeader from '../components/caseloadPage/customHeader.jsx'
import { auth } from "../firebase/firebase";
import firebase from 'firebase/app'
import Enzyme, { shallow, render, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";

/* TODO:
    (1) Write a test to make sure that the download popup renders 
    (2) Write a test to make sure that the download popup columns match those in the grid
    (3) Write a test to make sure that the header component renders correctly 
    (?) Test to make sure that newly appended column available in the download popup
*/

Enzyme.configure({ adapter: new Adapter() });
// Sign in firebase user for testing CaseloadPage functionality 
let userState;
function setUserContext(user) {
    userState = { user: user, selectedCohort: null, cohorts: [] };
    console.log('Test User Context Set');
}

beforeAll(async () => {
    jest.setTimeout(10000);
    await auth.signInWithEmailAndPassword("ian.dershem@gmail.com", "kenan116");
    await auth.onAuthStateChanged((user) => {
        setUserContext(user);
    });
});

// Test Shallow Render of Caseload Page
// TODO: Ensure that CaseloadPage actually has access to UserProvider data
test("CaseloadPage shallow render correct", () => {
    // user 
    // shallow() esentially uses a less complicated DOM
    const wrapper = shallow (
        <UserContext.Provider value={{state:userState}}>
            <CaseloadPage/>
        </UserContext.Provider>  
    );
    expect(wrapper).toMatchSnapshot();
});