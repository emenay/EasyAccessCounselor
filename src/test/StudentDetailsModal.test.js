import { ExpansionPanelActions } from '@material-ui/core';
import React from 'react';
import StudentDetailsModal from "../components/StudentDetailsModal";
import { auth } from "../firebase/firebase";
import Enzyme, { shallow, render, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import { createSerializer } from "enzyme-to-json";
// import sinon from "sinon";
// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
// sinon.expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Define globals to cut down on imports in test files
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';

// This is supposed to set the default serializer for Jest to "enzyme-to-json"
// should just make jest output a little easier to read
// expectation.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// Need a special adapter for the version of React we're on (16) for Enzyme and
// we're setting that here
// Enzyme.configure({ adapter: new Adapter() });

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

console.log("This is just a placeholder");

// test("Dummy test", () => {
//     let x = 2;
//     expect(x).toBe(2);
// });

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

test("formats the general information tab correctly", () => {
    const wrapper = mount(
        <StudentDetailsModal flagged={flagged} exitModal={exitModal} cohort={cohort} info={info} />
    )

    let divArr = wrapper.find('div.genInfoRow');
    if (Object.keys(divArr).length !== 0) {
        expect(divArr).toHaveLength(2);
    } else {
        expect("divArr was null").toBe("divArr should not be null");
    }
});