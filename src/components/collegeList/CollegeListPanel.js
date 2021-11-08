import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Switch from '@mui/material/Switch';

import { Table } from 'reactstrap';
import Classification_table from './Classification_table';
import Search_college from './Search_college';

export default function CollegeListPanel(props) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let affordabilityInfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay"];
    let fitInfo = ["Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    let to_delete=[2.5, '1 out of 200', 1000, 23, 2040, "Mismatch", 27701]
    let to_delete2=[2.5, 1, 1000, 23, 2040, "Mismatch", 27701]
    var dbinfo = ["gpa", "classRank", "sat", "act", "efc", "payMismatch"];
    var dbinfo2 = ["major1", "major2", "distancefromHome", "region", "collegeSize", "collegeDiversity", "collegeType", "religion", "rotc", "athletics"];

    return (<div>
        <Table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Counselor</th>
            <th><button>sync</button></th>
            <th>Student</th>
          </tr>
          <br/>
          <br/>
          <tr>
            <th>Affordabiity&Selectivity</th>
            <th></th>
            <th><button>check all</button></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {affordabilityInfo.map((ele, idx)=>(<tr>
            <th scope="row">{ele}</th>
            <td>{to_delete[idx]}</td>
            <td><Switch {...label} defaultChecked /></td>
            <td>{to_delete2[idx]}</td>
          </tr>))}
        </tbody>
        <thead><br/><br/>
        <tr>
            <th>Fit Information</th>
            <th></th>
            <th><button>check all</button></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          {fitInfo.map(ele=>(<tr>
            <th scope="row">{ele}</th>
            <td>to fill</td>
            <td><Switch {...label} defaultChecked /></td>
            <td>to fill</td>
          </tr>))}
        </tbody>
      </Table>
      <Classification_table/>
      <Search_college/>
    </div>);
}
