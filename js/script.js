// !inputs*****************************
const bookmarkIN=document.getElementById('bookmark');
const websiteIN=document.getElementById('website');
// !btns*****************************
const addBtn=document.querySelector('.btn-add');
const clearBtn=document.querySelector('.btn-clear');
// !rows
const conatiner=document.getElementById('rows');
// !!!!!!!!
const toast =document.querySelector('.toast');
// ********************************************
let rows;
if(localStorage.getItem('links')){
  rows=JSON.parse(localStorage.getItem('links'))
  displayrows();
}else{
  rows=[];
}
// ****************************************************************
// ?functions
function addwebsite(){
  const row={
    bookmark:bookmarkIN.value,
    website:websiteIN.value
  }
  rows.push(row);
}

function displayrows(){
  conatiner.innerHTML='';
  rows.forEach((row,i)=>{
      const html=`
  <tr>
  <td>${i+1}</td>
  <td>${row.bookmark}</td>
  <td><a href="${row.website}" target="_blank" class="btn-v btn-visit"><i class="fa-solid fa-eye"></i>visit</a></td>
  <td><button onclick="deleterow(${i})" class="btn-d btn-delete"><i class="fa-solid fa-trash"></i>Delete</button></td>
  </tr>
  `
  conatiner.insertAdjacentHTML('beforeend',html);
  })
}

function deleterow(index){
rows.splice(index,1);
localStorage.setItem('links',JSON.stringify(rows));
displayrows();
toast.classList.add('bg-red');
toast.classList.remove('bg-green');
toast.textContent='You remove one website'
setTimeout(()=>toast.classList.remove('hidden'),0);
setTimeout(()=>toast.classList.add('hidden'),1000);
}

function validate(input){
  const regex={
    bookmark:/\w{3,}/,
    website:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  }
  if(regex[input.id].test(input.value)){
    input.classList.add('valid')
    input.classList.remove('invalid')
    return true;
  }else{
    input.classList.remove('valid')
    input.classList.add('invalid')
    return false;
  }
}

function clearInputs(){
  bookmarkIN.value=websiteIN.value='';
  bookmarkIN.classList.remove('valid','invalid')
  websiteIN.classList.remove('valid','invalid')
}

function clearstorage(){
  localStorage.clear();
  rows=[];
  displayrows();
}
// ****************************************************************
// ?events with btns
addBtn.addEventListener('click',function(e){
  e.preventDefault();
  if(validate(bookmarkIN)&& validate(websiteIN)){
    addwebsite();
    localStorage.setItem('links',JSON.stringify(rows));
    displayrows();
    clearInputs();
    toast.classList.add('bg-green');
    toast.classList.remove('bg-red');
    toast.textContent='You add one website'
    setTimeout(()=>toast.classList.remove('hidden'),0);
    setTimeout(()=>toast.classList.add('hidden'),1000);
  }
})

clearBtn.addEventListener('click',function(e){
  e.preventDefault();
  clearstorage();
  toast.classList.add('bg-red');
  toast.classList.remove('bg-green');
  toast.textContent='You remove all websites'
  setTimeout(()=>toast.classList.remove('hidden'),0);
  setTimeout(()=>toast.classList.add('hidden'),1000);
})

// ?events with input fields
bookmarkIN.addEventListener('input',function(){
  validate(this);
})

websiteIN.addEventListener('input',function(){
  validate(this);
})