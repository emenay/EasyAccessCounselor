import React, { Component } from 'react';
import {ReactComponent as Sort_descend} from  '../../assets/essentials_icons/svg/down-arrow.svg';
import {ReactComponent as Sort_ascend} from '../../assets/essentials_icons/svg/up-arrow.svg'; 
import {ReactComponent as Clear_sort} from '../../assets/essentials_icons/svg/multiply.svg';

// A custom column header component for the ag-Grid implementation in
// CaseloadPage.js 
export default class CustomHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ascSort: 'off',
      descSort: 'off',
      noSort: 'off',
    };

    props.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
  }

  componentDidMount() {
    this.onSortChanged();
  }

  render() {
    let menu = null;
    if (this.props.enableMenu) {
      menu = (
        <div
          ref={(menuButton) => {
            this.menuButton = menuButton;
          }}
          className="customHeaderMenuButton"
          onClick={this.onMenuClicked.bind(this)}
        >
          <this.props.menuIcon className='columnMenuSvg'/>
        </div>
      );
    }

    let sort = null;
    if (this.props.enableSorting) {
      sort = (
        <div style={{ display: 'flex' }}>
          <div
            onClick={this.onSortRequested.bind(this, 'asc')}
            onTouchEnd={this.onSortRequested.bind(this, 'asc')}
            className="sortButton"
          >
            <Sort_descend className={`sortDescendSvg ${this.state.ascSort}`}/>
          </div>
          <div
            onClick={this.onSortRequested.bind(this, 'desc')}
            onTouchEnd={this.onSortRequested.bind(this, 'desc')}
            className="sortButton"
          >
            <Sort_ascend className={`sortAscendSvg ${this.state.descSort}`}/>
          </div>
          {/* <div
            onClick={this.onSortRequested.bind(this, '')}
            onTouchEnd={this.onSortRequested.bind(this, '')}
            className="sortButton clear"
          >
            <Clear_sort className={`sortRemoveSvg ${this.state.noSort}`}/>
          </div> */}
        </div>
      );
    }

    return (
      <div className='customColumnHeader'>
        {menu}
        <div className="customHeaderLabel">{this.props.displayName}</div>
        {sort}
      </div>
    );
  }

  onMenuClicked() {
    this.props.showColumnMenu(this.menuButton);
  }

  onSortChanged() {
    this.setState({
      ascSort: this.props.column.isSortAscending() ? 'on' : 'off',
      descSort: this.props.column.isSortDescending() ? 'on' : 'off',
      noSort:
        !this.props.column.isSortAscending() &&
        !this.props.column.isSortDescending()
          ? 'on'
          : 'off',
    });
  }

  onSortRequested(order, event) {
    if(order == 'desc' && this.state.descSort == 'on') {
      order = '';
    } else if (order == 'asc' && this.state.ascSort == 'on') {
      order = '';
    }
    this.props.setSort(order, event.shiftKey);
  }
}