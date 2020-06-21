import React from 'react';
import '../../css/CaseloadPage.css';
import 'bulma/css/bulma.css';

// -- START Sort Menu 
class DropdownSortMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          collapsed: true,
          sort: this.props.sortFields[0]
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
    }
  
    handleToggle = (event) => {
        this.setState({ collapsed: !this.state.collapsed });
    }
  
    handleBlur = (event) => {
      this.setState({ collapsed: true });
    }
  
    changeSelected(sortName){
      this.props.changeSort(sortName);
      this.setState({sort: sortName});
    }
  
    render() {
        return(
            <div className={"dropdown" + (this.state.collapsed ? "" : " is-active")} tabIndex="0" onBlur={this.handleBlur}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.handleToggle}>
        <span id="sort-status">{"Sort By: " + this.state.sort}</span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content" id="sort-options">
                      {this.props.sortFields.map(field=>{
                        return <a className="dropdown-item" onMouseDown={()=>this.changeSelected(field)}>{field}</a>
                      })}
                    </div>
                </div>
            </div>
        );
    }
  }

export default DropdownSortMenu;
  