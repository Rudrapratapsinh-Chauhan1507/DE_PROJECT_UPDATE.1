document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded"); // Debugging: Check if script is running

    
    // Message search functionality
    const searchInput = document.getElementById("searchMessages");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            let filter = this.value.toLowerCase();
            let messages = document.querySelectorAll(".message");

            messages.forEach(function (message) {
                let text = message.textContent.toLowerCase();
                message.style.display = text.includes(filter) ? "block" : "none";
            });
        });
    }

    // Handle "My Network" click in home.html
    const myNetworkItem = document.getElementById("my-network");
    if (myNetworkItem) {
        myNetworkItem.addEventListener("click", function () {
            console.log("Navigating to Network Page"); // Debugging
            window.location.href = "network.html"; // Ensure navigation
        });
    }

    // Handle "Home" click in network.html
    const homeItem = document.getElementById("home-link");
    if (homeItem) {
        homeItem.addEventListener("click", function () {
            console.log("Navigating to Home Page"); // Debugging
            window.location.href = "home.html"; // Ensure navigation
        });
    }

    const findMentorLink = document.getElementById("find-mentor");

    if (findMentorLink) {
        findMentorLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default behavior
            window.location.href = "mentor.html"; // Redirect to mentor page
        });
    }

    // Find the messaging link in the navbar
    const messagingLink = document.getElementById("messaging-link");
    
    if (messagingLink) {
        messagingLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = "message.html"; // Navigate to messaging page
        });
    }

        const chatBox = document.getElementById("chatBox");
        const chatUser = document.getElementById("chatUser");
        let activeChat = null;
    
        function openChat(userName) {
            chatUser.textContent = userName;
            chatBox.innerHTML = `<p>Chat with ${userName} started...</p>`;
            activeChat = userName;
        }
    
        window.openChat = openChat;
    
        function sendMessage() {
            const messageInput = document.getElementById("messageInput");
            const messageText = messageInput.value.trim();
    
            if (messageText === "" || activeChat === null) return;
    
            const messageElement = document.createElement("p");
            messageElement.textContent = `You: ${messageText}`;
            messageElement.style.textAlign = "right";
    
            chatBox.appendChild(messageElement);
            messageInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    
        window.sendMessage = sendMessage;


    const notificationLink = document.getElementById("notification-link");
    
    if (notificationLink) {
        notificationLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = "notification.html"; // Navigate to messaging page
        });
    }

    const meetingLink = document.getElementById("meeting-link");
    
    if (meetingLink) {
        meetingLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = "meeting.html"; // Navigate to messaging page
        });
    }

    const peer = new Peer();

    const myVideo = document.getElementById("my-video");
    const peerVideo = document.getElementById("peer-video");
    const peerIdInput = document.getElementById("peer-id");
    const connectBtn = document.getElementById("connect-btn");
    const endCallBtn = document.getElementById("end-call-btn");
    const muteBtn = document.getElementById("mute-btn");

    let myStream;
    let currentCall;
    let isMuted = false;

    // Get user's media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        myVideo.srcObject = stream;
        myStream = stream;
    });

    // Generate & display Peer ID
    peer.on("open", id => {
        document.getElementById("my-id").textContent = id;
    });

    // Handle incoming calls
    peer.on("call", call => {
        call.answer(myStream);
        call.on("stream", userStream => {
            peerVideo.srcObject = userStream;
        });
        currentCall = call;
    });

    // Call & connect
    connectBtn.addEventListener("click", () => {
        const peerId = peerIdInput.value;
        if (!peerId) return alert("Enter a Peer ID!");
        
        const call = peer.call(peerId, myStream);
        call.on("stream", userStream => {
            peerVideo.srcObject = userStream;
        });
        currentCall = call;
    });

    // End call
    endCallBtn.addEventListener("click", () => {
        if (currentCall) {
            currentCall.close();
            peerVideo.srcObject = null;
        }
    });

    // Mute / Unmute
    muteBtn.addEventListener("click", () => {
        isMuted = !isMuted;
        myStream.getAudioTracks()[0].enabled = !isMuted;
        muteBtn.textContent = isMuted ? "🔊" : "🔇";
    });


    const followBtn = document.getElementById("followBtn");

    followBtn.addEventListener("click", function () {
        if (followBtn.textContent === "Follow") {
            followBtn.textContent = "Following"; // Change text
            followBtn.style.backgroundColor = "#007bff"; // Optional: Change color
            followBtn.style.color = "#000";
        } else {
            followBtn.textContent = "Follow"; // Change back
            followBtn.style.backgroundColor = "#007bff"; // Default color
            followBtn.style.color = "#fff";
        }
    });
    
});

const mentors = [
   
    {
        name: "Divya Patel",
        title: "Software Engineer at Microsoft",
        location: "Gujarat, India",
        bio: "Hello there! I'm Divya, a final year Computer Engineering student at LDCE...",
        connections: "93 mutual connections"
    },
    {
        name: "Rajveersinh Chavda",
        title: "Web Developer at Google",
        location: "Ahmedabad",
        bio: "JavaScript, Node.js, React | Web Development | AWS Cloud Practitioner...",
        connections: "100 mutual connection"
    },
    {
        name: "Karthik Applla",
        title: "Software Engineer at Apple",
        location: "New Delhi",
        bio: "Expert in AI, ML, and Cloud Technologies...",
        connections: "85 mutual connections"
    },
    {
        name: "Javed Khan",
        title: "Expert in Automations and Solar Systems",
        location: "Ahmedabad",
        bio: "Hello there! I'm Javed Khan, Expert in Automations and Solar Systems...",
        connections: "80 mutual connections"
    },
    // {
    //     name: "Nidhi Modi",
    //     title: "Python Developer",
    //     location: "Ahmedabad",
    //     bio: "Building innovative mobile apps using python...",
    //     connections: "150 mutual connections"
    // }
    {
        name: "Ankita Mewada",
        title: "Expert in Artificial Intelligence",
        location: "Ahmedabad",
        bio: "Hello there! I'm Ankita Mewada, Expert in Artificial Intelligence...",
        connections: "80 mutual connections"
    },
];

function searchMentors() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const filtered = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.location.toLowerCase().includes(query)
    );
    displayMentors(filtered);
}

function displayMentors(filteredMentors) {
    const mentorList = document.getElementById("mentorList");
    mentorList.innerHTML = ""; // Clear existing results

    filteredMentors.forEach(mentor => {
        const mentorDiv = document.createElement("div");
        mentorDiv.classList.add("mentor");
        mentorDiv.innerHTML = `
            <h3>${mentor.name}</h3>
            <p>${mentor.title}</p>
            <p>${mentor.location}</p>
            <button onclick="openProfile('${mentor.name}', '${mentor.title}', '${mentor.location}', '${mentor.bio}', '${mentor.connections}')">View Profile</button>
        `;
        mentorList.appendChild(mentorDiv);
    });
}




function openProfile(name, title, location, bio, connections) {
    const url = `profile1.html?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&bio=${encodeURIComponent(bio)}&connections=${encodeURIComponent(connections)}`;
    window.location.href = url;
}

document.getElementById("locationFilter").addEventListener("click", function() {
    const filtered = mentors.filter(mentor => mentor.location.toLowerCase().includes("ahmedabad"));
    displayMentors(filtered);
});

// Display all mentors initially
displayMentors(mentors);


 // Function to get query parameters from URL
//  function getQueryParams() {
//     const params = new URLSearchParams(window.location.search);
//     return {
//         name: params.get("name"),
//         title: params.get("title"),
//         location: params.get("location"),
//         bio: params.get("bio"),
//         connections: params.get("connections")
//     };
// }

// Load and display mentor data
function loadMentorProfile() {
    const mentor = getQueryParams();
    if (mentor.name) {
        document.getElementById("mentorName").textContent = mentor.name;
        document.getElementById("mentorTitle").textContent = mentor.title;
        document.getElementById("mentorLocation").textContent = mentor.location;
        document.getElementById("mentorBio").textContent = mentor.bio;
        document.getElementById("mentorConnections").textContent = mentor.connections;
    } else {
        document.querySelector(".profile-container").innerHTML = "<p>Mentor details not found.</p>";
    }
}

// // Call function on page load
// document.addEventListener("DOMContentLoaded", loadMentorProfile);

// function openProfile(name, title, location, bio, connections) {
//     const url = `profile1.html?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&bio=${encodeURIComponent(bio)}&connections=${encodeURIComponent(connections)}`;
//     window.location.href = url;
// }

let activeChat = "";

function openChat(user) {
    activeChat = user;
    document.getElementById("chatUser").innerText = user;
    document.getElementById("chatBox").innerHTML = `<p><strong>${user}:</strong> Hello! How can I help you?</p>`;
}

function sendMessage() {
    if (activeChat === "") {
        alert("Please select a chat first.");
        return;
    }

    let messageInput = document.getElementById("messageInput");
    let message = messageInput.value.trim();

    if (message !== "") {
        let chatBox = document.getElementById("chatBox");
        chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chatBox");
    const chatUser = document.getElementById("chatUser");
    let activeChat = null;

    function openChat(userName) {
        chatUser.textContent = userName;
        chatBox.innerHTML = `<p>Chat with ${userName} started...</p>`;
        activeChat = userName;
    }

    window.openChat = openChat;

    function sendMessage() {
        const messageInput = document.getElementById("messageInput");
        const messageText = messageInput.value.trim();

        if (messageText === "" || activeChat === null) return;

        const messageElement = document.createElement("p");
        messageElement.textContent = `You: ${messageText}`;
        messageElement.style.textAlign = "right";

        chatBox.appendChild(messageElement);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    window.sendMessage = sendMessage;
});


