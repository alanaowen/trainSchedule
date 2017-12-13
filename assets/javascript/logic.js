// Initialize Firebase
 var config = {
    apiKey: "AIzaSyBNVpUOu5illPztdwlz7nHJ6gXb2jHS5T0",
    authDomain: "train-to-hell.firebaseapp.com",
    databaseURL: "https://train-to-hell.firebaseio.com",
    projectId: "train-to-hell",
    storageBucket: "train-to-hell.appspot.com",
    messagingSenderId: "290747417309"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
 
  // on click event for the train button
  $("#addTrainBtn").on("click", function(event){
    event.preventDefault();
  // get info
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainMoment = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

  // object to hold train data
    var newTrain = {
    	name: trainName,
    	destination:, destination,
    	firstTrain: firstTrain,
    	frequency: frequency
    };
  // talk to firebase and upload new train
    database.ref().push(newTrain);

  // clear forms
     $("#name-input").val("");
     $("#destination-input").val("");
     $("#first-input").val("");
     $("#frequency-input").val("");

  })

 // more variables
   var tName = childSnapshot.val().name;
   var tDestination = childSnapshot.val().destination;
   var tFrequency = childSnapshot.val().frequency;
   var tFirstTrain = childSnapshot.val().firstTrain;

   // add existing child and new child;  event callback is a snapshot with new child data
   database.ref().on("child_added", function(snapshot) {
   	var sv = snapshot.val()                     
   })

   // a bunch of math things (no clue how they actually work)
   var tRemainder = moment().diff(moment(tFirstTrain), "minutes") % tFrequency;
   var tMinutes = tFrequency - tRemainder;

   // some moment stuff for arrival time
   var tArrival = moment.add(tMinutes, "m").format("hh:mm A");
   // append so the train will appear on the table
    $("#data > tbody").append("<tr><td>" + sv.tName + "</td><td>" + sv.tDestination + "</td><td>" + sv.tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  })