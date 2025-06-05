import mysql2 from 'mysql2/promise';


const pool = mysql2.createPool({
  host: process.env.RAILWAY_HOST,
  user: process.env.RAILWAY_DB_USER   ,
  password: process.env.RAILWAY_DB_PASSWORD ,
  database: process.env.RAILWAY_DB_NAME,
  connectionLimit: 10,
  queueLimit:0,
  waitForConnections: true,

});

const createSchoolsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude DECIMAL(9,6) NOT NULL,
      longitude DECIMAL(9,6) NOT NULL,
     
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`
try{
    await pool.execute(query);
}
catch (error) {
    console.error('Error creating schools table:', error);
}

};


const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    // Uncomment the next line to create the schools table if it doesn't exist
    await createSchoolsTable();
    

    // await connection.query(query);
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}
export { pool, checkConnection ,createSchoolsTable};