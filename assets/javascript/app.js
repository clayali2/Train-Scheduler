var config = {
    apiKey: "AIzaSyClJJz8g4_L0bpfbRn8rd3h3uR7FcCq6YE",
    authDomain: "traintime-3ecd7.firebaseapp.com",
    databaseURL: "https://traintime-3ecd7.firebaseio.com",
    projectId: "traintime-3ecd7",
    storageBucket: "traintime-3ecd7.appspot.com",
    messagingSenderId: "143709394739"
  };
  firebase.initializeApp(config);
var trainData = firebase.database();

$("#addTrainBtn").on("click", function(event){
 event.preventDefault();
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();
	console.log(trainName);
	
	trainData.ref().push({
        name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
      });
	
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;
});


trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrainUnix;

	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	console.log(tMinutes);
	console.log(tArrival);

	console.log(moment().format("hh:mm A"));
	console.log(tArrival);
	console.log(moment().format("X"));

	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});

