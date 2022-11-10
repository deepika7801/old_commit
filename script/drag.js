const addTask = document.querySelector(".task-add-button");
let notStarted = document.getElementById("not-started");
let inprogress = document.getElementById("in-progress");
let completed = document.getElementById("completed");
let filterBtn = document.querySelector(".task-filter-button");
let tasks;
let tempTask;
let tempSort = [];
let order = "ascending";
let flag = 0;

(() => {
  defaultFun();
})();
async function defaultFun() {
  let taskData = await fetch("http://localhost:5000/getTask", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  let data = await taskData.json();
  // for (let i = 0; i < Object.keys(tasks).length; i++) {
  tasks = data;
  console.log(tasks);
  notStarted.replaceChildren();

  inprogress.replaceChildren();

  completed.replaceChildren();

  console.log(Object.keys(tasks).length, tasks.length);
  for (let i = 0; i < Object.keys(tasks).length; i++) {
    if (tempSort.includes(tasks[Object.keys(tasks)[i]].taskName) === false)
      tempSort.push(tasks[Object.keys(tasks)[i]].taskName);
  }

  console.log(tempSort);
  for (let i = 0; i < Object.keys(tasks).length; i++) {
    createCard(
      tasks[Object.keys(tasks)[i]].taskName,
      tasks[Object.keys(tasks)[i]].startDate,
      tasks[Object.keys(tasks)[i]].endDate,
      `${tasks[Object.keys(tasks)[i]].category}`
    );
  }

  dragAndDrop();
}

let sortBtn = document.querySelector(".task-sort-button");
sortBtn.addEventListener("click", () => {
  notStarted.replaceChildren();

  inprogress.replaceChildren();

  completed.replaceChildren();
  if (flag == 0) {
    order = "ascending";
  } else {
    order = "descending";
  }
  sortCards(tempSort, order);
  for (let i = 0; i < tempSort.length; i++) {
    createCard(
      tasks[tempSort[i]].taskName,
      tasks[tempSort[i]].startDate,
      tasks[tempSort[i]].endDate,
      tasks[tempSort[i]].category
    );
  }
});

function sortCards(tempSort, order) {
  tempSort.sort(function (a, b) {
    var previousTask = tasks[a].taskName;
    var currentTask = tasks[b].taskName;
    if (order == "descending") {
      flag = 0;
      if (previousTask < currentTask) return 1;
      if (previousTask > currentTask) return -1;
    } else if (order == "ascending") {
      flag = 1;
      if (previousTask < currentTask) return -1;
      if (previousTask > currentTask) return 1;
    }
  });
}

// (async()=>{
//   let taskData = await fetch('http://localhost:4000/get-task',{
//     method: "GET",
//     headers: {
//       "content-type":"application/json"
//     }
//   });
//   let data = await taskData.json();
//   tasks = await data;

//   let notStarted = document.getElementById('not-started');
//   notStarted.replaceChildren();
//   let inprogress = document.getElementById('in-progress');
//   inprogress.replaceChildren();
//   let completed = document.getElementById('completed');
//   completed.replaceChildren();
//   createCard(tasks);
// })

// const sortBtn = document.querySelector(".task-sort-button");
// sortBtn.addEventListener("click", () => {});

addTask.addEventListener("click", () => {
  let taskInput = document.querySelector(".task-input");
  taskInput.value = "";
  let startDate = document.querySelector(".task-startDate");
  startDate.value = "";
  let endDate = document.querySelector(".task-endDate");
  endDate.value = "";
  toggle();
});
function toggle() {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");
  var popup = document.getElementById("popup");
  popup.classList.toggle("active");
}

let closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", () => {
  toggle();

  (async () => {
    try {
      let taskInput = document.querySelector(".task-input");
      taskInput = taskInput.value;
      let startDate = document.querySelector(".task-startDate");
      startDate = startDate.value;
      let endDate = document.querySelector(".task-endDate");
      endDate = endDate.value;

      if (
        taskInput.length != 0 &&
        startDate.length != 0 &&
        endDate.length != 0
      ) {
        let taskData;
        taskData = {
          taskId: taskInput,
          taskName: taskInput,
          category: "not-started",
          startDate: startDate,
          endDate: endDate,
        };

        let taskCredential = await fetch(
          "http://localhost:5000/taskCredential",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(taskData),
          }
        );
        if (taskCredential.ok) {
          defaultFun();
        }
      } else {
        alert("enter valid data");
      }
    } catch (e) {
      alert(e);
    }
  })();
});

function createCard(taskName, startDate, endDate, category) {
  if (category == "not-started") {
    let taskContainer = document.getElementById("not-started");
    let taskCard = document.createElement("div");
    taskCard.setAttribute("class", "list-item");
    taskCard.setAttribute("id", `${taskName}`);
    taskCard.setAttribute("draggable", "true");
    taskCard.innerText = taskName;
    taskContainer.appendChild(taskCard);
    let taskDate = document.createElement("div");
    taskDate.setAttribute("class", "taskDate");
    taskCard.appendChild(taskDate);
    taskDate.innerHTML = `<p class='date'>${startDate} <i class="fa-solid fa-arrow-right"></i> ${endDate}`;
    let change = document.createElement("div");
    change.setAttribute("class", "change");
    taskCard.appendChild(change);
    let trash = document.createElement("div");
    trash.setAttribute("class", "trash");
    change.appendChild(trash);
    trash.innerHTML = `<button class="deleteBtn" onClick="deleteCard(${taskName})"><i class="fa-solid fa-trash"></i></button>`;
    let edit = document.createElement("div");
    edit.setAttribute("class", "edit");
    change.appendChild(edit);
    edit.innerHTML = `<button class="editBtn" onClick="editCard(${taskName})"><i class="fa-sharp fa-solid fa-pen"></i></button>`;
  } else if (category == "in-progress") {
    let taskContainer = document.getElementById("in-progress");
    let taskCard = document.createElement("div");
    taskCard.setAttribute("class", "list-item");
    taskCard.setAttribute("id", `${taskName}`);
    taskCard.setAttribute("draggable", "true");
    taskCard.innerText = taskName;
    taskContainer.appendChild(taskCard);
    let taskDate = document.createElement("div");
    taskDate.setAttribute("class", "taskDate");
    taskCard.appendChild(taskDate);
    taskDate.innerHTML = `<p class='date'>${startDate} <i class="fa-solid fa-arrow-right"></i> ${endDate}`;
    let change = document.createElement("div");
    change.setAttribute("class", "change");
    taskCard.appendChild(change);
    let trash = document.createElement("div");
    trash.setAttribute("class", "trash");
    change.appendChild(trash);
    trash.innerHTML = `<button class="deleteBtn" onClick="deleteCard(${taskName})"><i class="fa-solid fa-trash"></i></button>`;
    let edit = document.createElement("div");
    edit.setAttribute("class", "edit");
    change.appendChild(edit);
    edit.innerHTML = `<button class="editBtn" onClick="editCard(${taskName})"><i class="fa-sharp fa-solid fa-pen"></i></button>`;
  } else if (category == "completed") {
    let taskContainer = document.getElementById("completed");
    let taskCard = document.createElement("div");
    taskCard.setAttribute("class", "list-item");
    taskCard.setAttribute("id", `${taskName}`);
    taskCard.setAttribute("draggable", "true");
    taskCard.innerText = taskName;
    taskContainer.appendChild(taskCard);
    let taskDate = document.createElement("div");
    taskDate.setAttribute("class", "taskDate");
    taskCard.appendChild(taskDate);
    taskDate.innerHTML = `<p class='date'>${startDate} <i class="fa-solid fa-arrow-right"></i> ${endDate}`;
    let change = document.createElement("div");
    change.setAttribute("class", "change");
    taskCard.appendChild(change);
    let trash = document.createElement("div");
    trash.setAttribute("class", "trash");
    change.appendChild(trash);
    trash.innerHTML = `<button class="deleteBtn" onClick="deleteCard(${taskName})"><i class="fa-solid fa-trash"></i></button>`;
    let edit = document.createElement("div");
    edit.setAttribute("class", "edit");
    change.appendChild(edit);
    edit.innerHTML = `<button class="editBtn" onClick="editCard(${taskName})"><i class="fa-sharp fa-solid fa-pen"></i></button>`;
  }
  dragAndDrop();
}
function dragAndDrop() {
  let draggedItem = "";
  list_items = document.querySelectorAll(".list-item");

  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener("dragstart", function () {
      draggedItem = item;
      setTimeout(function () {
        item.style.display = "none";
        item.remove();
      }, 0);
    });

    item.addEventListener("dragend", function () {
      setTimeout(function () {
        draggedItem.style.display = "block";
        draggedItem = "";
      }, 0);
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];
      list.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0,0,0,0.2)";
      });
      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,0.1)";
      });
      list.addEventListener("drop", function (e) {
        let taskContainer = document.querySelectorAll(".taskContainer");
        taskContainer[j].append(draggedItem);
        let dragItem = draggedItem.id;

        for (let k = 0; k < Object.keys(tasks).length; k++) {
          if (dragItem == tasks[Object.keys(tasks)[k]].taskName) {
            tasks[Object.keys(tasks)[k]].category = draggedItem.parentNode.id;

            tempTask = tasks;

            swap();

            async function swap() {
              let taskData;

              taskData = {
                taskId: tempTask[dragItem].taskName,
                taskName: tempTask[dragItem].taskName,
                category: tempTask[dragItem].category,
                startDate: tempTask[dragItem].startDate,
                endDate: tempTask[dragItem].endDate,
              };
              let moveCredential = await fetch(
                "http://localhost:5000/moveCredential",
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(taskData),
                }
              );
              // if(moveCredential.ok){
              //   defaultFun();
              // }
            }
          }
        }

        this.style.backgroundColor = "rgba(0,0,0,0.1)";
      });
    }
  }
}

filterBtn.addEventListener("click", () => {
  let filterInput = document.querySelector(".task-filter-input");
  let filterValue = filterInput.value;
  if (filterValue.length == 0) {
    alert("Enter a value to filter");
    filterInput.focus();
  } else {
    notStarted.replaceChildren();

    inprogress.replaceChildren();

    completed.replaceChildren();
    let filterCard = [];
    for (let i = 0; i < tempSort.length; i++) {
      if (tempSort[i] == filterValue) {
        filterCard.push(tempSort[i]);
      }
    }
    createCard(
      tasks[filterCard[0]].taskName,
      tasks[filterCard[0]].startDate,
      tasks[filterCard[0]].endDate,
      tasks[filterCard[0]].category
    );
  }
});

function deleteCard(obj) {
  let deleteArray;
  let parentId = obj.id;
  (async () => {
    for (let i = 0; i < tempSort.length; i++) {
      if (parentId == tempSort[i]) {
        deleteArray = { taskName: `${parentId}` };
        tempSort = tempSort.filter(function(e){
          return e!==`${parentId}`
        })
      }
    }
    let deleteCredential = await fetch("http://localhost:5000/delete-task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(deleteArray),
    });
    if (deleteCredential.ok) {
      defaultFun();
    }
  })();
}
let old_name;
let old_start_date;
let old_end_date;
let old_categ;
function editCard(name) {
  // let old_name = tempTask[item].taskName;

  // let old_start_date = tempTask[item].startDate;

  // let old_end_date = tempTask[item].endDate;

  // let new_name = document.querySelector('.task-inputs').value;

  // let new_start_date = document.querySelector('.task-startDates').value;

  // let new_end_date = document.querySelector('.task-endDates').value;

  (() => {
    let item = name.id;
    popUpMenu();
    old_name = item;
    for (let i = 0; i < Object.keys(tasks).length; i++) {
      if (item == tasks[Object.keys(tasks)[i]].taskName) {
        old_start_date = tasks[Object.keys(tasks)[i]].startDate;
        old_end_date = tasks[Object.keys(tasks)[i]].endDate;
        old_categ = tasks[Object.keys(tasks)[i]].category;
      }
    }
    let taskInput = document.querySelector(".task-inputs");
    taskInput.value = `${old_name}`;
    let startDate = document.querySelector(".task-startDates");
    startDate.value = `${old_start_date}`;
    let endDate = document.querySelector(".task-endDates");
    endDate.value = `${old_end_date}`;
  })();
}

function popUpMenu() {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");
  var popup = document.getElementById("popups");
  popup.classList.toggle("active");
}

let submit = document.getElementById("submit");
submit.addEventListener("click", editCards);

async function editCards() {
  popUpMenu();
  let taskInput = document.querySelector(".task-inputs").value;
  let startDate = document.querySelector(".task-startDates").value;
  let endDate = document.querySelector(".task-endDates").value;
  let category = old_categ;
  if (taskInput.length != 0 && startDate.length != 0 && endDate.length != 0) {
    let taskData;
    taskData = {
      taskId: taskInput,
      taskName: taskInput,
      category: category,
      startDate: startDate,
      endDate: endDate,
      oldName: old_name,
    };
    tempSort = tempSort.filter(function(e){
      return e!==`${old_name}`
    })

    let editCredential = await fetch("http://localhost:5000/editCredential", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (editCredential.ok) {
      defaultFun();
    }
  }
}

function replacePreviousPage(){
  location.replace('../index.html');

}