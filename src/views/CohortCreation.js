import {db, auth} from '../firebase/firebase.js';
import React from 'react';

class CohortCreation extends React.Component {
    constructor(props){
        super(props);
        this.state = ({cohorts: []});
    }

    componentDidMount(){
        db.collection("student_counselors").where("counselor", "==", auth.currentUser.uid).get()
        .then(querySnapshot=>{
            return querySnapshot.docs.map(doc =>doc.data());
        })
        .then(data=>this.setState({cohorts: data}));
    }

    render(){

        return (
            <div>{this.state.cohorts.map(cohort=>{return cohort.name} )}</div>);
    }
}

export default CohortCreation;