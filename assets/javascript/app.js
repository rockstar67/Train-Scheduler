 
$(document).ready(function(){

  // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyC1WF1ZqHgzml_cCO77IrJhq6p1N6eZLPM",
        authDomain: "train-scheduler-752cf.firebaseapp.com",
        databaseURL: "https://train-scheduler-752cf.firebaseio.com",
        projectId: "train-scheduler-752cf",
        storageBucket: "train-scheduler-752cf.appspot.com",
        messagingSenderId: "196613881042",
        appId: "1:196613881042:web:7a9368aa48adf263ff410b",
        measurementId: "G-G0HMVJ60V6"
      };
      
      firebase.initializeApp(firebaseConfig);
    

    // A variable to reference the database.
    var database = firebase.database();

    // Capture Button Click
  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq
    });
  });


  // Create Firebase event for adding train to the database and row in the html when user adds an entry
  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");


    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute(s) Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Display On Page  
    // Clear input fields
    //Handle the errors
});

}); 