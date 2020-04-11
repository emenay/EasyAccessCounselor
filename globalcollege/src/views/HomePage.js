import React from 'react';
import Header from '../components/Header';

class HomePage extends React.Component {
    render() {
        return (
          <div>
            <Header/>
            <div>
              This is the Home page!
            </div>
          </div>
        );
    }
}

export default HomePage;
