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
    (*) Update userState with a selectedCohort, and cohorts to test full CaseloadPage functionality
    (1) Write a test to make sure that the download popup renders 
    (2) Write a test to make sure that the download popup columns match those in the grid
    (3) Write a test to make sure that the header component renders correctly 
    (?) Test to make sure that newly appended column available in the download popup
*/

Enzyme.configure({ adapter: new Adapter() });
// Sign in firebase user for testing CaseloadPage functionality 
let userState;
let user;
function setUserContext(user) {
    user = user;
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

test("CaseloadPage full DOM render correct", () => {
    // render best for this test because lifecycle/children aren't being tested here 
    const wrapper = render (
        <UserContext.Provider value={{state:userState}}>
            <CaseloadPage/>
        </UserContext.Provider>  
    );
    expect(wrapper).toMatchSnapshot();
});

test("DownloadPopup renders on download button click", () => {
    // mount best for this test because lifecycle/children (download popup) is being tested
    const caseload = mount (
        <UserContext.Provider value={{state:userState}}>
            <CaseloadPage/>
        </UserContext.Provider>  
    );
    expect(caseload).toMatchSnapshot();
    const download = caseload.find('.right_icon_button').simulate('click');
    console.log(download.debug());
    wrapper.unmount();
});