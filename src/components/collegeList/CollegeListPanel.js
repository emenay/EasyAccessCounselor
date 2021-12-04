import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

import { Table } from 'reactstrap'
import Classification_table from './Classification_table'
import CollegeSearchByAttributes from './CollegeSearchByAttributes.js'
import Show_hide_modal from './Show_hide_modal'

export default function CollegeListPanel(props) {
  // console.log('CollegeListPanel props.info', props.info)
  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  let affordabilityInfo = [
    'GPA',
    'Class Rank',
    'SAT',
    'ACT',
    'EFC',
    'Ability to Pay',
  ]
  let fitInfo = [
    'Major 1',
    'Major 2',
    'Distance from Home',
    'Region',
    'College Size',
    'College Diversity',
    'College Type',
    'Religion',
    'Military/ROTC',
    'Athletics',
  ]
  let to_delete = [
    props.info.gpa,
    props.info.classRank,
    props.info.sat,
    props.info.act,
    props.info.efc,
    props.info.payMismatch,
  ]
  let to_delete2 = [
    props.info.gpa,
    props.info.classRank,
    props.info.sat,
    props.info.act,
    props.info.efc,
    props.info.payMismatch,
  ]
  const [affor_show_hide, set_affor_show_hide] = useState(
    new Array(affordabilityInfo.length).fill(false)
  )
  const [fit_show_hide, set_fit_show_hide] = useState(
    new Array(fitInfo.length).fill(false)
  )
  // var dbinfo = ["gpa", "classRank", "sat", "act", "efc", "payMismatch"];
  // var dbinfo2 = ["major1", "major2", "distancefromHome", "region", "collegeSize", "collegeDiversity", "collegeType", "religion", "rotc", "athletics"];
  const [track_afford, set_track_afford] = useState(
    new Array(affordabilityInfo.length).fill(true)
  )
  const [track_fit, set_track_fit] = useState(
    new Array(fitInfo.length).fill(true)
  )
  const toggle_afford = (idx) => {
    return (e) => {
      let temp = [...track_afford]
      temp[idx] = e.target.checked
      set_track_afford([...temp])
    }
  }
  const toggle_fit = (idx) => {
    return (e) => {
      let temp = [...track_fit]
      temp[idx] = e.target.checked
      set_track_fit([...temp])
    }
  }
  const affor_handle_show_hide = (arr) => {
    set_affor_show_hide(arr)
  }
  const fit_handle_show_hide = (arr) => {
    set_fit_show_hide(arr)
  }

  // useEffect(()=>{
  //   set_affor_show_hide()
  // }, [])
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Counselor</th>
            <th>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => {
                  //TODO: connect with backend
                  {
                    let temp = track_afford.map((val) => false)
                    set_track_afford([...temp])
                    let temp1 = track_fit.map((val) => false)
                    set_track_fit([...temp])
                  }
                }}>
                Sync
              </Button>
            </th>
            <th>Student</th>
          </tr>

          <tr>
            <th>Affordabiity&Selectivity</th>
            <th></th>
            <th>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  if (
                    track_afford.reduce(
                      (first, second) => first && second,
                      true
                    )
                  ) {
                    let temp = track_afford.map((val) => false)
                    set_track_afford([...temp])
                  } else {
                    let temp = track_afford.map((val) => true)
                    set_track_afford([...temp])
                  }
                }}>
                select/unselect
              </Button>
            </th>
            <th>
              <Show_hide_modal
                checked={
                  affor_show_hide.length == 1
                    ? affor_show_hide[0]
                    : affor_show_hide
                }
                list={affordabilityInfo}
                handle={affor_handle_show_hide}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {affordabilityInfo
            .filter((ele, idx) => !affor_show_hide[idx])
            .map((ele, idx) => (
              <tr key={'aff' + idx}>
                <th scope="row">{ele}</th>
                <td>{to_delete[idx]}</td>
                <td>
                  <Switch
                    {...label}
                    onChange={toggle_afford(idx)}
                    checked={track_afford[idx]}
                  />
                </td>
                <td>{to_delete2[idx]}</td>
              </tr>
            ))}
        </tbody>
        <thead>
          <tr>
            <th>Fit Information</th>
            <th></th>
            <th>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  if (
                    track_fit.reduce((first, second) => first && second, true)
                  ) {
                    let temp = track_fit.map((val) => false)
                    set_track_fit([...temp])
                  } else {
                    let temp = track_fit.map((val) => true)
                    set_track_fit([...temp])
                  }
                }}>
                select/unselect
              </Button>
            </th>
            <th>
              <Show_hide_modal
                checked={
                  fit_show_hide.length == 1 ? fit_show_hide[0] : fit_show_hide
                }
                list={fitInfo}
                handle={fit_handle_show_hide}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {fitInfo
            .filter((ele, idx) => !fit_show_hide[idx])
            .map((ele, idx) => (
              <tr key={'fit' + idx}>
                <th scope="row">{ele}</th>
                <td>to fill</td>
                <td>
                  <Switch
                    {...label}
                    onChange={toggle_fit(idx)}
                    checked={track_fit[idx]}
                  />
                </td>
                <td>to fill</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Classification_table />
      <CollegeSearchByAttributes />
    </div>
  )
}
