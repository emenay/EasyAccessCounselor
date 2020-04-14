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
  { name: 'about', label: 'About', path: 'about' },
  { name: 'caseload', label: 'Caseload Management', path: 'caseload_management' },
  { name: 'college_list', label: 'College List', path: 'college_list' },
  { name: 'schedule', label: 'Schedule', path: 'schedule' }
]

function Sidenav(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openCloseMenu = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const signOutBtn =
    <Link className="nav-button" to="" onClick={signOut} key="signOut">
      <ListItem style={{height: 50}} button>
        <ListItemText>Sign Out</ListItemText>
      </ListItem>
    </Link>

  const signInBtn =
    <Link className="nav-button" to="account" key="signIn">
      <ListItem style={{height: 50}} button>
        <ListItemText>Sign In</ListItemText>
      </ListItem>
    </Link>

  return (
    <div>
      { isMenuOpen ? null :
        <IconButton onClick={openCloseMenu}>
          <MenuIcon style={{fontSize: 35}}/>
        </IconButton>
      }
      <Slide direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <div className="sidenav">
          <div className="menu-icon-container">
            <IconButton onClick={openCloseMenu}>
              <MenuOpenIcon style={{fontSize: 35}}/>
            </IconButton>
          </div>
          <img src={logo} alt="logo"/>
          <List disablePadding dense>
            {items.map(({label, name, path, ...rest}) => (
              <Link className="nav-button" to={path} key={name}>
                <ListItem style={{height: 50}} button {...rest}>
                  <ListItemText>{label}</ListItemText>
                </ListItem>
              </Link>
            ))}
            { props.isLoggedIn ? signOutBtn : signInBtn }
          </List>
        </div>
      </Slide>
    </div>
  )
}

export default Sidenav;