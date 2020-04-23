import React from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemText, Slide, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import '../css/components.css';

import { signOut } from '../firebase/firebase';
import logo from '../assets/logo.svg';

const items =  [
  { name: 'home', label: 'Home', path: '' },
  { name: 'account', label: 'Account', path: 'account' },
  { name: 'about', label: 'Testing', path: 'about' },
  { name: 'caseload', label: 'Caseload Management', path: 'caseload_management' },
  { name: 'college_list', label: 'College List', path: 'college_list' },
  { name: 'schedule', label: 'Schedule', path: 'schedule' }
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

  return (
    <div className="sidenav-container">
      <Slide direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <div className="sidenav">
          <img src={logo} alt="logo"/>
          <p style={{fontSize: 24, color: "#A5711A"}}>Easy Access</p>
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
            { props.isLoggedIn ? signOutBtn : signInBtn }
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