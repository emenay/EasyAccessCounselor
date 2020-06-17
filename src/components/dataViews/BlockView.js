import React from 'react';
import {getBGColor} from './getBGColor';

export function BlockView(props) {
    return (
      <div id="blockview">
        {props.data.default.map(person => <div key={person.id} className="blockview-child">
          <div className="card" style={getBGColor(person)}>
            <div className="card-content">
              <p className="title is-4">{person.Name}</p>
              <p className="subtitle is-6">{person.Essay}</p>
              <div className="content">
                <p>{person["Tasks"]}</p>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    )
  }