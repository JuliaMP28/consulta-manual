'use strict'


function showDetails(id) {
    const divNameDetails = document.getElementById('nameDetails');
    const typeDetails = document.getElementById('typeDetails');
    const manufacturerDetails = document.getElementById('manufacturerDetails');
    const modelDetails = document.getElementById('modelDetails');
    const linkDetails = document.getElementById('linkDetails');
    const restrictedAccessDetails = document.getElementById('restrictedAccessDetails');
    const openFileButton = document.getElementById('openFileButton');
    const deleteButton = document.getElementById('deleteButton');
    const editButton = document.getElementById('editButton');

    const noContentMessage = document.getElementById('noContentSelectedMessage');
    const contentMessage = document.getElementById('detailsContentDiv');

    fetch('/api/manual/' + id, {
        method: 'GET'
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Handle the response data from your API here
            divNameDetails.innerHTML = data.name;
            typeDetails.innerHTML = data.type;
            manufacturerDetails.innerHTML = data.manufacturer;
            modelDetails.innerHTML = data.model;
            linkDetails.textContent = data.link;
            linkDetails.href = data.link;
            restrictedAccessDetails.innerHTML = data.isRestricted ? 'Sim' : 'Não';

            openFileButton.onclick = function() {
                // open in a new tab data.link
                window.open(data.link, '_blank');
            }

            deleteButton.onclick = function() {
                deleteManual(data._id);
            }

            editButton.onclick = function() {
                showEditManual(data._id);
            }

            contentMessage.style.display = 'block';
            noContentMessage.style.display = 'none';
    
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
            contentMessage.style.display = 'none';
            noContentMessage.style.display = 'block';
        });
}

function filterList() {
    // get values from each filter input
    const type = document.getElementById('filterType').value;
    const manufacturer = document.getElementById('filterManufacturer').value;
    const model = document.getElementById('filterModel').value;
    const name = document.getElementById('filterName').value;

    // create query string
    let queryString = '/';
    let params = 0;
    if (type && type.length > 0) {
        queryString += '?type=' + type;
        params = params + 1;
    }

    if(manufacturer && manufacturer.length > 0) {
        if (params > 0) {
            queryString += '&manufacturer=' + manufacturer;
        } else {
            queryString += '?manufacturer=' + manufacturer;
        }
        params = params + 1;
    }

    if(model && model.length > 0) {
        if (params > 0) {
            queryString += '&model=' + model;
        } else {
            queryString += '?model=' + model;
        }
        params = params + 1;
    }

    if(name && name.length > 0) {
        if (params > 0) {
            queryString += '&name=' + name;
        } else {
            queryString += '?name=' + name;
        }
        params = params + 1;
    }

    // redirect to new url
    window.location = queryString;
}