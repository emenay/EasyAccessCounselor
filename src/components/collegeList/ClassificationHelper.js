
export default function getCollegeScores(college, props) {
    const selectivityScore = categorizeCollegeSelecitvity(college, props);
    const affordabilityScore = categorizeCollegeAffordability(college, props);
    console.log(selectivityScore);
    console.log(affordabilityScore);
    return ({
        "selectivityScore": selectivityScore,
        "affordabilityScore": affordabilityScore,
    })
}

//selectivity
function categorizeCollegeSelecitvity(college, props) {
    //backend contain selectivitychar and selectivity2
    //char is in format "5 less selective"
    //2 is in format 5
    var collegeSelectivityScore = college.selectivity2;
    var studentSelectivityScore = getStudentSelectivityScore(props);
    return compareSelecivityScores(studentSelectivityScore, collegeSelectivityScore);
}

function getStudentSelectivityScore(props) {
    var data = {
        gpa: props.props.info.gpa,
        act: props.props.info.act, 
        sat: props.props.info.sat
    };
    if(!data.act && !data.sat){
        return categorizeStudentSelectivityGPA(data.gpa);
    }
    else if(!data.act) {
        return categorizeStudentSelectivitySAT(data.gpa, data.sat);
    }
    else if(!data.sat) {
        return categorizeStudentSelectivityACT(data.gpa, data.act)
    }
    else {
        let scoreSAT = categorizeStudentSelectivitySAT(data.gpa, data.sat);
        let scoreACT = categorizeStudentSelectivityACT(data.gpa, data.act);
        if(scoreSAT < scoreACT) {
            return scoreSAT;
        }
        else {
            return scoreACT;
        }
    }
}


function compareSelecivityScores(studentSelectivityScore, collegeSelectivityScore) {
    if(studentSelectivityScore > collegeSelectivityScore) {
        return "reach";
    } else if(studentSelectivityScore < collegeSelectivityScore) {
        return "safety";
    } else {
        return "target";
    }
}


function categorizeStudentSelectivityGPA(gpa){
    //weighted scaling
    if(gpa > 4.0) {
        return 2;
    }
    else if(gpa >3.5) {
        return 3;
    }
    else if(gpa > 3.0) {
        return 4;
    }
    else if(gpa > 2.5) {
        return 5;
    }
    else {
        return 6;
    }
}
function categorizeStudentSelectivitySAT(gpa, sat) {
    if((gpa >= 3.50 && sat >= 1300) ||
       (gpa >= 3.75 && sat >= 1200)) {
        return 2;
    } 
    else if((gpa >= 3.00 && sat >= 1250) ||
            (gpa >= 3.25 && sat >= 1150) ||
            (gpa >= 3.75 && sat >= 1100) ||
            (gpa >= 4.00 && sat >= 1050)) {
        return 3;
    }
    else if((gpa >= 2.25 && sat >= 1400) ||
            (gpa >= 2.50 && sat >= 1050) ||
            (gpa >= 3.25 && sat >= 1000) ||
            (gpa >= 3.50 && sat >=  950)) {
        return 4;
    }
    else if((gpa >= 2.00 && sat >= 1050) ||
            (gpa >= 2.25 && sat >= 1000) ||
            (gpa >= 2.50 && sat >=  880) ||
            (gpa >= 3.5)) {
        return 5;
    }
    else {
        return 6;
    }
}
function categorizeStudentSelectivityACT(gpa, act) {
    if((gpa >= 3.50 && act >= 28) ||
       (gpa >= 3.75 && act >= 25)) {
        return 2;
    } 
    else if((gpa >= 3.00 && act >= 26) ||
            (gpa >= 3.25 && act >= 23) ||
            (gpa >= 3.75 && act >= 22) ||
            (gpa >= 4.00 && act >= 20)) {
        return 3;
    }
    else if((gpa >= 2.25 && act >= 31) ||
            (gpa >= 2.50 && act >= 20) ||
            (gpa >= 3.25 && act >= 19) ||
            (gpa >= 3.50 && act >= 18)) {
        return 4;
    }
    else if((gpa >= 2.00 && act >= 20) ||
            (gpa >= 2.25 && act >= 19) ||
            (gpa >= 2.50 && act >= 17) ||
            (gpa >= 3.5)) {
        return 5;
    }
    else {
        return 6;
    }
}


// affordability
function categorizeCollegeAffordability(college, props) {
    var data = {
        zipcode: parseInt(props.props.info.zip),
        ability: parseInt(props.props.info.famAfford),
        //the format of state must have S capitalized, I dont know why, ask the previous team
        studentState: props.props.info.State, 
        studentSelectivityScore: getStudentSelectivityScore(props), 
        universe: parseInt(college.universe), 
        collegeState: college.stabbr,
        collegeStateScore: parseInt(college.afford),
        control: parseInt(college.control),
        needMet: parseInt(college.needMet)
    }
    var studentAffordabilityScore;
    
    studentAffordabilityScore = affordabilityUniverse(data.universe);
    if(studentAffordabilityScore) {
        return studentAffordabilityScore;
    }
    studentAffordabilityScore = affordabilityCommuting(data.zipcode, data.state);
    if(studentAffordabilityScore) {
        return studentAffordabilityScore;
    }

    if(data.studentState.localeCompare(data.collegeState) === 0) {
        studentAffordabilityScore = affordabilityInStatePublic(data.collegeStateScore, data.studentSelectivityScore, data.ability);
        return studentAffordabilityScore
    }
    else if(data.control === 2) { 
        studentAffordabilityScore = affordabilityPrivate(data.ability, data.needMet);
        return studentAffordabilityScore
    }
    else if(data.control === 1 && data.studentState.localeCompare(data.collegeState) !== 0) {
        studentAffordabilityScore = affordabilityOOSPublic();
        return studentAffordabilityScore
    }
    else {
        //Should never get here 
        return "high"
    }
}


function affordabilityUniverse(universe) {
    if(universe !== 1) {
        return "high";
    } 
}
function affordabilityCommuting(zipcode, state) {
    //TODO: zip code comparison to get miles 
    //Probably needs an api
    const MAX_COMMUTING_DISTANCE = 25;//miles
}
function affordabilityInStatePublic(stateScore, selectivity, ability) {
    if((stateScore === 1) ||
        (stateScore === 2 && selectivity ===2) || 
        (stateScore === 2 && selectivity >=3 && ability >= 10000) ||
        (stateScore === 3 && ability >= 10000)) {
        return "low";
    }
    else {
        return "medium";
    }
}
function affordabilityPrivate(ability, needMet) {
    if((ability > 25000) ||
        (ability > 15000 && needMet >= .80) ||
        (ability > 10000 && needMet >= .85) || 
        (ability >  6000 && needMet >= .87) || 
        (ability >  1000 && needMet >= .90) || 
        (ability >     0 && needMet >= .90)) {
        return "low";    
    } else if((ability > 15000) ||
        (ability > 10000 && needMet >= .80) ||
        (ability >  6000 && needMet >= .85) || 
        (ability >     0 && needMet >= .87)) {
        return "medium"; 
    } else {
        return "high";
    }
}
function affordabilityOOSPublic (studentSelectivity, collegeSelectivity, ability ) { //TODO: some variables from website didnt make sense
    if(studentSelectivity === 2  ||
        studentSelectivity ===2  && ability >15000 && ability <25000 ||
        studentSelectivity ===2  && ability >25000) {
        return "low"
    } else if(studentSelectivity === 2 && ability >6000 && ability <15000 ||
        studentSelectivity ===2  && ability > 15000 && ability<25000 ||
        studentSelectivity ===2  && ability > 25000 ||
        studentSelectivity >=3 && ability > 15000 & ability <25000 ||
        studentSelectivity >=3 && ability >25000) {
        return "medium"
    } else {
        return "high"
    }
}

