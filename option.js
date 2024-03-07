let saveBtn = document.getElementById("save");
let api = document.getElementById("myURL");
let toast_error = document.querySelector(".toast-error");
let toast_success = document.querySelector(".toast-success");

saveBtn.addEventListener('click',()=>{
    if(api.value){
        toast_success.classList.remove('d-hide');
        //storing the data in extension
        chrome.storage.local.set({API : api.value }).then(() => {
            console.log("Value is set" + api.value);
          });
        
    }
    else{
        toast_error.classList.remove('d-hide');
        setTimeout(()=>{
            toast_error.classList.add('d-hide');
        },1500);
    }
})
//YcXDegaC9Ca66O2BF8cyH3n17eXNMOo2YJB3mL6nT8BtRF40Q8WwPcO4RoWl