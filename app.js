// // pet api key 
// const apiKey="eEvCyZFrnCTWBwVbHkPtOo6rAiQjkRGqTIL0aXfJBoFS8GrXUP"
// //  secret key
// const secret = "4n6W8PmLHOSCIln6GnPajNnAq2WkEAnXAIqixMPg"

// Dependencies
// =============================================================
var express = require("express");
var petfinder = require("@petfinder/petfinder-js");
const { log } = require("console");
var client = new petfinder.Client({apiKey:"eEvCyZFrnCTWBwVbHkPtOo6rAiQjkRGqTIL0aXfJBoFS8GrXUP", secret:"4n6W8PmLHOSCIln6GnPajNnAq2WkEAnXAIqixMPg"} );

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.set("view engine", "ejs")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
let page = 1

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // calling our api
  client.animal.search({
        type: "Dog",
        page
      })
      .then(function (response) {
          // Do something with `aPi as JSON`
          let pets=[]
          let data = response.data;  
          var petData = JSON.stringify(data.animals);
          let petInfo = JSON.parse(petData);
    
          for(var i = 0; i < petInfo.length; i++){
            let pet = petInfo[i]
            let petPics = pet.photos
          
            if (petPics.length > 0){
              // console.log("this pet has a picture")
              // console.log(pet.photos[0].medium)
              pets.push(pet)
            }
          }
          //console.log("here", pets)
          res.render("index" , { pets });
      })
      .catch(function (error) {
          // Handle the error
          console.log(error)
      })
  
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT");
  });