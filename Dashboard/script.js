document.addEventListener('DOMContentLoaded', function () {
  // Dark mode toggle
  var modeSwitch = document.querySelector('.mode-switch');
  modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });

  // List/Grid view toggles
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');

  listView.addEventListener('click', function () {
    gridView.classList.remove('active');
    listView.classList.add('active');
    projectsList.classList.remove('jsGridView');
    projectsList.classList.add('jsListView');
  });

  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    projectsList.classList.remove('jsListView');
    projectsList.classList.add('jsGridView');
  });

  // Show/hide the messages section
  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });
  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });

  // --- NEW CODE FOR AUTOMATIC DATE & OPINION ROTATION ---

  // 1) Overwrite each message's date with today's day & short month
  var today = new Date();
  // Example: "19 Feb" in Indian date style
  var options = { day: 'numeric', month: 'short' };
  var currentDate = today.toLocaleDateString('en-IN', options);

  // Grab all .time elements inside message-box
  var timeElements = document.querySelectorAll('.message-box .time');
  timeElements.forEach(function(elem) {
    elem.textContent = currentDate;
  });

  // 2) Cycle through all message boxes automatically
  var messageBoxes = document.querySelectorAll('.messages .message-box');
  var currentIndex = 0;

  // Hide all except the first
  messageBoxes.forEach(function(box, i) {
    if (i !== 0) {
      box.style.display = 'none';
    }
  });

  // Every 4 seconds, hide the current message and show the next
  setInterval(function() {
    // Hide current
    messageBoxes[currentIndex].style.display = 'none';
    // Move to next (wrap around at the end)
    currentIndex = (currentIndex + 1) % messageBoxes.length;
    // Show the next
    messageBoxes[currentIndex].style.display = 'flex';
  }, 4000);
});





document.addEventListener('DOMContentLoaded', function () {
  let projectBoxes = document.querySelectorAll('.project-box');

  projectBoxes.forEach(box => {
      box.addEventListener('click', function () {
          this.classList.toggle('expanded');
      });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  let projectBoxes = document.querySelectorAll('.project-box');

  // Define different details for each card
  let detailsData = [
      { reported: "2 days ago", reports: "5 people", status: "🔴 Pending" },
      { reported: "1 week ago", reports: "12 people", status: "🟠 In Progress" },
      { reported: "3 days ago", reports: "7 people", status: "🟢 Resolved" },
      { reported: "5 days ago", reports: "2 people", status: "🔴 Pending" },
      { reported: "4 hours ago", reports: "9 people", status: "🟠 In Progress" },
      { reported: "1 month ago", reports: "20 people", status: "🟢 Resolved" },
  ];

  projectBoxes.forEach((box, index) => {
      box.addEventListener('mouseenter', function () {
          let extraInfo = document.createElement('div');
          extraInfo.classList.add('extra-info');
          
          // Get details for this specific card (looping over data)
          let detail = detailsData[index % detailsData.length]; // Reuse data if more cards

          extraInfo.innerHTML = `
              <p><strong>🕒</strong> ${detail.reported}</p>
              <p><strong>💬</strong> ${detail.reports}</p>
              <p><strong>${detail.status}</strong></p>
          `;

          this.appendChild(extraInfo);
      });

      box.addEventListener('mouseleave', function () {
          let extraInfo = this.querySelector('.extra-info');
          if (extraInfo) {
              extraInfo.remove();
          }
      });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  let progressBars = document.querySelectorAll('.box-progress');
  let circularProgresses = document.querySelectorAll('.circular-progress');

  // Animate Progress Bars
  progressBars.forEach(bar => {
      let progressValue = parseInt(bar.getAttribute('data-progress')); // Get value
      setTimeout(() => {
          bar.style.width = progressValue + "%"; // Animate width smoothly
      }, 500);
  });

  // Animate Circular Progress Indicators
  circularProgresses.forEach(circle => {
      let progressValue = parseInt(circle.getAttribute('data-progress')); // Get value
      let degree = (progressValue / 100) * 360; // Convert to degrees
      setTimeout(() => {
          circle.style.setProperty('--progress-degree', degree + 'deg'); // Apply to CSS variable
          circle.innerText = progressValue + "%"; // Show percentage
      }, 500);
  });
});







window.addEventListener('scroll', function () {
  let parallax = document.querySelector('.parallax');
  if (parallax) {
      let scrollPosition = window.scrollY;
      parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Slower scroll for depth effect
  }
});





document.addEventListener('DOMContentLoaded', function () {
  let statusNumbers = document.querySelectorAll('.status-number');

  function animateNumbers(element, targetValue) {
      let currentValue = 0; // Start from 0
      let speed = Math.max(1, Math.floor(targetValue / 50)); // Speed factor
      element.innerText = currentValue;

      // Smooth fade-in effect
      setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0px)";
      }, 300);

      // Counting animation
      let counter = setInterval(() => {
          currentValue += speed;
          if (currentValue > targetValue) {
              currentValue = targetValue; // Ensure final value is accurate
          }
          element.innerText = currentValue;

          if (currentValue >= targetValue) {
              clearInterval(counter);
          }
      }, 30); // Speed of number counting animation
  }

  function startAnimation() {
      statusNumbers.forEach(num => {
          let targetValue = parseInt(num.getAttribute("data-value") || num.innerText.trim()); // Get final value

          if (!isNaN(targetValue) && targetValue > 0) {
              num.innerText = "0"; // Reset to 0 before animation
              animateNumbers(num, targetValue);
          }

          // Apply color based on category
          let category = num.nextElementSibling.innerText.toLowerCase(); // Get the status type text
          if (category.includes("completed")) {
              num.classList.add("completed");
          } else if (category.includes("ongoing") || category.includes("in progress")) {
              num.classList.add("in-progress");
          }
      });
  }

  // Run animation on load
  startAnimation();

  // Repeat animation every 5 seconds
  setInterval(() => {
      startAnimation();
  }, 5000);
});




document.addEventListener('DOMContentLoaded', function () {
  // Create Chatbot Container
  let chatbotContainer = document.createElement('div');
  chatbotContainer.classList.add('chatbot-container');
  document.body.appendChild(chatbotContainer);

  // Create Chatbot Close Button
  let closeButton = document.createElement('button');
  closeButton.classList.add('chatbot-close');
  closeButton.innerHTML = "✖";
  closeButton.addEventListener('click', function () {
      chatbotContainer.classList.remove('show'); // Hide chatbot
  });
  chatbotContainer.appendChild(closeButton);

  // Create Chatbot Icon
  let chatIcon = document.createElement('div');
  chatIcon.classList.add('chat-icon');
  chatIcon.innerHTML = "💬";
  document.body.appendChild(chatIcon);

  // Messages to Display (Loop)
  let messages = [
      "👋 Hello! Welcome to Pave Patrol.",
      "🚧 Report city issues like potholes, broken streetlights, or drainage problems.",
      "📸 You can even upload photos to support your complaint!",
      "✅ Your reports help make our city better!",
      "💡 Get involved! Every report counts."
  ];

  let messageIndex = 0;
  let messageInterval;

  function displayMessages() {
      chatbotContainer.innerHTML = ""; // Clear previous messages
      chatbotContainer.appendChild(closeButton); // Re-add close button

      function showNextMessage() {
          if (messageIndex < messages.length) {
              let chatMessage = document.createElement('div');
              chatMessage.classList.add('chat-message');
              chatMessage.innerText = messages[messageIndex];
              chatbotContainer.appendChild(chatMessage);

              // Animate message appearance
              setTimeout(() => {
                  chatMessage.classList.add('show');
              }, 200);

              messageIndex++;

              // Show the next message after 2 seconds
              setTimeout(showNextMessage, 4000);
          } else {
              // Restart cycle after 3-second delay
              messageIndex = 0;
              setTimeout(displayMessages, 3000);
          }
      }

      showNextMessage();
  }

  // Show chatbot automatically & start looping messages
  setTimeout(() => {
      chatbotContainer.classList.add('show');
      displayMessages();
  }, 2000);

  // Reopen chatbot when clicking on chat icon
  chatIcon.addEventListener('click', function () {
      chatbotContainer.classList.add('show');
      messageIndex = 0; // Restart from first message when reopened
      displayMessages();
  });
});




// document.addEventListener("DOMContentLoaded", function () {
//   const messagesContainer = document.querySelector(".messages");
//   const users = [
//     { name: "Liam_James", img: "https://randomuser.me/api/portraits/men/3.jpg" },
//     { name: "Sophia_Grace", img: "https://randomuser.me/api/portraits/women/4.jpg" },
//     { name: "Noah_Smith", img: "https://randomuser.me/api/portraits/men/5.jpg" },
//     { name: "Ava_Lopez", img: "https://randomuser.me/api/portraits/women/6.jpg" },
//     { name: "Oliver_Brown", img: "https://randomuser.me/api/portraits/men/7.jpg" },
//     { name: "Isabella_Jones", img: "https://randomuser.me/api/portraits/women/8.jpg" },
//   ];
//   const messagesText = [
//     "🔥 This website is so helpful!",
//     "Great initiative! Keep up the good work! 👏",
//     "I reported a pothole, and it was fixed within a week! Amazing! 😍",
//     "Can someone address the garbage collection problem in my area?",
//     "I love how easy it is to report problems. Kudos to the team! 👏",
//     "My issue got resolved within days! Love this platform! ❤️",
//   ];

//   function createMessage(user, text) {
//     let messageHTML = `
//       <div class="message-box">
//           <img src="${user.img}">
//           <div class="message-content">
//               <div class="message-header">
//                   <strong class="username">${user.name}</strong> <span class="time">${Math.floor(Math.random() * 60)} min ago</span>
//               </div>
//               <p>${text}</p>
//               <div class="message-reactions">
//                   <span class="like-btn">❤️ <span class="like-count">${Math.floor(Math.random() * 20)}</span></span>
//                   <span class="like-btn">👍 <span class="like-count">${Math.floor(Math.random() * 15)}</span></span>
//                   <span class="like-btn">🔥 <span class="like-count">${Math.floor(Math.random() * 10)}</span></span>
//               </div>
//           </div>
//       </div>`;
//     return messageHTML;
//   }

//   function addNewMessage() {
//     // Select a random user and message
//     let user = users[Math.floor(Math.random() * users.length)];
//     let messageText = messagesText[Math.floor(Math.random() * messagesText.length)];

//     // Create the message and add it to the container
//     let newMessage = document.createElement("div");
//     newMessage.innerHTML = createMessage(user, messageText);
//     newMessage = newMessage.firstElementChild;
//     messagesContainer.appendChild(newMessage);

//     // If messages exceed 6, remove the oldest with an animation
//     if (messagesContainer.children.length > 6) {
//       let firstMessage = messagesContainer.children[0];
//       firstMessage.style.animation = "messageScrollUp 0.5s ease-in-out forwards";
//       setTimeout(() => firstMessage.remove(), 500);
//     }

//     // Scroll to the bottom smoothly
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
//   }

//   // Generate 15-20 random messages on page load
//   for (let i = 0; i < 15; i++) {
//     let user = users[Math.floor(Math.random() * users.length)];
//     let messageText = messagesText[Math.floor(Math.random() * messagesText.length)];
//     messagesContainer.innerHTML += createMessage(user, messageText);
//   }

//   // Add a new message every 5 seconds
//   setInterval(addNewMessage, 5000);

//   // Like Button Click Effect
//   document.addEventListener("click", function (event) {
//     if (event.target.closest(".like-btn")) {
//       let countSpan = event.target.querySelector(".like-count");
//       let currentCount = parseInt(countSpan.innerText);
//       countSpan.innerText = currentCount + 1; // Increase like count
//     }
//   });
// });






document.addEventListener("DOMContentLoaded", function () {
  let progressBars = document.querySelectorAll(".box-progress");

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      let progressValue = parseInt(bar.getAttribute("data-progress")); // Get assigned progress percentage

      // Reset bar width to 0 before animating
      bar.style.width = "0%";

      setTimeout(() => {
        let start = 0;
        let interval = setInterval(() => {
          if (start >= progressValue) {
            clearInterval(interval); // Stop animation when reaching actual value

            // Pause for 2 seconds before resetting
            setTimeout(() => {
              bar.style.width = "0%"; // Reset to 0%
              animateProgressBars(); // Restart the animation
            }, 2000);
          } else {
            start++;
            bar.style.width = start + "%";
          }
        }, 20); // Controls the speed of progress increase
      }, 500); // Small delay before the animation starts
    });
  }

  // Start the animation loop
  animateProgressBars();
});




