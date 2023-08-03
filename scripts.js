const saveBtn = document.getElementById('save-btn');
const inputEl = document.getElementById('lead-input');
const leadlistUl = document.getElementById('leads-list');
const deletebtn = document.getElementById('delete-btn');
const savetabbtn = document.getElementById('savetab-btn');

let leadsArray = [];
if (localStorage.getItem("leads"))
    leadsArray.push(JSON.parse(localStorage.getItem("leads")));

function renderList() {
    let listItems = "";
    for (let i = 0; i < leadsArray.length; i++) {
        listItems += `<li>
          <a href="${leadsArray[i]}" target="_blank">
          ${leadsArray[i]} 
          </a>
          </li>`;
    }

    leadlistUl.innerHTML = listItems;
}

saveBtn.addEventListener("click", function () {

    leadsArray.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("leads", JSON.stringify(leadsArray));
    renderList();
})

deletebtn.addEventListener("dblclick", function () {
    localStorage.clear();
    leadsArray = [];
    leadlistUl.innerHTML = '';
})

savetabbtn.addEventListener("click", function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        leadsArray.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leadsArray))
        renderList();
    })
})