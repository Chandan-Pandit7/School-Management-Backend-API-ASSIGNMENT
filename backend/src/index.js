import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { checkConnection,createSchoolsTable } from './db/mysql.js';
import schoolRouter from './routes/school.router.js';


const PORT=process.env.PORT || 3000;
// console.log(PORT);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/school',schoolRouter);


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

checkConnection()
    .then(async () => {
        console.log('Database connection established successfully');
        await createSchoolsTable();

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);   
        })
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });