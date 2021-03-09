
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const fname = (req.body.fname);
  const lname = (req.body.lname);
  const email = (req.body.email);
  const phone = (req.body.phone)
  const data = {
    members:[{
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME: fname,
        LNAME: lname,
        PHONE: phone
      }

    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/7bd30bef32";
  const option = {
    method: "post",
    auth: "dinesh:07b817d9ecd962684e4eb7378d5680fe-us7"
  };

const request =  http.request(url,option,function(responce){
  if (responce.statusCode===200){
    res.sendFile(__dirname +"/sucess.html");
  }else{
    res.sendFile(__dirname +"/failure.html");
  }
    responce.on("data",function(data){
    console.log(JSON.parse(data))
  });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started at port:3000")
});
