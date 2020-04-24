import React from 'react';
// import ReactDOM from 'react-dom';
import * as data2 from '../data_caseload_management.json';
import '../css/CaseloadPage.css'
import 'bulma/css/bulma.css'

// export function tabs(){
//   return ();
// }


export function GridView(props) {
  var arr = [];
  Object.keys(props.data).forEach(function(key) {
    arr.push(props.data[key]);
  });
  return (
    <div id="grid">
    {arr[0].map(person => <span key={person.id} className="square">
        <div className="card">
            <div className="card-content">
                <p className="title is-4">{person.Name}</p>
                <p className="subtitle is-6">{person.Essay}</p>
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

export function BlockView(props) {
  var arr = [];
  Object.keys(props.data).forEach(function(key) {
    arr.push(props.data[key]);
  });
  return (
    <div id="blockview">
    {arr[0].map(person => <div key={person.id} className="blockview-child">
        <div className="card">
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

export function SpreadsheetView(props) {
  return (
    <div id="spreadsheetview">
    <h1>Spreadsheet View</h1>
    </div>
  )
}

class CaseloadPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      view: <GridView data={data2}/>    
    }
  }

  handleClick = (event) => {
    event.persist()
    let currentComponent = this;

    // switches active state of tabs
    let navNodes = document.getElementById("navigation").childNodes
    navNodes.forEach(e =>{
      if(e.className.includes('is-active'))
      e.classList.remove('is-active')}) 
    event.target.parentElement.classList.add('is-active')
    
    switch(event.target.id){
      case 'grid_view': currentComponent.setState({view: <GridView data={data2}/>})
      break;
      case 'block_view': currentComponent.setState({view: <BlockView data={data2}/>})
      break;
      case 'spreadsheet_view': currentComponent.setState({view: <SpreadsheetView data={data2}/>})
      break;
      default: console.log("here")
    }
  }

    render() {
        return (
        <div>
          <div>
          <div className="tabs is-centered" id="tabs">
            <ul id="navigation">
              <li className="btn is-active" id="gview" onClick={this.handleClick}><a id="grid_view" className="navbar-item tab">Grid View</a></li>
              <li className="btn" id = "bview" onClick={this.handleClick}><a id="block_view" className="navbar-item tab">Block View</a></li>
              <li className= "btn" id = "sview" onClick={this.handleClick}><a id="spreadsheet_view" className="navbar-item tab">Spreadsheet View</a></li>
            </ul>
          </div>
          </div>
          <div id = "render_view">
                {this.state.view}
          </div>
        </div>
        )
    }

}

export default CaseloadPage;