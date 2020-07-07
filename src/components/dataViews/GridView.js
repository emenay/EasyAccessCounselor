import React from 'react';
import {getBGColor} from './getBGColor';
import blue_flag from "../../assets/blue_flag.png";
import black_flag from "../../assets/black_flag.png";
import orange_flag from "../../assets/orange_flag.png";

function generateField(name, dataField) {
  if (typeof(dataField) === "undefined") {
    return name + "Not Available!"; 
    
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
                <p className="scard-detail">{generateField("", person.info)}</p>
                <p className="scard-detail">{generateField("GPA: ", person.gpa)}</p>
                <p className="scard-detail">{generateField("SAT: ", person.SAT)}</p>
                <div className="flag-wrapper">
                  <p className="scard-detail">{generateField("Major: ", person.major)}</p>
                  <img src={props.flags.get(person.uid)? orange_flag : black_flag} onClick={(e)=>{props.clickFlag(person.uid); e.stopPropagation();}} className="flag" alt="Flag"/>
                </div>
              </div>
          </div>
        )}
      </div>
    )
  }