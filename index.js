const express = require('express');
const app = express();
const port = 3000;
const db = require("./config/mongoose");
const Problem = require('./models/problem');
const Submission = require('./models/submission');
const { makeFile } = require('./makeFile');
const { executeCpp } = require('./executeCpp');
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");

// for reading form data
app.use(express.urlencoded({extended: true}));

// for static files
app.use(express.static("./assets"));

// setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.get('/',(req,res)=>{
    Problem.find({}, (err,problems)=>{
        return res.render('home',{
            all_problems:  problems
        });
    }) 
});
// showing problem setting page
app.get('/makeProblem',(req,res)=>{
    res.render('makeProblem');
})

// for making problem 
app.post('/create',(req,res)=>{
    Problem.create({
        statement: req.body.statement,
        name: req.body.name,
        input: req.body.input,
        output: req.body.output
    });
    res.redirect('back');
})

// problem page
app.get('/problem/:id',(req,res)=>{
    Problem.findById(req.params.id,function(err,problem){
        if(err){
            console.log(err);
            return;
        }
        return res.render('problem', {
            problem: problem
        })
    })
})

app.post('/run/:id',async (req,res)=>{
    // for now we are not taking any other language 
    const {code} = req.body;

    const useroutput = path.join(__dirname,'/useroutput.txt');
    const testoutput = path.join(__dirname,'/output.txt');

    let problem = await Problem.findById(req.params.id);
    try{
        await makeFile(code,req.params.id);
        const output = await executeCpp();
        // console.log(output);
        await fs.writeFileSync(useroutput, output );
        if(output == problem.output ){
            console.log('correct output');
        }
        else{
            console.log('incorrect output');
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
})

app.listen(port, (err) => {
    if (err) console.log(`error in running the server ${err}`);
    console.log(`server running on port: ${port}`);
});