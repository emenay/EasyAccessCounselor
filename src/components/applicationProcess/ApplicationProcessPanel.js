import React, {useState} from 'react'
import Edit_popup from './Edit_popup';
let pre_app_obj = {Visits: 3, Balanced_College_List: "[UNC, NC state]"}
let app_check_obj = {Early_Applications: "[UNC]", Regular_Application: "[NC state]", Essays: "Done", Testing: "[SAT: 1460, ACT: 32]", Counselor_Recommendations: "No", Teacher_Recommendations: "Yes"}
let post_app_obj = {Results: "[NC state, UNC]", Rejected_Schools: "[Duke]", Waitlisted_Schools: "[]", Student_Decision: "UNC"}
let post_check_obj = {Deposit: "Yes", Orientation: "No", Summer_Programs: "No", Housing: "Dorm"}
let finacial_obj = {App_Fee_Waiver: "No", FAFSA_Status: "Pending", FAFSA_Verification: "No", Finacial_Aid_Award_Letters: "Yes", Finacial_Aid_Appeal: "Yes"}
let additional_info_obj = {to_add: "?"}
export default function ApplicationProcessPanel() {
    const [checked, setChecked] = useState({pre_app: true, app_check: true, post_check: true, post_app: true, finacial: true, additional: true});
    const [dumb, setDumb] = useState(false)
    const handle_show_hide = (val) => {const temp=()=>{checked[val] = !checked[val];setDumb(!dumb);}
        return temp
    };
    const refresh = () =>{
        setDumb(!dumb)
    }
    const btn_style ={
        background: "None",
        border: "None"
    }
    return (
        <div className="appproc-panel">
            <div className="appproc-col">
                <div className="app-group">
                    <div className="app-circle" />
                    <div><button style={btn_style} onClick={handle_show_hide('pre_app')}><b>Pre-Application</b></button><Edit_popup obj={pre_app_obj} refresh={refresh}/></div>
                    {checked["pre_app"]?     
                    <>
                        {Object.keys(pre_app_obj).map(key=><p>{key.replaceAll("_", " ")}: {pre_app_obj[key]}</p>)}
                    </> : ''}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <div><button style={btn_style} onClick={handle_show_hide('app_check')}><b>Application Checklist</b></button><Edit_popup obj={app_check_obj} refresh={refresh}/></div>
                    {checked["app_check"]?     
                    <>
                        {Object.keys(app_check_obj).map(key=><p>{key.replaceAll("_", " ")}: {app_check_obj[key]}</p>)}
                    </> : ''}
                </div>
                
                <div className="app-group">
                    <div className="app-circle" />
                    <div><button style={btn_style} onClick={handle_show_hide('post_app')}><b>Post-Application</b></button><Edit_popup obj={post_app_obj} refresh={refresh}/></div>
                    {checked["post_app"]?     
                    <>
                        {Object.keys(post_app_obj).map(key=><p>{key.replaceAll("_", " ")}: {post_app_obj[key]}</p>)}
                    </> : ''}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <div><button style={btn_style} onClick={handle_show_hide('post_check')}><b>Post-Application checklist</b></button><Edit_popup obj={post_check_obj} refresh={refresh}/></div>
                    {checked["post_check"]?     
                    <>
                        {Object.keys(post_check_obj).map(key=><p>{key.replaceAll("_", " ")}: {post_check_obj[key]}</p>)}
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
                    <div><button style={btn_style} onClick={handle_show_hide('finacial')}><b>Financial Aid</b></button><Edit_popup obj={finacial_obj} refresh={refresh}/></div>
                    {checked["finacial"]?     
                    <>
                        {Object.keys(finacial_obj).map(key=><p>{key.replaceAll("_", " ")}: {finacial_obj[key]}</p>)}
                    </> : ''}
                </div>
                <div className="app-group">
                    <div className="app-circle" />
                    <div><button style={btn_style} onClick={handle_show_hide('additional')}><b>Additional Info</b></button><Edit_popup obj={additional_info_obj} refresh={refresh}/></div>
                    {checked["additional"]?     
                    <>
                        {Object.keys(additional_info_obj).map(key=><p>{key.replaceAll("_", " ")}: {additional_info_obj[key]}</p>)}
                    </> : ''}
                </div> 
            </div>
        </div>
    )
}
