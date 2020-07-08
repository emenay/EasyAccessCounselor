import React, { Component, createContext } from "react";
import { auth } from '../firebase/firebase.js';

export const UserContext = createContext({ user: null, selectedCohort: null, cohorts: [] });

class UserProvider extends Component {
    state = {
        user: null,
        selectedCohort: null,
        cohorts: []
    };

    userUpdate = (user) => {
        if (user) {
            db.collection("student_counselors").where("counselor", "==", user.uid).get()
              .then(querySnapshot=>{
                  return querySnapshot.docs.map(doc =>doc.data());
              })
              .then(data=>this.setState({
                  user: user,
                  cohorts: data
                }));
          } else {
              this.setState({
                user: null,
                selectedCohort: null,
                cohorts: []
            });
          }
    }

    changeSelectedCohort = (cohort) =>{
        this.setState({selectedCohort: cohort});
    }

    componentDidMount = () => {
        this._isMounted = true;
        auth.onAuthStateChanged(userAuth => {
            this._isMounted && this.userUpdate(user);
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }



    render() {
        return(
            <UserContext.Provider value={this.state, this.changeSelectedCohort}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;