function loadHeadPartial(partialName) {
    fetch(`/Client/pages/PageBits/${partialName}.html`) // Adjusted path here
        .then(response => response.text())
        .then(html => {
            document.head.insertAdjacentHTML('beforeend', html);
        })
        .catch(error => {
            console.error('Error loading head partial:', error);
        });
}

function loadPartial(containerId, url) {
    fetch(`/Client/pages/PageBits/${url}`) // Adjusted path here
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading partial:', error);
        });
}

function loadPage(page) {
    loadPartial('content', page);
}

// Load common partials
document.addEventListener('DOMContentLoaded', function() {
   // loadPartial('footer', 'footer.html');

    //    document.getElementById('homeButton').addEventListener('click', function() { loadPage('home.html');});
});