import express from 'express';
const router = express.Router();

import {
     getAllSchools,
     createSchool,
     getSchoolById, 
    } from '../controllers/school.controller.js';


router.post('/add-school', createSchool);
router.get('/list-schools', getAllSchools);
router.get('/get-school/:id', getSchoolById);

export default router