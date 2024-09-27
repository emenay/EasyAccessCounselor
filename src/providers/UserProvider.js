import React, { Component, createContext } from 'react'
import { db, auth } from '../firebase/firebase.js'
import Cookies from 'js-cookie'

export const UserContext = createContext({
  user: null,
  selectedCohort: null,
  cohorts: [],
})

class UserProvider extends Component {
  state = {
    user: null,
    selectedCohort: null,
    cohorts: [],
  }

  userUpdate = async (user) => {
    this.setState({ user: user })
    if (user) {
      /*
      let userDetails = await db.collection('counselors').doc(user.uid).get();
      let cohort = userDetails.data().selectedCohort;*/
      db.collection('student_counselors')
        .where('counselor', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => {
            var new_doc = doc.data()
            new_doc.uid = doc.id
            return new_doc
          })
        })
        .then((data) =>
          this.setState({
            cohorts: data,
            selectedCohort: this.cohortSelector(data),
          })
        )
        .catch((error) => {
          console.log(error)
        })
    } else {
      this.setState({
        selectedCohort: null,
        cohorts: [],
      })
    }
  }

  // Helper method for choosing which cohort to select

  cohortSelector = (data) => {
    if (this.state.selectedCohort) return this.state.selectedCohort

    if (Cookies.get('cohort') !== undefined) {
      return Cookies.get('cohort')
    }

    if (data.length > 0) {
      Cookies.set('cohort', data[0].uid, { expires: 100 })
      return data[0].uid
    }
    return null
  }

  changeSelectedCohort = (e) => {
    Cookies.set('cohort', e.target.value, { expires: 100 })
    this.setState({ selectedCohort: e.target.value })
  }

  addCohort = (cohortName, cohortID) => {
    var new_cohorts = this.state.cohorts.slice()
    new_cohorts.push({ name: cohortName, uid: cohortID })
    this.setState({ cohorts: new_cohorts, selectedCohort: cohortID })
    console.log(this.state)
  }

  deleteCohort = (cohortID) => {
    let new_cohorts = this.state.cohorts.filter(
      (cohort) => cohort.uid !== cohortID
    )
    this.setState({
      cohorts: new_cohorts,
      selectedCohort: new_cohorts.length > 0 ? new_cohorts[0].uid : null,
    })
  }

  componentDidMount = () => {
    this._isMounted = true
    auth.onAuthStateChanged((userAuth) => {
      this._isMounted && this.userUpdate(userAuth)
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          deleteCohort: this.deleteCohort,
          addCohort: this.addCohort,
          changeSelectedCohort: this.changeSelectedCohort,
        }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
