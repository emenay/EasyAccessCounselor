import React from 'react';
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
  state = {
      data : null,
  }

  async componentDidMount() {
      let doc = await db.collection("NeedMet").doc("Adrian College").get();
      this.setState({data: doc.data()})
  }
  
    render() {
        return (
          <div>
            <Spreadsheet data={data} />
          </div>
        );
    }
}

export default CaseloadPage;