import React from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemText, Slide, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import '../css/components.css';

import { signOut } from '../firebase/firebase';
import logo from '../assets/logo.svg';

const loggedInItems =  [
  { name: 'home', label: 'Home', path: '' },
  { name: 'account', label: 'Account', path: 'account'},
  { name: 'profiles', label: 'Student Profiles', path: 'profiles' },
  { name: 'caseload', label: 'Caseload Management', path: 'caseload_management' },
  { name: 'college_list', label: 'College List', path: 'college_list' },
  { name: 'application_process', label: 'Application Process', path: 'application_process'},
  { name: 'settings', label: 'Settings', path: 'settings'},
  { name: 'cohortcreation', label: 'Cohort Creation', path: 'cohortcreation' }
]

const loggedOutItems = [
  { name: 'home', label: 'Home', path: '' }
]

function Sidenav(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  const openCloseMenu = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const signOutBtn =
    <Link className="nav-button signin-btn" to="" onClick={signOut} key="signOut">
      <ListItem style={{height: 50}} button>
        <ListItemText>Sign Out</ListItemText>
      </ListItem>
    </Link>

  const signInBtn =
    <Link className="nav-button signin-btn" to="account" key="signIn">
      <ListItem style={{height: 50}} button>
        <ListItemText>Sign In</ListItemText>
      </ListItem>
    </Link>

  let items;
  if (props.isLoggedIn) {
    items = loggedInItems;
  } else {
    items = loggedOutItems;
  }

  return (
    <div className="sidenav-container">
      <Slide direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <div className="sidenav">
          <img src={logo} alt="logo"/>
          <p style={{fontSize: 24, color: "#A5711A", marginBottom: 20}}>Easy Access</p>
          <List disablePadding dense className="nav-list">
            <div>
              {items.map(({label, name, path, ...rest}) => (
                <Link className="nav-button" to={path} key={name}>
                  <ListItem style={{height: 50}} button {...rest}>
                    <ListItemText>{label}</ListItemText>
                  </ListItem>
                </Link>
              ))}
            </div>
            { props.isLoggedIn ? null : signInBtn }
          </List>
        </div>
      </Slide>
      <div>
        { isMenuOpen ?
          <IconButton onClick={openCloseMenu}>
            <MenuOpenIcon style={{fontSize: 35}}/>
          </IconButton>
          :
          <IconButton onClick={openCloseMenu}>
            <MenuIcon style={{fontSize: 35}}/>
          </IconButton>
        }
      </div>
    </div>
  )
}

export default Sidenav;