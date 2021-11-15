import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


import { Table } from 'reactstrap';
import Classification_table from './Classification_table';
import Search_college from './Search_college';
import Search_autocomplete from './Search_autocomplete';

export default function CollegeListPanel(props) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let affordabilityInfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay"];
    let fitInfo = ["Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    let to_delete=[2.5, '1 out of 200', 1000, 23, 2040, "Mismatch", 27701]
    let to_delete2=[2.5, 1, 1000, 23, 2040, "Mismatch", 27701]
    var dbinfo = ["gpa", "classRank", "sat", "act", "efc", "payMismatch"];
    var dbinfo2 = ["major1", "major2", "distancefromHome", "region", "collegeSize", "collegeDiversity", "collegeType", "religion", "rotc", "athletics"];
    const [track_afford, set_track_afford] = useState(new Array(affordabilityInfo.length).fill(true))
    const [track_fit, set_track_fit] = useState(new Array(fitInfo.length).fill(true))
    const toggle_afford=(idx)=>{return(e)=>{let temp=[...track_afford];temp[idx]=e.target.checked; set_track_afford([...temp])}}
    const toggle_fit=(idx)=>{return()=>{track_fit[idx]=!track_fit[idx]}}
    return (<div>
        <Table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Counselor</th>
            <th>
              <Button variant="outlined" size="medium">
                Sync
              </Button>
            </th>
            <th>Student</th>
          </tr>
          
          <tr>
            <th>Affordabiity&Selectivity</th>
            <th></th>
            <th>
              <Button variant="outlined" size="small" onClick={()=>{
                if (track_afford.reduce((first, second)=>first&&second, true)){
                  let temp=track_afford.map(val=>false)
                  set_track_afford([...temp])
                } else {
                  let temp=track_afford.map(val=>true)
                  set_track_afford([...temp])
                }
                }}>
                select/unselect
              </Button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {affordabilityInfo.map((ele, idx)=>(<tr key={'aff'+idx}>
            <th scope="row">{ele}</th>
            <td>{to_delete[idx]}</td>
            <td><Switch {...label} onChange={toggle_afford(idx)} checked={track_afford[idx]} /></td>
            <td>{to_delete2[idx]}</td>
          </tr>))}
        </tbody>
        <thead><br/><br/>
        <tr>
            <th>Fit Information</th>
            <th></th>
            <th>
              <Button variant="outlined" size="small" onClick={()=>{
                if (track_fit.reduce((first, second)=>first&&second, true)){
                  let temp=track_fit.map(val=>false)
                  set_track_fit([...temp])
                } else {
                  let temp=track_fit.map(val=>true)
                  set_track_fit([...temp])
                }
                }}>
                select/unselect
              </Button>
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          {fitInfo.map((ele, idx)=>(<tr key={'fit'+idx}>
            <th scope="row">{ele}</th>
            <td>to fill</td>
            <td><Switch {...label} onChange={toggle_fit(idx)} checked={track_fit[idx]} /></td>
            <td>to fill</td>
          </tr>))}
        </tbody>
      </Table>
      {<Classification_table/>}
      {<Search_college/>}
      {<Search_autocomplete/>}
    </div>);
}
