import React from 'react';
import {getBGColor} from './getBGColor';
import blue_flag from "../../assets/blue_flag.png";
import black_flag from "../../assets/black_flag.png";
import orange_flag from "../../assets/orange_flag.png";

export function GridView(props) {
    return (
      <div id="grid">
        {props.data.map(person =>
          <div className="card" key={person.id} onClick={()=>props.clickCard(person.id)}>
              <div className="scard-content">
                <p className="card-title scard-detail">{person.Name}</p>
                <p className="scard-detail">College Info Not Available!</p>
                <p className="scard-detail">GPA: Not Available!</p>
                <p className="scard-detail">{"SAT: " + person["Testing"]}</p>
                <div className="flag-wrapper">
                  <p className="scard-detail">Major: Not Available!</p>
                  <img src={props.flags.get(person.id)? orange_flag : black_flag} onClick={(e)=>{props.clickFlag(person.id); e.stopPropagation();}} className="flag" alt="Flag"/>
                </div>
              </div>
          </div>
        )}
      </div>
    )
  }