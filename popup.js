let genBtn = document.getElementById("shortURL");
let api = document.getElementById("myURL");
let copyBtn = document.getElementById("copyURL");
let toast_error = document.querySelector(".toast-error");
let toast_success = document.querySelector(".toast-success");
const url = new URL(
    "https://t.ly/api/v1/link/shorten"
    );
    document.addEventListener('DOMContentLoaded', function () {
        // Fetch the current active tab URL
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0] && tabs[0].url) {
                // Populate the input field with the current URL
                api.value = tabs[0].url;
            }
        });
    });

genBtn.addEventListener('click',()=>{
    if(api.value){
      
        chrome.storage.local.get(['API']).then((result) => {
            const headers = {
                "Authorization": result.API,
                "Content-Type": "application/json",
            };
            fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify( {
                "long_url": api.value,
                "domain": "https://t.ly/",
                "api_token": result.API,
                "expire_at_datetime": "2035-01-17 15:00:00",
                "description": "Social Media Link",
                "public_stats": true,
                "tags": [
                    132,
                    434,
                    565
                ],
                "pixels": [
                    321,
                    567,
                    213
                ]}),
            }).then(response => response.json())
            .then(json=>{
                toast_success.classList.remove('d-hide');
                toast_success.textContent =json.short_url;
                copyBtn.dataset.clipboardText = json.short_url;
                    copyBtn.classList.remove('d-hide');
                });
          });  

    }
    else{
        toast_error.classList.remove('d-hide');
        setTimeout(()=>{
            toast_error.classList.add('d-hide');
        },1500);
    }
})


copyBtn.addEventListener('click', () => {
    // Copy the URL to the clipboard
    const clipboardText = copyBtn.dataset.clipboardText;
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = clipboardText;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Display the notification

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = 'URL copied to clipboard!';
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
});

