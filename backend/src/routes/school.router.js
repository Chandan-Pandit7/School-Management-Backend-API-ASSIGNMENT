import express from 'express';
const router = express.Router();

import {
     getAllSchools,
     createSchool,
     getSchoolById, 
     getListSchool
    } from '../controllers/school.controller.js';


router.post('/add-school', createSchool);
router.get('/all-schools', getAllSchools);
router.get('/list-school', getListSchool);

router.get('/get-school/:id', getSchoolById);

export default router