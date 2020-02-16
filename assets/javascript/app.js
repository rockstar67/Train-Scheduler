 
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
var database = firebase.database();

// 2. Button for adding train info
$("#add-train-btn").on("click", function (event) {

    event.preventDefault();

    // Grabs new train info from user input fields
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-destination-input").val().trim();
    var trainTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val();

    // Object for storing new train info
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };

    // Pushed train info into Firebase
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // Alert
    alert("New Train successfully added");

    // Clears all input fields
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

// 3. Create a way to retrieve train info from the train database.

// Firebase method used to trigger a function when new child is added to database
database.ref().on("child_added", function(childSnapshot, prevChildkey) {

    // Stores retrieved data into variables
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    // Format first train entry and convert it to 1 year ago
    var FirstTimeConv = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Grabs current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Calculates the difference between current time and first time variable 
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Finds the remainder between differnce in time and frequency for next arrival
    var tRemainder = diffTime % tFreq;
    console.log(tRemainder);

    // Subtracts remainder from frequency to calculate minutes til next arrival
    var tMinutesTillTrain = tFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Adds minutes til next train to current time to calculate next arrival
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    // Create new row in Display Div
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td><td>");
});
