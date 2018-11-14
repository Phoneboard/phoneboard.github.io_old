
let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

function os() {
    if (navigator.platform.indexOf("Win") != -1) return "Windows";
    if (navigator.platform.indexOf("Mac") != -1) return "Mac";
    //if (navigator.platform.indexOf("X11") != -1) return "linux";
    if (navigator.platform.indexOf("Linux") != -1) return "Linux";
    return "";
}


document.addEventListener("DOMContentLoaded", () => {
    const req_url = "https://api.github.com/repos/Phoneboard/Phoneboard/releases/latest"
    request({url: req_url, headers: {"Accept": "application/vnd.github.v3+json"}}).then(data => {
        let releases = JSON.parse(data);
        const user_os = os();
        if (user_os == "")
            return;
            
        releases.assets.forEach(asset => {
            if (asset.name.indexOf(user_os.toLowerCase()) != -1) {
                let el = document.querySelector("#download-btn");
                
                el.innerText = `Download ${releases.tag_name} for ${user_os} `
                el.href = asset.browser_download_url
            }
        });
    })
    .catch(error => {
        console.log(error);
    });
});

