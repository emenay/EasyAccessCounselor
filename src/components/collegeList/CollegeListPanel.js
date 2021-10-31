import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from  'react-bootstrap/Button'
import edit_symbol from '../../assets/essentials_icons/svg/edit.svg';

export default function CollegeListPanel(props) {

    let affordabilityInfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay"];
    let fitInfo = ["Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    let allinfo = ["GPA", "Class Rank", "SAT", "ACT", "EFC", "Ability to Pay","Major 1", "Major 2", "Distance from Home", "Region", "College Size", "College Diversity", "College Type", "Religion", "Military/ROTC", "Athletics"];
    var dbinfo = ["gpa", "classRank", "sat", "act", "efc", "payMismatch"];
    var dbinfo2 = ["major1", "major2", "distancefromHome", "region", "collegeSize", "collegeDiversity", "collegeType", "religion", "rotc", "athletics"];

    let affordabilityView = [];
    for (let i = 0; i < dbinfo.length; i++) {
        affordabilityView.push(
        <InputFieldElement
            name = {affordabilityInfo[i]} 
            editing={"editing"}  
            info={"info[dbinfo[i]]"} 
            studentinfo = {"studentinfo[dbinfo[i]]"}
            dbField={"[dbinfo[i]]"}
            updateValue={"updateValue"}
            id = {"props.info.uid"}
            />    
    )}
   
    let collegeFitView = [];
    for (let i = 0; i < dbinfo2.length; i++) {
        collegeFitView.push(
            <InputFieldElement
                name = {fitInfo[i]} 
                editing={"editing"}  
                info={"info[dbinfo2[i]]"} 
                studentinfo = {"studentinfo[dbinfo2[i]]"}
                dbField={"dbinfo2[i]"}
                updateValue={"updateValue"}
                id = {"props.info.uid"}
                />
        )
    }
    return (
               <table class = "colListTable" style = {{width: "100%"}}>
                    <tbody>
                        <tr>
                        <th>
                            <button 
                                style = {{width: "50px", height: "50px", border: "None", backgroundColor: "transparent"}}
                                data-tip="Customize what fields are shown" 
                                onClick={()=> {props.setEdit(true)}}>
                                <img src={edit_symbol} alt="edit"/>
                            </button>
                        </th>
                        <th><b>Information</b></th>
                        <th><b>Counselor</b><button class = "colListButton mediumbutton">Sync</button></th> 
                        <th></th>
                        <th></th>
                        <th><b>Student</b></th>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                        <th></th>
                        <th>Affordabiity and Selectivity Info</th> 
                        <th></th>
                        <th></th>
                        <th></th>
                        </tr>
                    </tbody>
                    {affordabilityView}
                    <tbody>
                        <tr>
                        <th></th>
                        <th>Fit Information</th>
                    
                        <td></td> 
                        <td><input type = "checkbox"/></td>
                        <td></td>
                        </tr>
                    </tbody>
                    {collegeFitView}      
                </table>
                        );
}

function InputFieldElement({editing, dbField, info, studentinfo, name, field}) {
    
    return (
        <tbody>
        <tr className="inputFieldElement" id = {dbField}>
        <td>
            {/* If the user is in edit mode, display button to remove this field element */}
            </td>
            <td>
            {name}
            </td>
            
            <td>
        <p key={info}><span>{field} </span>
        {editing===true 
                ? <input type="text" defaultValue={info} onChange={(e) => {}} />:
                
                info === undefined || info === ""
                    ? <text>{info }</text> :
                <text class = "fieldElement">{info}</text>}

            </p>  
            </td>  
            <td><input type = "checkbox"/></td>
            <td></td>
            <td>{studentinfo === undefined || studentinfo === ""
                    ? <text>{studentinfo }</text> : <text class = "fieldElement" >{studentinfo}</text>}
            </td>
        
            </tr>
        </tbody>
    )
}