# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


const express = require('express')
const connectDB = require('cors')
const cors = require('../server/src/config/db')
const Event = require('../server/src/models/events.model')
const Guest = require('../server/src/models/guests.model')
const Task = require('../server/src/models/tasks.model')
const Budget = require('../server/src/models/budget.model')
const User = require('../server/src/models/users.model');
const Invite = require('../server/src/models/invitationschema');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { nanoid } = require("nanoid");


const app = express()
app.use(cors())
app.use(express.json())


const JWT_SECRET = "mysecretkey123";
const authMiddleware = (req,res,next)=>{
  try{

    const token = req.headers.authorization;

    if(!token){
      return res.status(401).json({message:"No token"});
    }

    const decoded = jwt.verify(
      token.split(" ")[1],
      JWT_SECRET
    );

    req.user = decoded;

    next();

  }catch(error){
    return res.status(401).json({message:"Invalid token"});
  }
};
//decoded.id;
connectDB('mongodb://localhost:27017/event-planner')
.then(()=> console.log('connected succesfully'))
.catch(err => console.log('error', err))

// create event route

app.post("/event", authMiddleware, async (req, res) => {
  const {eventname,eventdate,eventtime,venue,eventtype,eventtheme,guestcount,eventsettings,guests} = (req.body)
  if (!guests || guests.length==='0') {
     res.status(404).json({ message: 'select at least one guest'})
  }
  const events = await Event.create({
   userId: req.user.id,
   eventname: eventname,
   date: eventdate,
   time: eventtime,
   venue: venue,
   eventtype: eventtype,
   eventtheme: eventtheme,
   guestcount: guestcount,
   eventsettings: eventsettings,
   guests: guests,
  });

  const invitations = guests.map((guestId)=>({
     eventId: events._id,
     guestId,
     invitecode: nanoid(10),
  }));
  await Invite.insertMany(invitations);
  console.log("Invitations:", invitations);
  res.status(201)
  .json({message: 'invitation code with event created successfully', events,invitations});
});

// read event route

app.get("/events", authMiddleware,  async (req, res) => {
  const events = await Event.find({ userId: req.user.id });
  res.json(events);
});
app.get("/api/events", authMiddleware,  async (req, res) => {
  try {
    const{ search, sort} = req.query;
    console.log('not getting query',req.query)
    console.log('not getting value',sort)
    {/*if(!search){
      const allevents = await Event.find();
      return res.json(allevents)
    } */}
    let query = {
     $or: [
      {eventname: { $regex: search, $options: 'i'}},
      {date : { $regex: search}},
      {time : { $regex: search, $options: 'i'}},
      {venue : { $regex: search, $options: 'i'}},
    ]};
    let sortOption = {};
    if(sort === 'newest_events' ) sortOption.date = -1;

    if(sort === 'oldest_events') sortOption.date = 1;
    
        
    console.log(sortOption)
    const searchdata = await Event.find(query).sort(sortOption)
    res.json(searchdata);
  } catch (error) {
    console.error(error)
  }
});


app.get("/invitations/:id", authMiddleware, async (req, res) => {
  try {
    const invites = await Invite.find({
      eventId: req.params.id, // ✅ correct field
    }).populate("guestId");

    console.log("Invites:", invites);

    res.json(invites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// read event by id route

app.get("/events/:id", authMiddleware, async (req, res) => {
  const events = await Event.findOne({_id: req.params.id, userId: req.user.id });
  res.json(events);
  

});

// update event route

app.put("/updateevents/:id", authMiddleware, async (req, res) => {
  try{
  const {id} = req.params;
  const Updates = req.body;
  const updatedevent = await Event.findOneAndUpdate({_id: id, userId: req.user.id},Updates,{returnDocument: "after"});
  res.json(updatedevent);
  } catch (error) {
     console.error('error in update from server',error)
  }
});

// delete event route

app.delete("/events/:id", authMiddleware, async (req, res) => {
  try{
  const {id} = req.params;
  const deletedevent = await Event.findOneAndDelete({_id: id, userId: req.user.id});
  res.json(deletedevent);
  } catch (error) {
     console.error('error in update from server',error)
  }
});
// create guest route
app.post("/createguest",authMiddleware, async (req, res) => {
  const {guestname,guestemail,guestphone,status} = (req.body)
  const gcrd = await Guest.create({
   userId: req.user.id,
   guestname: guestname,
   guestemail: guestemail,
   guestphone: guestphone,
   status: status,

  })
  res.send(gcrd);
  
});

// read guest route
app.get("/guests",authMiddleware, async (req, res) => {
  try {
    const guests = await Guest.find({userId: req.user.id});
    res.json(guests);
  } catch (error) {
    console.error(error)
  } 
});

// read by id guest route
app.get("/guests/:id",authMiddleware, async (req, res) => {
  try {
    const guest = await Guest.findOne({_id: req.params.id, userId: req.user.id});
    res.json(guest);
  } catch (error) {
    console.error(error)
  }
  

});

// update guest route
app.put("/updateguests/:id",authMiddleware, async (req, res) => {
  try{
  const {id} = req.params;
  const Updates = req.body;
  const updatedguest = await Guest.findOneAndUpdate({_id: id, userId: req.user.id},Updates,{returnDocument: "after"});
  res.json(updatedguest);
  } catch (error) {
     console.error('error in update from server',error)
  }
});

// delete guest route
app.delete("/guests/:id",authMiddleware, async (req, res) => {
  try{
  const {id} = req.params;
  const deletedguest = await Guest.findOneAndDelete({_id: id,userId: req.user.id});
  res.json(deletedguest);
  } catch (error) {
     console.error('error in update from server',error)
  }
});

app.post('/createtask',authMiddleware, async (req,res) => {
   try{
  const {name,deadline,task,taskstatus} = (req.body)
    const createdtask = await Task.create({
      userId: req.user.id,
      name: name,
      deadline: deadline,
      task: task,
      taskstatus: taskstatus
    })
    res.send(createdtask)
  } catch (error) {
    console.error(error)
  }
});

// read tasks route

app.get('/tasks',authMiddleware, async (req,res) => {
  try{
  const rtask = await Task.find({userId: req.user.id});
  res.send(rtask)
  
  } catch(error) {
    console.error(error)
  }
});

app.get('/api/tasks',authMiddleware, async (req,res) => {
  try{
    const { search, sort } = req.query;

    let query = {
      $or:[
          {name: {$regex: search, $options: 'i'}},
          {deadline: { $regex: search}},
          {task: { $regex: search, $options: 'i'}},
          {taskstatus: { $regex: search, $options: 'i'}},
      ]
    };
       console.log(search,sort)

    let sortOptions = {};
    if (sort === 'new_task') sortOptions.date = -1;
    if (sort === 'old_task') sortOptions.date = 1;
    console.log(sortOptions)

  const rtask = await Task.find(query).sort(sortOptions);

  res.json(rtask)
  
  } catch(error) {
    console.error(error)
  }
});

// read tasks by id
app.get('/tasks/:id',authMiddleware, async (req,res)=>{
   try {
     const rTask = await Task.findOne({ _id: req.params.id, userId: req.user.id})
     console.log("Task found:", rTask)
     res.json(rTask)
   } catch (error) {
     console.error(error)
   }
});

// update task route

app.put('/updatetasks/:id',authMiddleware, async (req,res) => {
   try {
     const { id } = req.params
     const update = req.body
     const utdtask = await Task.findOneAndUpdate({_id: id, userId: req.user.id}, update, {returnDocument: "after"});
     res.json(utdtask)
   } catch (error) {
     console.error(error)
   }
})

// delete task route
app.delete('/tasks/:id',authMiddleware, async (req,res)=>{
   try{
    const { id } = req.params
    const deletetask = await Task.findOneAndDelete({_id: id, userId: req.user.id});
    res.status(200).json({message:'task deleted successfully', task: deletetask})
   } catch(error) {
    console.error(error)
   }

})

// create budget route
app.post('/createbudget',authMiddleware, async (req,res)=> {
   try {
     const { category, budgets, spent, remaining } = req.body;
     const ctdBudget = await Budget.create({
       userId: req.user.id,
       category,
       budgets,
       spent,
       remaining
     });
     res.send(ctdBudget);
   } catch (error) {
     console.error(error)
   }
});

// read budget route
app.get('/budgets',authMiddleware, async (req,res) => {
   try {
     const readbudget = await Budget.find({userId: req.user.id});
     res.send(readbudget);
   } catch (error) {
     console.error(error)
   }
})

// read budget by id
app.get('/budgets/:id',authMiddleware, async (req,res)=>{
   try {
     const { id } = req.params;
     const rbubyid = await Budget.findOne({_id: id, userId: req.user.id});
     res.json(rbubyid)
   } catch (error) {
     console.error(error);
   }
})

// update budget route
app.put('/updatebudget/:id',authMiddleware, async (req,res)=>{
   try {
     const { id } = req.params;
     const updatebud = req.body;
     const updatedbudget = await Budget.findOneAndUpdate({_id: id, userId: req.user.id},updatebud, {returnDocument: "after"});
     res.send(updatedbudget)
   } catch (error) {
     console.error(error)
   }
});

// delete budget route
app.delete('/deletebudget/:id',authMiddleware, async (req,res)=>{
   try {
     const { id } = req.params;
     const deletedbudget = await Budget.findOneAndDelete({ _id: id, userId: req.user.id});
     res.json(deletedbudget)
   } catch (error) {
     console.error(error)
   }
})

// create user route
app.post('/createuser', async (req,res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message:"User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const createduser = await User.create({
       username,
       email,
       password: hashedPassword
    });
    res.json({User:{
        id:createduser._id,
        username:createduser.username,
        email:createduser.email}});
    console.log(createduser)
  } catch (error) {
    console.error(error);
  };
});

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//update User info
app.put('/profileupdate', authMiddleware, async (req,res) => {
  try {
      const { username, email} = req.body;
      const updateprofile = await User.findByIdAndUpdate( req.user.id, { username, email }, { new: true } ).select('-password');
      if(updateprofile) {
        
      res.status(200).json({success: true, message: 'profile updated successfully', data: updateprofile})
      }
  } catch (error) {
    console.error(error)
  }
})

// login user route
app.post("/login", async (req,res)=>{

  try {

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign(
      {id:user._id,
       email: user.email
      },
      JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({
      token,
      user:{
        id:user._id,
        username:user.username,
        email:user.email
      }
    });

  } catch (error) {
    console.error(error);
  }

});



app.listen(5000, () => 
  console.log('server strarted on port 5000'))

