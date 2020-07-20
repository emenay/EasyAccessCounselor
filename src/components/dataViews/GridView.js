import React from 'react';
import unflagged from '../../assets/unflagged.png';
import orange_flag from "../../assets/orange_flag.png";

function generateField(name, dataField) {
  if (typeof(dataField) === "undefined") {
    return name + "Not Available"; 
    
  }
  return name + dataField;
  
}

export function GridView(props) {
    return (
      <div id="grid">
        {props.data.map(person =>
          <div className="card" key={person.uid} onClick={()=>props.clickCard(person)}>
              <div className="scard-content">
                <p className="card-title scard-detail">{person.firstName + " " + person.lastName}</p>
                <p className="scard-detail">{generateField("", person.schools)}</p>
                <p className="scard-detail">{generateField("Major: ", person.major)}</p>
                <p className="scard-detail">{generateField("GPA: ", person.gpa)}</p>
                <p className="scard-detail">{generateField("SAT: ", person.sat)}</p>
                <p className="scard-detail">{generateField("ACT: ", person.act)}</p>
                <img src={props.flags.has(person.uid)? orange_flag : unflagged} onClick={(e)=>{props.clickFlag(person.uid); e.stopPropagation();}} className="flag" alt="Flag"/>
              </div>
          </div>
        )}
      </div>
    )
  }