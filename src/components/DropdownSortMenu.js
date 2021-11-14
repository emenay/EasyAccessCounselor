import React from 'react'
import '../css/StudentProfilesPage.css'
import 'bulma/css/bulma.css'
/*
    Props:
    fields: Array of sort objects formatted:  {name: "sat", displayName: "SAT", smitem: ["Low to High", "High to Low"]},
        name = field name
        displayName = name to be displayed
        smitem = display for smallest to largest and largest to smallest
    changeEvent: callback for event change, called with field name and boolean isReverse
    icon: icon to be displayed

    fields={this.sortFields} changeEvent={this.changeSort} icon={this.state.sortIcon}

*/
class DropdownSortMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      openedSubmenu: null,
      smPosition: 0,
      selected: null,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.changeSelected = this.changeSelected.bind(this)
  }

  handleToggle = (event) => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  handleBlur = (event) => {
    this.setState({ collapsed: true, openedSubmenu: null })
  }

  changeSubmenu = (index, name) => {
    this.setState({ openedSubmenu: name, smPosition: index })
  }

  changeSelected(selectedName, isReverse) {
    this.props.changeEvent(selectedName, isReverse)
    this.setState({ selected: selectedName })
  }

  displaySubmenu = () => {
    var selected = this.state.openedSubmenu
    return (
      <div
        className="dropdown-submenu"
        style={{ top: (this.state.smPosition + 1) * 32.5 + 12 + 'px' }}
        role="menu">
        <a
          className="dropdown-item"
          onMouseDown={() => this.changeSelected(selected.name, false)}>
          {selected.smitem[0]}
        </a>
        <a
          className="dropdown-item"
          onMouseDown={() => this.changeSelected(selected.name, true)}>
          {selected.smitem[1]}
        </a>
      </div>
    )
  }

  render() {
    return (
      <div
        className={'dropdown' + (this.state.collapsed ? '' : ' is-active')}
        tabIndex="0"
        onBlur={this.handleBlur}>
        <div className="dropdown-trigger">
          <button
            className="dropdown-btn"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={this.handleToggle}>
            <img
              className="filter-icon"
              src={this.props.icon}
              alt="sort icon"
            />
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content" id="sort-options">
            {this.props.fields.map((field, index) => {
              return (
                <a
                  key={index}
                  className={
                    'dropdown-item' +
                    (this.state.selected === field.name ? ' is-active' : '')
                  }
                  onMouseOver={() => this.changeSubmenu(index, field)}>
                  {field.displayName + '   \u25B7'}
                </a>
              )
            })}
          </div>
        </div>
        {this.state.openedSubmenu !== null && this.displaySubmenu()}
      </div>
    )
  }
}

export default DropdownSortMenu
