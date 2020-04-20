import React from 'react';
import * as data2 from '../data_caseload_management.json';
import '../css/CaseloadPage.css'
import 'bulma/css/bulma.css'
import { db } from '../firebase/firebase';
import Spreadsheet from "react-spreadsheet";

const RangeView = ({ cell, getValue }) => (
  <input
    type="range"
    value={getValue({ data: cell })}
    disabled
    style={{ pointerEvents: "none" }}
  />
);
 
const RangeEdit = ({ getValue, cell, onChange }) => (
  <input
    type="range"
    onChange={e => {
      onChange({ ...cell, value: e.target.value });
    }}
    value={getValue({ data: cell }) || 0}
    autoFocus
  />
);
 
const data = [
  [{ value: "Flavors" }],
  [({ value: "Vanilla" }, { value: "Chocolate" })],
  [{ value: "Strawberry" }, { value: "Cookies" }],
  [
    { value: "How much do you like ice cream?" },
    { value: 100, DataViewer: RangeView, DataEditor: RangeEdit }
  ]
];

class CaseloadPage extends React.Component {
    render() {
        var arr = [];
        Object.keys(data2).forEach(function(key) {
            arr.push(data2[key]);
        });
        console.log(arr)
        return (
        <div>
            <div id="root">
                <div id="grid">
                {arr[0].map(person => <div key={person.id} className="square">
                    <div className="card">
                        <div className="card-content">
                            <p className="title is-4">{person.Name}</p>
                            <p className="subtitle is-6">{person.Essay}</p>
                            <div className="content">
                                <p>{person["Early Apps"]}</p>
                            </div>
                        </div>
                    </div>
                    </div>)}
                </div>
            </div>
          <div>
            <Spreadsheet data={data} />
          </div>
        </div>
        )
    }

}

export default CaseloadPage;