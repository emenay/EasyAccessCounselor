import React from 'react';
import {getBGColor} from './getBGColor';

export function GridView(props) {
    return (
      <div id="grid">
        {props.data.map(person =>
          <div className="card" key={person.id} onClick={()=>props.clickCard(person.Name)}>
              <div className="card-content">
                <p className="card-title">{person.Name}</p>
                <p>College Info Not Available!</p>
                <p>GPA: Not Available!</p>
                <p>{"SAT: " + person["Testing"]}</p>
                <p>Major: Not Available!</p>
              </div>
          </div>
        )}
      </div>
    )
  }