// let myLeads = [
//   "www.awesomeness.com",
//   "www.myleads.com",
//   "www.fanclub.com",
//   "www.myfanclub.com",
// ];
let myLeads = [];
let save_btn = document.querySelector("#save_btn");
let input_el = document.querySelector("#input_el");
let lists = document.querySelector("#listItems");
const deletebtn = document.querySelector("#delete_btn");
let tabBtn = document.querySelector("#tab_btn");

const fromlocalstorage = JSON.parse(localStorage.getItem("myleads"));
if (fromlocalstorage) {
  myLeads = fromlocalstorage;
  render(myLeads);
}

function render(arr) {
  let listItems = "";
  arr.forEach((elem) => {
    listItems += `
    <li>
         <a href='${elem}' target = '_blank' >${elem}</a>
    </li>`;
  });
  lists.innerHTML = listItems;
}

/*----------------------ALL THE EVENTLISTNER------------------*/

// #this event listener is use to log linkin url.
tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// #this event listener is use to press enter button to save input.
input_el.addEventListener("keypress", (element) => {
  if (element.key === "Enter") {
    element.preventDefault();
    save_btn.click();
  }
});

// #this event listener is use to delete all the stored inputs in the array.
deletebtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  lists.innerHTML = "";
});

// #this event listener is use to save inputs in arrays.
save_btn.addEventListener("click", () => {
  myLeads.push(input_el.value);
  input_el.value = ""; // taking values from input.
  //converting object(array) into string.
  // because localstorage take parameters as strings .
  localStorage.setItem("myleads", JSON.stringify(myLeads));
  render(myLeads);
});
/*-----------------------------END-------------------------*/
