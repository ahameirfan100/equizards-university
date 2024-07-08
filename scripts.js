document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
    initializeHeaderEventListeners();
});

function initializeHeaderEventListeners() {
    // Event listeners for auth buttons
    const signupButton = document.getElementById('signupButton');
    if (signupButton) {
        signupButton.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }

    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Toggle Dropdown Menu
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            profileDropdown.classList.toggle('show');
        });

        window.onclick = function(event) {
            if (!event.target.matches('#profile-icon')) {
                if (profileDropdown.classList.contains('show')) {
                    profileDropdown.classList.remove('show');
                }
            }
        };
    }

    // Toggle Mobile Navigation
    const nav = document.querySelector('nav ul');
    if (nav) {
        const navToggle = document.createElement('div');
        navToggle.classList.add('nav-toggle');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        nav.parentNode.insertBefore(navToggle, nav);

        navToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            auth.signOut().then(() => {
                window.location.href = 'index.html';
            }).catch(error => {
                console.error('Error signing out: ', error);
            });
        });
    }
}

// Function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.[^<>()[\]\.,;:\s@"]{2,}))$/i;
    return re.test(String(email).toLowerCase());
}

// Function to validate password
function validatePassword(password) {
    return password.length >= 8;
}

// Function to toggle the dropdown menu
function toggleDropdown() {
    document.getElementById("profileDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#profile-icon')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Google Sign-In
document.addEventListener('DOMContentLoaded', function() {
    const googleSignupButton = document.getElementById('googleSignup');
    if (googleSignupButton) {
        googleSignupButton.addEventListener('click', function() {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then(result => {
                    const user = result.user;
                    db.collection('users').doc(user.uid).set({
                        username: user.displayName,
                        email: user.email
                    })
                    .then(() => {
                        alert('User signed up successfully with Google!');
                        window.location.href = 'index.html';
                    })
                    .catch(error => {
                        console.error('Error saving user data: ', error);
                    });
                })
                .catch(error => {
                    console.error('Error signing in with Google: ', error);
                });
        });
    }

    const googleLoginButton = document.getElementById('googleLogin');
    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', function() {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then(result => {
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    console.error('Error signing in with Google: ', error);
                });
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (validateEmail(email) && validatePassword(password)) {
                auth.signInWithEmailAndPassword(email, password)
                    .then(() => {
                        window.location.href = 'index.html'; // Redirect to another page if needed
                    })
                    .catch(error => {
                        console.error('Error logging in: ', error);
                        alert('Invalid email or password.');
                    });
            } else {
                alert('Please enter valid email and password.');
            }
        });
    }

    // Monitor authentication state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            document.getElementById('signupButton').style.display = 'none';
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('profile-container').style.display = 'inline-block';
            document.getElementById('profile-icon').src = user.photoURL;
            document.getElementById('profile-name-text').textContent = user.displayName;
        } else {
            // User is signed out            document.getElementById('loginButton').style.display = 'block';
            document.getElementById('profile-container').style.display = 'none';
        }
    });

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            auth.signOut().then(() => {
                window.location.href = 'index.html';
            }).catch(error => {
                console.error('Error signing out: ', error);
            });
        });
    }
});

// Function to include HTML content
function includeHTML() {
    let z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

// Initialize event listeners and include HTML content
document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
    initializeHeaderEventListeners();
});

