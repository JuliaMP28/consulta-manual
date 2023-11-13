'use strict'

function showEditManual(id) {
   window.location = '/edit?id=' + id;
}

// update manual function to call put method
function updateManual(id) {
   const name = document.getElementById('manualName');
    const link = document.getElementById('manualLink');
    const model = document.getElementById('model');
    const manufacturer = document.getElementById('manufacturer');
    const type = document.getElementById('type');
    const restricted = document.getElementById('restrictedAccess');

    const errorCreateMsg = document.getElementById('errorCreateMsg');
    const successCreateMsg = document.getElementById('successCreateMsg');

    const requestData = {
        name: name.value,
        link: link.value,
        model: model.value,
        manufacturer: manufacturer.value,
        type: type.value,
        isRestricted: restricted.checked
    };

    fetch('/api/manual/' + id, {
        method: 'PUT',
        body: JSON.stringify(requestData), // Convert to JSON string
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
      })
        .then((response) => {
            if (!response.ok) {
                response.json().then((e) => {
                    const errorList = document.getElementById("errorList");
                    errorList.innerHTML = ''; // Clear previous errors
                    e.errors.forEach(errorMessage => {
                        const listItem = document.createElement("li");
                        listItem.textContent = errorMessage.msg;
                        errorList.appendChild(listItem);
                    });
                    errorCreateMsg.style.display = 'block';
                    successCreateMsg.style.display = 'none';
                });
                throw new Error('Network response was not ok');
            }
            errorCreateMsg.style.display = 'none';
            successCreateMsg.style.display = 'block';

            // clean value of all fields
            name.value = '';
            link.value = '';
            model.value = '';
            manufacturer.value = '';
            type.value = '';
            restricted.checked = false;
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
}