let currentScript = null;

function loadPage(page) {
    fetch(`/pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
        document.getElementById("content").innerHTML = html;
        loadPageScript(page);
    })
    .catch(err => console.error("Fehler beim Laden:", err));
}

function loadPageScript(page) {
    if (currentScript) {
    currentScript.remove();
    }

    page = page.replace(/\/[^\/]*$/, '');     

    currentScript = document.createElement("script");
    currentScript.src = `/pages/${page}/script.js`;
    currentScript.defer = true;
    
    document.body.appendChild(currentScript);
}
