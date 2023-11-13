'use strict'

function deleteManual(id) {

    console.log("delete => " + id)

    // fetch DELETE request to delete manual
    fetch('/api/manual/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            window.location = '/';
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });

}