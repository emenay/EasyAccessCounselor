import React from 'react';
import { db } from '../firebase/firebase';

class CaseloadPage extends React.Component {
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
            This is the Caseload Management page.
          </div>
        );
    }
}

export default CaseloadPage;