import React from 'react';
import {getBGColor} from './getBGColor';

export function GridView(props) {
    return (
      <div id="grid">
        {props.data.default.map(person => <span key={person.id} className="square">
          <div className="card" style={getBGColor(person)}>
            <div className="card-content">
              <p className="title is-4">{person.Name}</p>
              <p className="subtitle is-6">{person.Results}</p>
              <div className="content">
                <p>{person["Early Apps"]}</p>
              </div>
            </div>
          </div>
        </span>
        )}
      </div>
    )
  }