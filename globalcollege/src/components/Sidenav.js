import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@material-ui/core'
import '../css/components.css'

const items =  [
  { name: 'home', label: 'Home', path: '' },
  { name: 'account', label: 'Account', path: 'account' },
  { name: 'about', label: 'About', path: 'about' },
  { name: 'caseload', label: 'Caseload Management', path: 'caseload_management' },
  { name: 'college_list', label: 'College List', path: 'college_list' },
  { name: 'schedule', label: 'Schedule', path: 'schedule' }
]

function Sidenav() {
  return (
    <div className="sidenav">
			<List disablePadding dense>
				{items.map(({label, name, path, ...rest}) => (
					<Link className="nav-button" to={path} key={name}>
						<ListItem style={{height: 50}} button {...rest}>
							<ListItemText>{label}</ListItemText>
						</ListItem>
					</Link>
				))}
			</List>
    </div>
  )
}

export default Sidenav;