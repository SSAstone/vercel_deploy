import dotenv from 'dotenv'
import MongoDBConnect from './lib/utils/mongodb_connect';
dotenv.config()
import app from './app'

const port = process.env.PORT || 3000;

console.log(process.env.NODE_ENV)

app.listen(port, async () => {
    await MongoDBConnect()    
    console.log(`Example app listening at http://localhost:${port}`)
})