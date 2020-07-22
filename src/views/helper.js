import React from 'react';
import '../css/CohortCreation.css';
import readXlsxFile from 'read-excel-file';
import {auth, db} from "../firebase/firebase";
import  { useState } from "react";
import { Button, Form, Group, FormControl, FormLabel } from "react-bootstrap";
import "./Account.css";
import { UserContext } from "../providers/UserProvider";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import * as Constants from "./helper";

// export const [cohort, setCohort] = useState("");
// export const user = useContext(UserContext);
// export const {displayName, email} = user;