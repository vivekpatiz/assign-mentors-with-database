const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
const mongodb = require("mongodb")
const URL = "mongodb+srv://vivek:Vivek123@db.vppcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const DB = "sample"


let mentors = []

app.listen(process.env.PORT || 3000)

app.listen(process.env.PORT || 3000)

//Display all students
app.get("/students", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB)
        let students = await db.collection("students").find().toArray()
        res.json(students)
    } catch (error) {
        console.log(error)
    }
})

//Add students 
app.post("/student", async function (req, res) {
    let connection = await mongodb.connect(URL)
    let db = connection.db(DB)
    db.collection("students").insertOne(req.body)
    connection.close()
    res.json({
        "message": "Done"
    })
})

app.get("/student/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB)
        let students = await db.collection("students").findOne({ _id: mongodb.ObjectID(req.params.id) })
        res.json(students)
    } catch (error) {
        console.log(error)
    }
})

app.put("/student/:id", async function (req, res) {
    try {
        let connection = mongodb.connect(URL)
        let db = (await connection).db(DB)
        await db.collection("students").updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body })
        res.json({
            message: "Updated"
        })
    } catch (error) {
        console.log(error)
    }

})

app.delete("/student/:id", async function (req, res) {
    try {
        let connection = mongodb.connect(URL)
        let db = (await connection).db(DB)
        await db.collection("students").deleteOne({ _id: mongodb.ObjectID(req.params.id) })
            ; (await connection).close()
        res.json({
            message: "Deleted"
        })
    } catch (error) {
        console.log(error)
    }
})





//Display all mentors
app.get("/mentors", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB)
        let mentors = await db.collection("mentors").find().toArray()
        res.json(mentors)
    } catch (error) {
        console.log(error)
    }
})

//Add Mentor
app.post("/mentor", async function (req, res) {
    let connection = await mongodb.connect(URL)
    let db = connection.db(DB)
    db.collection("mentors").insertOne(req.body)
    res.json({
        "message": "Done"
    })
})

//Api to assign a student to mentor
app.put("/mentor/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB)
        let mentorId = req.params.id;
        // console.log(mentorId) 
        let updateData = req.body;
        // console.log(updateData)
        await db.collection("mentors").updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body })
        // let mentors = await db.collection("mentors").find().toArray()
        // let students = await db.collection("students").find().toArray()
        // let studentIndex = students.findIndex((obj) => obj.studentname == updateData.studentName)
        // console.log(studentIndex)
        // console.log(students[studentIndex])
        // var stud = students[studentIndex];
        // console.log(stud.studentname)
        // await db.collection("students").updateOne({studentname:updateData.studentName},{$set: students[studentIndex].studentname})
        // console.log(students[studentIndex])
        
        res.json({
            message: "Updated Succesfully"
        })
    } catch (error) {
        console.log(error)
    }



    // mentorId = req.params.id;
    // updateData = req.body;
    // // console.log(updateData);
    // let mentorIndex = mentors.findIndex((obj) => obj.id == mentorId)
    // let mentorData = mentors[mentorIndex];
    // // console.log(mentorData)
    // //Update the particular key
    // if (mentorData) {
    //     Object.keys(updateData).forEach((keyItem) => {
    //         mentorData[keyItem] = updateData[keyItem]
    //     })

    //     mentors[mentorIndex] = mentorData;
    //     let tempAdd = mentors[mentorIndex].studentname;
    //     let studentIndex = students.findIndex((obj) => obj.studentname == tempAdd)
    //     // console.log(studentIndex);
    //     // console.log(students[studentIndex])
    //     let studentData = students[studentIndex];
    //     // console.log(studentData.studentname);
    //     studentData["mentorname"] = mentors[mentorIndex].mentorname;

    //     res.json({
    //         "message": "Updated Successfully"
    //     })
    // } else {
    //     res.json({
    //         "message": "No User Found"
    //     })
    // }
})

//Assign mentor to student
app.put("/student/:id", async function (req, res) {
    
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB)
        let studentId = req.params.id;
        // console.log(mentorId) 
        let updateData = req.body;
        // console.log(updateData)
        await db.collection("students").updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body })
        res.json({
            message : "Updated Successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

//Display all students for mentor 
app.get("/mentorstudent/:id",async function(req,res){
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB)
        let mentorId = req.params.id;
        let mentors = await db.collection("mentors").find().toArray()
        let studentIndex = mentors.findIndex((obj) => obj._id == mentorId)
        res.json({
            students : mentors[studentIndex].studentName
        })
    } catch (error) {
        console.log(error)
    }
})
