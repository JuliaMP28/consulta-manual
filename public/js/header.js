'use strich'

function searchManual() {
    const input = document.getElementById('searchInput').value;

    window.location.href = "/?name=" + input;
}