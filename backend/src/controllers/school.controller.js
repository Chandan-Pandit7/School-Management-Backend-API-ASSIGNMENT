import { pool } from '../db/mysql.js'; // Adjust the import based on your project structure
// import { pool } from '../db/mysql.js'; // Adjust the import based on your project structure

export const getAllSchools = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM schools');
        // console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}


// Function to get a list of schools sorted by distance from a given latitude and longitude
export const getListSchool = async (req, res) => {
    try {
        const { user_latitude, user_longitude } = req.query;

        if (!user_latitude || !user_longitude) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        const [schools] = await pool.execute("SELECT * FROM schools"); // table name assumed as 'schools'

        const sortedSchools = schools
            .map(school => {
                const distance = getDistance(
                    parseFloat(user_latitude),
                    parseFloat(user_longitude),
                    parseFloat(school.latitude),
                    parseFloat(school.longitude)
                );
                return { ...school, distance };
            })
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// Function to create a new school
export const createSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    // console.log( name, address, latitude, longitude);

    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }
   
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: 'Latitude must be between -90 and 90, and Longitude must be between -180 and 180' });
    }

    if (typeof name !== 'string' || typeof address !== 'string') {
        return res.status(400).json({ error: 'Name and Address must be strings' });
    }
   
    if (name.trim() === '' || address.trim() === '') {
        return res.status(400).json({ error: 'Name and Address must not be empty' });
    }
    if (latitude === 0 && longitude === 0) {
        return res.status(400).json({ error: 'Latitude and Longitude cannot both be zero' });
    }

    const [existingSchools] = await pool.execute(
      'SELECT id FROM schools WHERE name = ? and address = ?',
      [name, address]
    );

    if (existingSchools.length > 0) {
        return res.status(400).json({ error: 'School with this name and address already exists' });
    }

    try {
        const [result] = await pool.execute('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]);
        res.status(201).json({ 
            message: 'School added successfully',
            data: {
                id: result.insertId,
                name,
                address,
                latitude,
                longitude
            }
           });
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to get a school by ID
export const getSchoolById = async (req, res) => {
    const { id } = req.params; // Use req.query to get the id from the query parameters
    console.log(id);

    try {
        const [rows] = await pool.execute('SELECT * FROM schools WHERE id = ?', [id]);

        console.log(rows);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'School not found' });
        }

        res.status(200).json({message:"school fetched successfully",data:rows[0]});
    } 
    catch (error) {
        console.error('Error fetching school:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Function to update a school by ID
export const updateSchool = async (req, res) => {
    const { id } = req.params;
    const { name, address, latitude, longitude } = req.body;
    try {
        
        const [result] = await pool.execute('UPDATE schools SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?', [name, address, latitude, longitude, id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'School not found' });
        }
        res.status(200).json({ 
            data: result,
            message: 'School updated successfully' });
    } catch (error) {
        console.error('Error updating school:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Function to delete a school by ID
export const deleteSchool = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM schools WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'School not found' });
        }
        res.status(200).json({
             message: 'School deleted successfully',
             data: result
            });
    } 
     catch(error) {
        console.error('Error deleting school:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   