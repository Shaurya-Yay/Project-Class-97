const config = {
    apiKey: "AIzaSyAz9uW9JiLJ8und1Vniw6tzCovQ0esn3Ms",
    authDomain: "lets-chat-830a8.firebaseapp.com",
    databaseURL: "https://lets-chat-830a8-default-rtdb.firebaseio.com",
    projectId: "lets-chat-830a8",
    storageBucket: "lets-chat-830a8.appspot.com",
    messagingSenderId: "1047268768037",
    appId: "1:1047268768037:web:837d1559829a69297382cc",
    measurementId: "G-9ZLKCYWG9H"
};
// Initialize Firebase
firebase.initializeApp(config);



user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "chatroom_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML = row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "chatroom_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}