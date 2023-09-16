const express = require('express');
const mongoose = require('mongoose')
var cors = require('cors');
const user = require('./models')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3002;
const app = express();
mongoose.connect(process.env.DB_PATH).then((res)=>{console.log('connected to mongodb');}).then((res)=>{
    app.listen(PORT, () => { console.log(`listening to port ${PORT}`); })
})


async function getAllData() {
    try {

        // Find the first document in the collection
        const first = await user.find();
        return first;
    } catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    } finally {
        // Close the database connection when finished or an error occurs
    }
}

async function getDataById(id) {
    try {

        // Find the first document in the collection
        const first = await user.findById(id);
        return first;
    } catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    } finally {
        // Close the database connection when finished or an error occurs
    }
}

async function inserDataBase(data) {

    var success = false;

    try {
        await user.create(data)
        success = true;
    } catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    } finally {
        // Close the database connection when finished or an error occurs
        return success
    }
}

async function updatedData(id, databody) {
    var success = false;
    try {
        let dat = await user.findById(id);
        await dat.updateOne(databody)
        await dat.save();
        success = true;
    } catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    } finally {
        // Close the database connection when finished or an error occurs
        return success;
    }
}

async function deleteDocument(id) {
    var success = false;
    try {
        await user.findByIdAndDelete(id)
        success = true;
    } catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    } finally {
        // Close the database connection when finished or an error occurs
        return success;
    }
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.send(await getAllData());
    // res.sendFile(__dirname+'/pages/insertData.html')
})

app.get('/:id', async (req, res) => {
    res.send(await getDataById(req.params.id));
})

app.post('/add', async (req, res) => {
    console.log(req.body);
    var ret = await inserDataBase(req.body);
    if (ret) {
        res.send(req.body)
    } else {
        res.status(500).json({msg:'validation error'});
    }
})

app.delete('/:id', (req, res) => {
    deleteDocument(req.params.id)
    res.send(req.params.id);
})

app.put('/:id', (req, res) => {
    var data = { ...req.body };
    delete data._id;
    console.log(data);
    updatedData(req.params.id, data)
    res.send('updated Succesfully')
})

