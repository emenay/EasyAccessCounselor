import React from 'react'
import '../css/components.css'

const paths = {
	"/": "Home",
	"/login": "Account",
	"/about": "About",
	"/caseload_management": "Caseload Management",
	"/college_list": "College List",
	"/schedule": "Schedule"
}

function Header() {
	const pathname = window.location.pathname;
  return (
    <div className="header">
			{paths[pathname]}
    </div>
  )
}

export default Header;