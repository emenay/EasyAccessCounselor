import React from 'react';
import App from '../views/App';
/*
- shallow() essentially uses a less complicated DOM
- render() returns the HTML results
- mount() goes through the whole DOM tree to trigger events
*/
import Enzyme, { shallow, render, mount} from "enzyme";
import { createSerializer } from "enzyme-to-json";
import sinon, { expectation } from "sinon";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';

// This is supposed to set the default serializer for Jest to "enzyme-to-json"
// should just make jest output a little easier to read
expectation.addSnapshotSerrializer(createSerializer({ mode: "deep" }));

// Need a special adapter for the version of React we're on (16) for Enzyme and
// we're setting that here
Enzyme.configure({ adapter: new Adapter() });


// Just setting some variables we'll be using a lot to be globals so we don't
// have to import them every time
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;