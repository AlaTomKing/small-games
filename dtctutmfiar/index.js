// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY4jXLbVurJsXjvoRlbu-kbJtuSBY1srs",
  authDomain: "small-games-c0dde.firebaseapp.com",
  projectId: "small-games-c0dde",
  storageBucket: "small-games-c0dde.firebasestorage.app",
  messagingSenderId: "816661747852",
  appId: "1:816661747852:web:f680f169a76c1efeb703a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
    },
  ],
  iceCandidatePoolSize: 10
};

let localConnection = null;
let remoteConnection = null;

let localChannel = null;
let receiveChannel = null;

const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
const sendButton = document.getElementById("send");
const messageBox = document.getElementById("msgbox");

function handleSendChannelStatusChange(event) {
  if (localChannel) {
    const state = localChannel.readyState;

    if (state === "open") {
      console.log("open");
    } else {
      console.log("closed");
    }
  }
}

function handleReceiveChannelStatusChange(event) {
  if (receiveChannel) {
    console.log(
      `Receive channel's status has changed to ${receiveChannel.readyState}`,
    );
  }
}

function receiveChannelCallback(event) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleReceiveMessage;
  receiveChannel.onopen = handleReceiveChannelStatusChange;
  receiveChannel.onclose = handleReceiveChannelStatusChange;
}

function handleCreateDescriptionError(error) {
  console.log(`Unable to create an offer: ${error.toString()}`);
}

function handleLocalAddCandidateSuccess() {
  connectButton.disabled = true;
}

function handleRemoteAddCandidateSuccess() {
  disconnectButton.disabled = false;
}

function handleAddCandidateError() {
  console.log("Oh noes! addICECandidate failed!");
}

function handleReceiveMessage(event) {
  console.log("message recieved: ", event.data, event)
}

function disconnectPeers() {
  // Close the RTCDataChannels if they're open.
  localChannel.close();
  receiveChannel.close();

  // Close the RTCPeerConnections
  localConnection.close();
  remoteConnection.close();

  localChannel = null;
  receiveChannel = null;
  localConnection = null;
  remoteConnection = null;

  console.log("network disconnected");
}

const setup = () => {
  console.log("click")

  console.log(firestore)

  // setup local channel
  localConnection = new RTCPeerConnection(servers);

  localChannel = localConnection.createDataChannel("localChannel");
  localChannel.onopen = handleSendChannelStatusChange;
  localChannel.onclose = handleSendChannelStatusChange;

  // setup local connection
  remoteConnection = new RTCPeerConnection(servers);
  remoteConnection.ondatachannel = receiveChannelCallback;

  // setup ice candidates
  localConnection.onicecandidate = (e) =>
    !e.candidate ||
    remoteConnection.addIceCandidate(e.candidate).catch(handleAddCandidateError);

  remoteConnection.onicecandidate = (e) =>
    !e.candidate ||
    localConnection.addIceCandidate(e.candidate).catch(handleAddCandidateError);
  
   // start connection attempt
  localConnection
    .createOffer()
    .then((offer) => { localConnection.setLocalDescription(offer); console.log(offer)})
    .then(() =>
      remoteConnection.setRemoteDescription(localConnection.localDescription),
    )
    .then(() => remoteConnection.createAnswer())
    .then((answer) => remoteConnection.setLocalDescription(answer))
    .then(() =>
      localConnection.setRemoteDescription(remoteConnection.localDescription),
    )
    .catch(handleCreateDescriptionError);
  
  console.log("network set up");
}

connectButton.onclick = setup;
disconnectButton.onclick = disconnectPeers;

sendButton.onclick = () => {
  localChannel.send(messageBox.value);
  
  console.log("sent");
}

console.log("running")