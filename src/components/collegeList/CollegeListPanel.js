import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Switch from '@mui/material/Switch';

import { Table } from 'reactstrap';

export default function CollegeListPanel(props) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let affordabilityInfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay"];
    let fitInfo = ["Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    let allinfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay","Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    var dbinfo = ["gpa", "classRank", "sat", "act", "efc", "payMismatch"];
    var dbinfo2 = ["major1", "major2", "distancefromHome", "region", "collegeSize", "collegeDiversity", "collegeType", "religion", "rotc", "athletics"];

    return (<div>
        <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@<Switch {...label} defaultChecked /></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@<Switch {...label} defaultChecked /></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td><Switch {...label} defaultChecked /></td>
          </tr>
        </tbody>
      </Table>
    </div>);
}
