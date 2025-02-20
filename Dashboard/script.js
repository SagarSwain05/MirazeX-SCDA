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
