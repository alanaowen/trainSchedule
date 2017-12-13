// Initialize Firebase
 var config = {
    apiKey: "AIzaSyBjoQfo5bT9Ow67M-_XA5yvyRELKnbEaDk",
    authDomain: "trainschedule-f7120.firebaseapp.com",
    databaseURL: "https://trainschedule-f7120.firebaseio.com",
    projectId: "trainschedule-f7120",
    storageBucket: "trainschedule-f7120.appspot.com",
    messagingSenderId: "1071278330839"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
 
  // on click event for the train button
  $("#addTrainBtn").on("click", function(){
  // get info
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainMoment = moment($("#first-input").val().trim(), "HH:mm").subtract(2, "minutes").format("X");
    var frequency = $("#frequency-input").val().trim();

  // object to hold train data
    var newTrain = {
    	name: trainName,
    	destination: destination,
    	firstTrain: firstTrainMoment,
    	frequency: frequency
    }
  // talk to firebase and upload new train
    database.ref("/trains").push(newTrain);

  // clear forms
     $("#name-input").val("");
     $("#destination-input").val("");
     $("#first-input").val("");
     $("#frequency-input").val("");

  });

  // add existing child and new child;  event callback is a snapshot with new child data
   database.ref().on("child_added", function(snapshot) {

 // more variables
   var tName = snapshot.val().name;
   var tDestination = snapshot.val().destination;
   var tFrequency = snapshot.val().frequency;
   var tFirstTrain = snapshot.val().firstTrain;

   // a bunch of math things (no clue how they actually work)
   var tRemainder = moment().diff(moment(tFirstTrain), "minutes") % tFrequency;
   var tMinutes = tFrequency - tRemainder;

   // some moment stuff for arrival time
   var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
   // append so the train will appear on the table
    $("#data > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });