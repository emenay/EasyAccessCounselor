import React from 'react';
import { db } from '../firebase/firebase';

class AboutPage extends React.Component {
    state = {
        data : null,
    }

    async componentDidMount() {
        let doc = await db.collection("NeedMet").doc("Adrian College").get();
        this.setState({data: doc.data()})
    }

    render() {
        return (
          <div>
            <h1>{this.state.data ? this.state.data['NeedMet'] : ""}</h1>
          </div>
        );
    }
}

export default AboutPage;