import express from 'express';
const router = express.Router();

import {
     getAllSchools,
     createSchool,
     getSchoolById, 
     getListSchool
    } from '../controllers/school.controller.js';

    

//api for assignment school

router.post('/add-school', createSchool);
router.get('/list-school', getListSchool);




//extra api for school
router.get('/all-schools', getAllSchools);
router.get('/get-school/:id', getSchoolById);

export default router