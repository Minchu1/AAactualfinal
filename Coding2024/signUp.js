// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe3Ds40992d55G9_H0zqDff0nbi9zkS4I",
  authDomain: "aviaa-e4a59.firebaseapp.com",
  databaseURL: "https://aviaa-e4a59-default-rtdb.firebaseio.com", // Added database URL
  projectId: "aviaa-e4a59",
  storageBucket: "aviaa-e4a59.appspot.com",
  messagingSenderId: "41825275937",
  appId: "1:41825275937:web:e1ce96aecaa5dd8fff9360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Register function
function register(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email) || !validatePassword(password) || !validateField(username)) {
    alert('Username, Email, or Password is Outta Line!!');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add this user to Firebase Database
      const database_ref = ref(database, 'users/' + user.uid);

      // Create User data
      const user_data = {
        email: email,
        username: username,
        last_login: Date.now()
      };

      // Push to Firebase Database
      set(database_ref, user_data);

      // Done
      alert('User Created Successfully!');
      window.location.href = 'welcome.html'; // Redirect to a welcome page
    })
    .catch((error) => {
      const error_message = error.message;
      alert(error_message);
    });
}

// Log in function (not used in registration but can be utilized if needed)
function logIn(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Email or Password is incorrect');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add this user to Firebase Database
      const database_ref = ref(database, 'users/' + user.uid);

      // Update login time
      const user_data = {
        last_login: Date.now()
      };

      // Push to Firebase Database
      update(database_ref, user_data);

      // Done
      alert('User Logged In Successfully!');
      window.location.href = 'welcome.html'; // Redirect to a welcome page
    })
    .catch((error) => {
      const error_message = error.message;
      alert(error_message);
    });
}

// Validate email
function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

// Validate password
function validatePassword(password) {
  return password.length >= 6;
}

// Validate field
function validateField(field) {
  return field != null && field.length > 0;
}

// Add event listener to the register form
document.getElementById('registerButton').addEventListener('click', register);
