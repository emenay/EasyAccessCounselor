import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  List,
  ListItem,
  ListItemText,
  Slide,
  IconButton,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'

import '../css/components.css'

import { signOut } from '../firebase/firebase'

const loggedInItems = [
  { name: 'profiles', label: 'Student Profiles', path: 'profiles' },
  {
    name: 'caseload',
    label: 'Caseload Management',
    path: 'caseload_management',
  },
  { name: 'settings', label: 'Settings', path: 'settings' },
  { name: 'cohortcreation', label: 'Cohort Creation', path: 'cohortcreation' },
  { name: 'billing', label: 'Billing', path: 'billing' },
]

const loggedOutItems = [{ name: 'home', label: 'Home', path: '' }]

function Sidenav(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true)

  const openCloseMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const signOutBtn = (
    <Link
      className="nav-button signin-btn"
      to=""
      onClick={signOut}
      key="signOut">
      <ListItem style={{ height: 50 }} button>
        <ListItemText>Sign Out</ListItemText>
      </ListItem>
    </Link>
  )

  const signInBtn = (
    <Link className="nav-button signin-btn" to="account" key="signIn">
      <ListItem style={{ height: 50 }} button>
        <ListItemText>Sign In</ListItemText>
      </ListItem>
    </Link>
  )

  let items = loggedInItems
  // tanner
  // this doesn't work right now but it may be that we can use something like this to disable the sidenav when picking the account type
  if (props.isPickingAccount) {
    //items = loggedOutItems;
  } else if (props.isLoggedIn) {
    items = loggedInItems
  } else {
    items = loggedOutItems
  }

  let location = useLocation().pathname.substring(1)

  return (
    <div className="sidenav-container">
      <Slide direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <List
          style={{ width: '100%' }}
          disablePadding
          dense
          className="nav-list">
          {items.map(({ label, name, path, ...rest }) => (
            <Link className="nav-button" to={path} key={name}>
              <ListItem style={{ height: 50 }} button {...rest}>
                <p
                  className={
                    'sidenav-p' + (location === path ? ' path-selected' : '')
                  }>
                  {label}
                </p>
              </ListItem>
            </Link>
          ))}
        </List>
      </Slide>
    </div>
  )
}

export default Sidenav
