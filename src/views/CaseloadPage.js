import React from 'react';
import * as data from '../data_caseload_management.json';
import '../css/CaseloadPage.css'
import 'bulma/css/bulma.css'

class CaseloadPage extends React.Component {
    render() {
        console.log(data[2]);
        var arr = [];
        Object.keys(data).forEach(function(key) {
            arr.push(data[key]);
            console.log(data[key].Name)
        });
        console.log(arr)
        return (
            <div id="root">
                <div id="grid">
                {arr[0].map(person => <div key={person.id} className="square">
                    <div className="card">
                        <div className="card-content">
                            <p className="title is-4">{person.Name}</p>
                            <p className="subtitle is-6">{person.Essay}</p>
                            <div className="content">
                                <p>{person["Early Apps"]}</p>
                            </div>
                        </div>
                    </div>
                    </div>)}
                </div>
            </div>
        )
    }

}

export default CaseloadPage;