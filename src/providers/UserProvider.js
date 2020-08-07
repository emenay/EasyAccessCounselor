import React, { Component, createContext } from "react";
import { db, auth } from '../firebase/firebase.js';

export const UserContext = createContext({ user: null, selectedCohort: null, cohorts: [] });

class UserProvider extends Component {
    state = {
        user: null,
        selectedCohort: null,
        cohorts: []
    };

    userUpdate = async (user) => {
        this.setState({user: user});
        if (user) {
            let userDetails = await db.collection('counselors').doc(user.uid).get();
            let cohort = userDetails.data().selectedCohort;
            db.collection("student_counselors").where("counselor", "==", user.uid).get()
            .then(querySnapshot=>{
                return querySnapshot.docs.map(doc =>{
                    var new_doc = doc.data();
                    new_doc.uid = doc.id;
                    return new_doc;
                  });
            })
            .then(data=>this.setState({
                cohorts: data,
                selectedCohort: this.state.selectedCohort ? this.state.selectedCohort : (cohort !== undefined ? cohort: (data.length > 0 ?  data[0].uid : null))
              }))
            .catch(error=>{console.log(error)});
          } else {
              this.setState({
                selectedCohort: null,
                cohorts: []
            });
          }
    }

    changeSelectedCohort = (e) =>{
        this.setState({selectedCohort: e.target.value});
    }

    addCohort = (cohortName, cohortID) => {
        var new_cohorts = this.state.cohorts.slice();
        new_cohorts.push({name: cohortName, uid: cohortID});
        this.setState({cohorts: new_cohorts, selectedCohort: cohortID});
        console.log(this.state);
    }

    deleteCohort = (cohortID) => {
        let new_cohorts = this.state.cohorts.filter(cohort=>cohort.uid !== cohortID);
        this.setState({cohorts: new_cohorts, selectedCohort: (new_cohorts.length > 0 ? new_cohorts[0].uid : null)});
    }

    componentDidMount = () => {
        this._isMounted = true;
        auth.onAuthStateChanged(userAuth => {
            this._isMounted && this.userUpdate(userAuth);
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }



    render() {
        return(
            <UserContext.Provider value={{state:this.state, deleteCohort: this.deleteCohort, addCohort: this.addCohort, changeSelectedCohort: this.changeSelectedCohort}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;