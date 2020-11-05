import React from 'react';
import ReactDOM from 'react-dom';

//import { expectation } from "sinon";
import StripeCheckout from "../views/StripeCheckout";
import { auth } from "../firebase/firebase";

import Enzyme, { shallow, render as render1, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, fireEvent } from '@testing-library/react';
//qimport { createSerializer } from "enzyme-to-json";

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
Enzyme.configure({ adapter: new Adapter() });

const flagged = true;
const exitModal = () => {console.log("Tried to exit")};

var testUid;
function setUid(uid) {
    testUid = uid;
}

auth.signInWithEmailAndPassword("testaccount@gmail.com", "test1234");
auth.onAuthStateChanged(uid => {
    setUid(uid);
});

// Render a React component to the DOM
// const render = (component) => {
//     const root = document.createElement("div");
//     ReactDOM.render(component, root);
//     return getQueriesForElement(root);
// }


test("renders button correctly", () => {
    const { getByText, getByLabelText } = render(<StripeCheckout />); 


    //Use DOM APIs to make assertions
    expect(getByText("Checkout")).not.toBeNull;
})

test("renders correctly", () => {
    // shallow() esentially uses a less complicated DOM
    const wrapper = shallow(
        <StripeCheckout flagged={flagged} exitModal={exitModal} />
    );

    expect(wrapper).toMatchSnapshot();
});

test("renders correctly again", () => {
    const wrapper = render1(
        <StripeCheckout flagged={flagged} exitModal={exitModal} />
    );

    expect(wrapper).toMatchSnapshot();
});

test("allows user to press button", () => {
    const { getByText, getByLabelText } = render(<StripeCheckout />); 

    const input = getByText("Checkout");
    fireEvent.click(input);

    //wrapper.state("").toBe
})