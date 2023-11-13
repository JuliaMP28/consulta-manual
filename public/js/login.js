'use strict';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorAlert = document.getElementById('loginErrorAlert');

    const requestData = {
        username: username,
        password: password
    };

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(requestData), // Convert to JSON string
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            errorAlert.style.display = 'none';
            return response.json();
        })
        .then((data) => {
            // Handle the response data from your API here
            function setCookie(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }

            setCookie('token', data.token, 1)
            window.location = '/';
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
            errorAlert.style.display = 'block';
        });
}

function logout() {
    const deleteCookie = (cookieName) => {
        // Set the expiration date to a past date
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    deleteCookie('token');
    window.location = '/login';
}