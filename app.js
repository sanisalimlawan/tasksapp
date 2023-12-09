// define the ui
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

// loard event listener
loadeventListener();

// load all event listener
function loadeventListener (){

    // dom load event
    document.addEventListener('DOMContentLoaded', getTasks)

    form.addEventListener('submit', addtask);

    tasklist.addEventListener('click', cleartask);

    clearBtn.addEventListener('click', clear);
 
    filter.addEventListener('keyup', filterTasks)
}

// get task from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //   Create element
const li = document.createElement('li');
li.className = 'collection-item';
// 
li.appendChild(document.createTextNode(task));
// 
const link = document.createElement('a');
// 
link.className = 'delet-item   secondary-content';
// 
link.innerHTML = '<i class="fa fa-remove"></i>';
// 
li.appendChild(link);
// 
tasklist.appendChild(li);

    })
}

function addtask(e){
   
    if(taskinput.value === ''){
     alert('ADD A TASK')
    }
//   Create element
const li = document.createElement('li');
li.className = 'collection-item';
// 
li.appendChild(document.createTextNode(taskinput.value));
// 
const link = document.createElement('a');
// 
link.className = 'delet-item secondary-content';
// 
link.innerHTML = '<i class="fa fa-remove"></i>';
// 
li.appendChild(link);
// 
tasklist.appendChild(li);
// store in ls

storeTaskinlocalstorage(taskinput.value);

// clear input 
taskinput.value = '';
// 
    e.preventDefault();
}

// store task 
function storeTaskinlocalstorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify( tasks))
}
//  remove task
function cleartask(e){
    if(e.target.parentElement.classList.contains('delet-item')) {
        if(confirm('are you sure want to delet')){
            e.target.parentElement.parentElement.remove();

            // remove from ls 
            removeTaskFromlocalstorage(e.target.parentElement.parentElement);
        }
       
    }
}

// remove from ls
function removeTaskFromlocalstorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clear (e){
    // tasklist.innerHTML = '';
    while(tasklist.firstChild){
       tasklist.firstChild.remove();
    }
    // clear from ls
     clearTaskFromlocalstorage();
      
}

 function clearTaskFromlocalstorage(){
    localStorage.clear();
 }


function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
         task.style.display = 'none';
        }
    });
}

