export function getBGColor(person) {
  let bgcolor = { backgroundColor: '#ACE7FF' }
  switch (person.Results) {
    case 'Waitlisted':
      bgcolor.backgroundColor = '#FFF284'
      break
    case 'Accepted':
      bgcolor.backgroundColor = '#C0FF97'
      break
    case 'Rejected':
      bgcolor.backgroundColor = '#FFA4A4'
      break
    default:
      bgcolor.backgroundColor = '#ACE7FF'
  }
  return bgcolor
}
