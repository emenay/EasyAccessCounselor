import React, { Component, createContext } from "react";
import { db, auth } from '../firebase/firebase.js';

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
                  return querySnapshot.docs.map(doc =>{
                      var new_doc = doc.data();
                      new_doc.uid = doc.id;
                      return new_doc;
                    });
              })
              .then(data=>this.setState({
                  user: user,
                  cohorts: data,
                  selectedCohort: this.state.selectedCohort ? this.state.selectedCohort : data.length > 0 ?  data[0].uid : null
                }));
          } else {
              this.setState({
                user: null,
                selectedCohort: null,
                cohorts: []
            });
          }
    }

    changeSelectedCohort = (e) =>{
        this.setState({selectedCohort: e.target.value});
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
            <UserContext.Provider value={{state:this.state, changeSelectedCohort: this.changeSelectedCohort}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;