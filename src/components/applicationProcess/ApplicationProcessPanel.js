import React, {useState} from 'react'
import Button from '@mui/material/Button';
export default function ApplicationProcessPanel() {
    const [checked, setChecked] = useState({pre_app: true, app_check: true, post_check: true, post_app: true, finacial: true, additional: true});
    const [dumb, setDumb] = useState(false)
    const handleChange = (val) => {
        const temp=()=>{
            checked[val] = !checked[val]
            setDumb(!dumb);
        }
        return temp
    };
    const btn_style ={
        background: "None",
        border: "None"
    }
    return (
        <div className="appproc-panel">
            <div className="appproc-col">
                <div className="app-group">
                    <div className="app-circle" />
                    <button style={btn_style} onClick={handleChange('pre_app')}><b>Pre-Application</b></button>
                    {checked["pre_app"]?     
                    <>
                        <p>visits</p>
                        <p>balanced college list</p>
                    </> : ''}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <button style={btn_style} onClick={handleChange('app_check')}><b>Application Checklist</b></button>
                    {checked["app_check"]?     
                    <>
                        <p>Early Applications</p>
                        <p>Regular Applications</p>
                        <p>Essays</p>
                        <p>Testing</p>
                        <p>Counselor Recommendations</p>
                        <p>Teacher Recommendations</p>
                    </> : ''}
                </div>
                
                <div className="app-group">
                    <div className="app-circle" />
                    <button style={btn_style} onClick={handleChange('post_app')}><b>Pre-Application</b></button>
                    {checked["post_app"]?     
                    <>
                        <p>Results</p>
                        <p>Rejected Schools</p>
                        <p>Waitlisted Schools</p>
                        <p>Student Decision</p>
                    </> : ''}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <button style={btn_style} onClick={handleChange('post_check')}><b>Pre-Application</b></button>
                    {checked["post_check"]?     
                    <>
                        <p>Deposit</p>
                        <p>Orientation</p>
                        <p>Summer Programs</p>
                        <p>Housing</p>
                    </> : ''}
                </div>
                <div className="app-group" style={{borderLeft: "0px"}}>
                    <div className="app-circle" />
                    <b>Graduation!</b>
                </div>
            </div>

            
            <div className="appproc-col">
                <div className="app-group">
                    <div className="app-circle" />
                    <button style={btn_style} onClick={handleChange('finacial')}><b>Financial Aid</b></button>
                    {checked["finacial"]?     
                    <>
                        <p>App Fee Waiver</p>
                        <p>FAFSA Status</p>
                        <p>FAFSA Verification</p>
                        <p>Financial Aid Award Letters</p>
                        <p>Financial Aid Appeal</p>
                    </> : ''}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <button style={btn_style} onClick={handleChange('additional')}><b>Additional Info</b></button>
                    {checked["additional"]?     
                    <>
                        <p>to add</p>
                    </> : ''}
                </div> 
            </div>

            
            {/* <button onClick={handleChange}></button> */}
        </div>
    )
}
