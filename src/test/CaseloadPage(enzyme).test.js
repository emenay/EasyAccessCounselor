import React from 'react';
import { expectation } from "sinon";
import CaseloadPage from "../views/CaseloadPage";
import customHeader from '../components/caseloadPage/customHeader.jsx'
import { auth } from "../firebase/firebase";
import Enzyme, { shallow, render, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

const flagged = true;
const exitModal = () => {console.log("Tried to exit")};
const cohort = "L0T6rvBCizlnaXmHLv2m";
const info  = {
    firstName: "Testerman",
    lastName: "Testington",
    goal: "nada"
};

let testUid;
function setUid(uid) {
    testUid = uid;
}

auth.signInWithEmailAndPassword("testaccount@gmail.com", "test1234");
auth.onAuthStateChanged(uid => {
    setUid(uid);
});

test("renders correctly", () => {
    // shallow() esentially uses a less complicated DOM
    const wrapper = shallow(
        <StudentDetailsModal flagged={flagged} exitModal={exitModal} cohort={cohort} info={info} />
    );

    expect(wrapper).toMatchSnapshot();
});

test("renders correctly again", () => {
    const wrapper = render(
        <StudentDetailsModal flagged={flagged} exitModal={exitModal} cohort={cohort} info={info} /> 
    );

    expect(wrapper).toMatchSnapshot();
});