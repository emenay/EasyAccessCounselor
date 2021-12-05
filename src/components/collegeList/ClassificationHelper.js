// async function categorizeColleges(props, collegeIDs) {
//     var coordinates
//     for (var i = 0; i < collegeIDs.length; i++) {
//       coordinates = await getCollegeCoordinates(props, collegeIDs[i])
//       categorizeCollege(coordinates.affordabilityInt, coordinates.selectivityInt)
//     }
//   }


//   function categorizeCollege(row, column) {
//     console.log('Row: ' + row + ' Column: ' + column) //TODO: put college in correct spot on UI
//   }
//   const REACH = 'Reach'
//   const TARGET = 'Target'
//   const SAFETY = 'Safety'
//   const MOST_EXPENSIVE = 'Most Expensive'
//   const MILDLY_EXPENSIVE = 'Mildly Expensive'
//   const LEAST_EXPENSIVE = 'Least Expensive'
  
  async function getCollegeCoordinates(college) {
    var selectivityString = await categorizeCollegeSelecitvity(props, collegeID)
    var affordabilityString = await categorizeCollegeAffordability(
      props,
      collegeID
    )
    var coordinates = {
      selectivityInt: -1,
      affordabilityInt: -1,
    }
    console.log('College Selectivity Designation: ' + selectivityString)
    console.log('College Affordability Designation: ' + affordabilityString)
    if (selectivityString.localeCompare(SAFETY) === 0) {
      coordinates.selectivityInt = 0
    } else if (selectivityString.localeCompare(TARGET) === 0) {
      coordinates.selectivityInt = 1
    } else if (selectivityString.localeCompare(REACH) === 0) {
      coordinates.selectivityInt = 2
    }
    if (affordabilityString.localeCompare(LEAST_EXPENSIVE) === 0) {
      coordinates.affordabilityInt = 0
    } else if (affordabilityString.localeCompare(MILDLY_EXPENSIVE) === 0) {
      coordinates.affordabilityInt = 1
    } else if (affordabilityString.localeCompare(MOST_EXPENSIVE) === 0) {
      coordinates.affordabilityInt = 2
    }
    return coordinates
  }
  
//   async function getCollegeUniverse(collegeID) {
//     const response = await axios.get(
//       'https://collegerestapijs.herokuapp.com/colleges/id?id=' + collegeID
//     )
//     return response.data[0].universe
//   }
  
//   async function getCollegeState(collegeID) {
//     const response = await axios.get(
//       'https://collegerestapijs.herokuapp.com/colleges/id?id=' + collegeID
//     )
//     return response.data[0].stabbr
//   }
  
//   async function getCollegeStateScore(collegeID) {
//     const response = await axios.get(
//       'https://collegerestapijs.herokuapp.com/colleges/id?id=' + collegeID
//     )
//     return response.data[0].afford
//   }
  
//   async function getCollegeNeedMet(collegeID) {
//     const response = await axios.get(
//       'https://collegerestapijs.herokuapp.com/colleges/id?id=' + collegeID
//     )
//     return response.data[0].needmet
//   }
  
  async function getCollegeControl(collegeID) {
    const response = await axios.get(
      'https://collegerestapijs.herokuapp.com/colleges/id?id=' + collegeID
    )
    return response.data[0].control
  }
  
  async function categorizeCollegeAffordability(props, collegeID) {
    var data = {
      zipcode: parseInt(props.info.zip),
      ability: parseInt(props.info.famAfford),
      studentState: props.info.state,
      studentSelectivityScore: getStudentSelectivityScore(props),
      universe: parseInt(await getCollegeUniverse(collegeID)),
      collegeState: await getCollegeState(collegeID),
      collegeStateScore: parseInt(await getCollegeStateScore(collegeID)),
      control: parseInt(await getCollegeControl(collegeID)),
      needMet: parseInt(await getCollegeNeedMet(collegeID)),
    }
    var studentAffordabilityScore
    //unnnesecary code because algorithm assumes these variables have been prechecked
    // if(!data.zipcode || !data.state) {
    //     console.log("pop up message: zip code and state Required")
    // }
    if (!data.ability) {
      props.info.efc = '6000'
      data.ability = 60000
    }
    studentAffordabilityScore = affordabilityUniverse(data.universe)
    if (studentAffordabilityScore) {
      return studentAffordabilityScore
    }
    studentAffordabilityScore = affordabilityCommuting(data.zipcode, data.state)
    if (studentAffordabilityScore) {
      return studentAffordabilityScore
    }
    if (data.studentState.localeCompare(data.collegeState) === 0) {
      studentAffordabilityScore = affordabilityInStatePublic(
        data.studentStateScore,
        data.studentSelectivityScore,
        data.ability
      )
      return studentAffordabilityScore
    } else if (data.control === 2) {
      studentAffordabilityScore = affordabilityPrivate(data.ability, data.needMet)
      return studentAffordabilityScore
    } else if (
      data.control === 1 &&
      data.studentState.localeCompare(data.collegeState) !== 0
    ) {
      studentAffordabilityScore = affordabilityOOSPublic()
      return studentAffordabilityScore
    } else {
      //Should never get here
      return MILDLY_EXPENSIVE
    }
  }
  function affordabilityUniverse(universe) {
    if (universe !== 1) {
      return MOST_EXPENSIVE
    }
  }
  function affordabilityCommuting(zipcode, state) {
    //TODO: zip code comparison to get miles
    const MAX_COMMUTING_DISTANCE = 25 //miles
  }
  function affordabilityInStatePublic(stateScore, selectivity, ability) {
    if (
      stateScore === 1 ||
      (stateScore === 2 && selectivity === 2) ||
      (stateScore === 2 && selectivity >= 3 && ability >= 10000) ||
      (stateScore === 3 && ability >= 10000)
    ) {
      return LEAST_EXPENSIVE
    } else {
      return MILDLY_EXPENSIVE
    }
  }
  function affordabilityPrivate(ability, needMet) {
    if (
      ability > 25000 ||
      (ability > 15000 && needMet >= 0.8) ||
      (ability > 10000 && needMet >= 0.85) ||
      (ability > 6000 && needMet >= 0.87) ||
      (ability > 1000 && needMet >= 0.9) ||
      (ability > 0 && needMet >= 0.9)
    ) {
      return LEAST_EXPENSIVE
    } else if (
      ability > 15000 ||
      (ability > 10000 && needMet >= 0.8) ||
      (ability > 6000 && needMet >= 0.85) ||
      (ability > 0 && needMet >= 0.87)
    ) {
      return MILDLY_EXPENSIVE
    } else {
      return MOST_EXPENSIVE
    }
  }
  function affordabilityOOSPublic(
    studentSelectivity,
    collegeSelectivity,
    ability
  ) {
    //TODO: some variables from website didnt make sense
    if (
      studentSelectivity === 2 ||
      (studentSelectivity === 2 && ability > 15000 && ability < 25000) ||
      (studentSelectivity === 2 && ability > 25000)
    ) {
      return LEAST_EXPENSIVE
    } else if (
      (studentSelectivity === 2 && ability > 6000 && ability < 15000) ||
      (studentSelectivity === 2 && ability > 15000 && ability < 25000) ||
      (studentSelectivity === 2 && ability > 25000) ||
      (studentSelectivity >= 3 && (ability > 15000) & (ability < 25000)) ||
      (studentSelectivity >= 3 && ability > 25000)
    ) {
      return MILDLY_EXPENSIVE
    } else {
      return MOST_EXPENSIVE
    }
  }
  
  async function getCollegeSelectivityScore(collegeID) {
    const response = await axios.get(
      'https://collegerestapijs.herokuapp.com/colleges/id?id=' + collegeID
    )
    return response.data[0].selectivity_char
  }
  
  async function categorizeCollegeSelecitvity(props, collegeID) {
    var collegeSelectivityScore = await getCollegeSelectivityScore(collegeID)
    collegeSelectivityScore = Number(collegeSelectivityScore[0])
    var studentSelectivityScore = getStudentSelectivityScore(props)
    return compareSelecivityScores(
      studentSelectivityScore,
      collegeSelectivityScore
    )
  }
  function getStudentSelectivityScore(props) {
    var data = {
      gpa: props.info.gpa,
      act: props.info.act,
      sat: props.info.sat,
    }
    //unnnesecary code because algorithm assumes these variables have been prechecked
    // if(!data.gpa){
    //     console.log("pop up message: GPA Required")
    // }
    if (!data.act && !data.sat) {
      return categorizeStudentSelectivityGPA(data.gpa)
    } else if (!data.act) {
      return categorizeStudentSelectivitySAT(data.gpa, data.sat)
    } else if (!data.sat) {
      return categorizeStudentSelectivityACT(data.gpa, data.act)
    } else {
      let scoreSAT = categorizeStudentSelectivitySAT(data.gpa, data.sat)
      let scoreACT = categorizeStudentSelectivityACT(data.gpa, data.act)
      if (scoreSAT < scoreACT) {
        return scoreSAT
      } else {
        return scoreACT
      }
    }
  }
  function compareSelecivityScores(
    studentSelectivityScore,
    collegeSelectivityScore
  ) {
    if (studentSelectivityScore > collegeSelectivityScore) {
      return REACH
    } else if (studentSelectivityScore < collegeSelectivityScore) {
      return SAFETY
    } else {
      return TARGET
    }
  }
  function categorizeStudentSelectivityGPA(gpa) {
    //weighted scaling
    if (gpa > 4.0) {
      return 2
    } else if (gpa > 3.5) {
      return 3
    } else if (gpa > 3.0) {
      return 4
    } else if (gpa > 2.5) {
      return 5
    } else {
      return 6
    }
  }
  function categorizeStudentSelectivitySAT(gpa, sat) {
    if ((gpa >= 3.5 && sat >= 1300) || (gpa >= 3.75 && sat >= 1200)) {
      return 2
    } else if (
      (gpa >= 3.0 && sat >= 1250) ||
      (gpa >= 3.25 && sat >= 1150) ||
      (gpa >= 3.75 && sat >= 1100) ||
      (gpa >= 4.0 && sat >= 1050)
    ) {
      return 3
    } else if (
      (gpa >= 2.25 && sat >= 1400) ||
      (gpa >= 2.5 && sat >= 1050) ||
      (gpa >= 3.25 && sat >= 1000) ||
      (gpa >= 3.5 && sat >= 950)
    ) {
      return 4
    } else if (
      (gpa >= 2.0 && sat >= 1050) ||
      (gpa >= 2.25 && sat >= 1000) ||
      (gpa >= 2.5 && sat >= 880) ||
      gpa >= 3.5
    ) {
      return 5
    } else {
      return 6
    }
  }
  function categorizeStudentSelectivityACT(gpa, act) {
    if ((gpa >= 3.5 && act >= 28) || (gpa >= 3.75 && act >= 25)) {
      return 2
    } else if (
      (gpa >= 3.0 && act >= 26) ||
      (gpa >= 3.25 && act >= 23) ||
      (gpa >= 3.75 && act >= 22) ||
      (gpa >= 4.0 && act >= 20)
    ) {
      return 3
    } else if (
      (gpa >= 2.25 && act >= 31) ||
      (gpa >= 2.5 && act >= 20) ||
      (gpa >= 3.25 && act >= 19) ||
      (gpa >= 3.5 && act >= 18)
    ) {
      return 4
    } else if (
      (gpa >= 2.0 && act >= 20) ||
      (gpa >= 2.25 && act >= 19) ||
      (gpa >= 2.5 && act >= 17) ||
      gpa >= 3.5
    ) {
      return 5
    } else {
      return 6
    }
  }
  
  function validateMessage(props) {
    let info = props.info
    const errors = []
    let g = typeof info.gpa === 'undefined' || info.gpa === null || info.gpa <= 0
    let s = typeof info.state === 'undefined' || info.state === null
    let z =
      typeof info.zipcode === 'undefined' ||
      info.zipcode <= 0 ||
      info.zipcode === null
  
    if (g && s && z) {
      errors.push(
        'Cannot add to list without valid GPA, home state, and zipcode.'
      )
      errors.push(false)
    } else if (g && z) {
      errors.push('Cannot add to list without valid GPA and zipcode.')
      errors.push(false)
    } else if (s && z) {
      errors.push('Cannot add to list without valid home state and zipcode.')
      errors.push(false)
    } else if (g && s) {
      errors.push('Cannot add to list without valid GPA and home state.')
      errors.push(false)
    } else if (z) {
      errors.push('Cannot add to list without valid zipcode.')
      errors.push(false)
    } else if (s) {
      errors.push('Cannot add to list without valid state.\n')
      errors.push(false)
    } else if (g) {
      errors.push('Cannot add to list without valid GPA.\n')
      errors.push(false)
    }
    if (errors.length < 1) {
      errors.push('College added!')
      errors.push(true)
    }
    // console.log(errors);
    return errors
  }
  
  function validate(props) {
    return validateMessage(props)[1]
  }