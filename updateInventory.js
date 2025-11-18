document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const subtractButton = document.getElementById('subtractButton');

    addButton.addEventListener("click", add);
    subtractButton.addEventListener("click", subtract);

});
// helper to start a loading animation on a button for a minimum duration (ms)
// returns an object: { done: Promise, cancel: Function }
function animateButton(btn, minMs = 3000) {
    if (!btn) return { done: Promise.resolve(), cancel: () => {} };
    // ensure button text is wrapped so spinner doesn't replace text
    if (!btn.querySelector('.button-text')) {
        const text = btn.textContent;
        btn.textContent = '';
        const span = document.createElement('span');
        span.className = 'button-text';
        span.textContent = text;
        btn.appendChild(span);
    }
    btn.classList.add('loading');
    btn.disabled = true;

    let timeoutId;
    let resolveDone;
    const done = new Promise((resolve) => { resolveDone = resolve; });

    timeoutId = setTimeout(() => {
        btn.classList.remove('loading');
        btn.disabled = false;
        resolveDone();
    }, minMs);

    return {
        // Promise that resolves when the min duration has elapsed and loading UI removed
        done,
        // Cancel immediately (remove UI and resolve done promise)
        cancel: () => {
            if (timeoutId) clearTimeout(timeoutId);
            btn.classList.remove('loading');
            btn.disabled = false;
            if (resolveDone) resolveDone();
        }
    };
}

// show a temporary status message inside the submission box
function showStatus(message, isError = false, timeout = 3000) {
    const box = document.getElementById('submissionBox');
    if (!box) return;
    let el = box.querySelector('#statusMessage');
    if (!el) {
        el = document.createElement('div');
        el.id = 'statusMessage';
        el.style.marginTop = '8px';
        el.style.fontSize = '0.95rem';
        box.appendChild(el);
    }
    el.textContent = message;
    el.style.color = isError ? '#8b0000' : '#064e3b';
    el.style.background = isError ? '#ffecec' : '#ecfdf5';
    el.style.padding = '6px 8px';
    el.style.borderRadius = '4px';
    el.style.border = isError ? '1px solid #f5c2c7' : '1px solid #bbf7d0';

    if (timeout > 0) {
        setTimeout(() => { el.textContent = ''; el.style.background = 'transparent'; el.style.border = 'none'; }, timeout);
    }
}
function add(){
    //validate input.  if input is invalid return without doing anything
    var inputOk = validateFields();
    if(!inputOk){
        return;
    }
    //create xml request and start 3s loading animation
    const addBtn = document.getElementById('addButton');
    const loader = animateButton(addBtn, 3000);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/add", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Hold handling until both server responded and min animation time elapsed.
    let serverResponse = null;
    xhr.onload = function(){
        serverResponse = { status: xhr.status, text: xhr.responseText, statusText: xhr.statusText };
        loader.done.then(() => {
            if (serverResponse.status === 200) {
                console.log("server connection successful", serverResponse.text);
                showStatus('Item updated successfully');
                // clear inputs and keep focus on item name for faster entries
                document.getElementById('itemName').value = '';
                document.getElementById('quantity').value = '';
                document.getElementById('itemName').focus();
            } else {
                console.error("Error: ", serverResponse.statusText);
                showStatus('Error: ' + serverResponse.statusText, true);
            }
        });
    };

    //create json element to send via xml
    var itemName = document.getElementById("itemName").value;
    var date = document.getElementById("date").value;
    var quantity = Number(document.getElementById("quantity").value);

    const itemData = {
        "itemName": itemName,
        "date": date,
        "quantity": quantity
    }

    xhr.onerror = function() { console.error('Network or server error'); loader.cancel(); showStatus('Network or server error', true); };
    xhr.send(JSON.stringify(itemData));
}
function subtract(){
    // if input is invalid, return without doing anything
    var inputOk = validateFields();
    if(!inputOk){
        return;
    }
    
    //create xml request and start 3s loading animation
    const subBtn = document.getElementById('subtractButton');
    const loader = animateButton(subBtn, 3000);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/subtract", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Hold handling until both server responded and min animation time elapsed.
    let serverResponse = null;
    xhr.onload = function(){
        serverResponse = { status: xhr.status, text: xhr.responseText, statusText: xhr.statusText };
        loader.done.then(() => {
            if (serverResponse.status === 200) {
                console.log("server connection successful", serverResponse.text);
                showStatus('Item updated successfully');
                // clear inputs and keep focus on item name for faster entries
                document.getElementById('itemName').value = '';
                document.getElementById('quantity').value = '';
                document.getElementById('itemName').focus();
            } else {
                console.error("Error: ", serverResponse.statusText);
                showStatus('Error: ' + serverResponse.statusText, true);
            }
        });
    };

    //create json element to send via xml
    var itemName = document.getElementById("itemName").value;
    var date = document.getElementById("date").value;
    var quantity = Number(document.getElementById("quantity").value);

    const itemData = {
        "itemName": itemName,
        "date": date,
        "quantity": quantity
    }

    xhr.onerror = function() { console.error('Network or server error'); loader.cancel(); showStatus('Network or server error', true); };
    xhr.send(JSON.stringify(itemData));
}
//validates fields before submitting to the API
function validateFields(){
    const itemName = document.getElementById("itemName").value.trim();
    const date = document.getElementById("date").value.trim();
    const quantity = document.getElementById("quantity").value.trim();

    if (itemName === "" || date === "" || quantity === "" || isNaN(quantity)) {
        alert("Input is invalid. Please try again.");
        return false;
    }
    return true;
}