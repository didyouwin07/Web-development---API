const express= require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");

const app = express();

app.set('view-engine','ejs');

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/projectDB",{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

const teacherSchema={
  name:String,
  email:String,
  subject:String
};

const studentSchema={
  name:String,
  email:String,
  marks:Number,
  roll:Number
};

const adminSchema={
  name:String,
  email:String
};

const Teacher=mongoose.model("Teacher",teacherSchema);
const Student=mongoose.model("Student",studentSchema);
const Admin=mongoose.model("Admin",adminSchema);

/////////////////////////////////////////////////////Operations on teachers

app.route("/teachers")

.get(function(req,res){
  Teacher.find(function(err,teachers){
    if(teachers){
      const jsonTeacher=JSON.stringify(teachers);
      res.send(jsonTeacher);
    }else{
      res.send("No teacher currently in DB.");
    }
  });
})


.post(function(req,res){
  const newTeacher=Teacher({
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject
  });

  newTeacher.save(function(err){
    if(!err){
      res.send("Successfully added a new teacher");
    }else{
      res.send(err);
    }
  })

})

.delete(function(req,res){
  Teacher.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all the teachers in the database.");
    }else{
      res.send(err);
    }
  })
});

//////////////////Operations on individual teachers/////////////

app.route("/teachers/:teacherName")

.get(function(req,res){
  const teacherName=req.params.teacherName;
  Teacher.findOne({name:teacherName},function(err,teacher){
    if(teacher){
      const jsonTeacher=JSON.stringify(teacher);
      res.send(jsonTeacher);
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  const teacherName=req.params.teacherName;
  Teacher.findOneAndDelete({name:teacherName},function(err){
    if(!err){
      res.send("Successfully deleted one teacher.");
    }else{
      res.send(err);
    }
  })
})

.patch(function(req,res){
  Teacher.update(
    {name:req.params.teacherName,},
    {$set:req.body},
    function(err){
      if(!err){
        res.send("Successfully updated the teacher.");
      }else{
        res.send(err);
      }
    }
  );
});

/////////////////////////////////////////////Operation on students


app.route("/students")

.get(function(req,res){
  Student.find(function(err,students){
    if(students){
      const jsonStudent=JSON.stringify(students);
      res.send(jsonStudent);
    }else{
      res.send("No student currently in DB.");
    }
  });
})


.post(function(req,res){
  const newStudent=Student({
    name:req.body.name,
    email:req.body.email,
    marks:req.body.marks,
    roll:req.body.roll
  });

  newStudent.save(function(err){
    if(!err){
      res.send("Successfully added a new student");
    }else{
      res.send(err);
    }
  })

})

.delete(function(req,res){
  Student.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all the students in the database.");
    }else{
      res.send(err);
    }
  })
});

//////////////////Operations on individual students/////////////

app.route("/students/:studentName")

.get(function(req,res){
  const studentName=req.params.studentName;
  Student.findOne({name:studentName},function(err,student){
    if(student){
      const jsonStudent=JSON.stringify(student);
      res.send(jsonStudent);
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  const studentName=req.params.studentName;
  Student.findOneAndDelete({name:studentName},function(err){
    if(!err){
      res.send("Successfully deleted one student.");
    }else{
      res.send(err);
    }
  })
})

.patch(function(req,res){
  Student.update(
    {name:req.params.studentName,},
    {$set:req.body},
    function(err){
      if(!err){
        res.send("Successfully updated the student.");
      }else{
        res.send(err);
      }
    }
  );
});

///////////////////////////////////////////////////

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
