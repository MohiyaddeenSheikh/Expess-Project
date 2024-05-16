const { func } = require("joi");

function validateNewForm(){
  let arr = [];
  ['title','description','image','price','location','country'].forEach((x)=>{arr.push(v(x))})
  if(arr.every(val=>val==true)){
    return true;
  }else{
    return false;
  }

function v(x){
  let element = document.getElementById(x).value;
  let elementNode = document.getElementById(x)
  let elementSpan = document.getElementById(x+"Span")
  let elementSvgpath = document.getElementById(x+"Svgpath")
  elementSvgpath.parentNode.classList.remove("hidden")
  if(x=="image"){
    let regex = p = new RegExp("^[\w]*.*","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have valid Image URL")
    return false;
    }
  }
  if(x=="price"){

    let regex = new RegExp("^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$","g");

    if(/^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$/.test(element) && /\d{3,}/.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Price should be greater than 99 and must be Number")
    return false;
    }
  }
  if(/\w{3,}/.test(element) && /^[^/:;<>!_~@#$%^&()+=?()“|!\[#$-]+$/.test(element)){
     satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
  }else{
    notSatisfy(elementNode,elementSpan,elementSvgpath,"Minimum 3 character should be entered and No special character")
    return false;
  }
function satisfy(elementNode,elementSpan,elementSvgpath){
  elementSpan.classList.add("hidden")
  elementNode.parentNode.classList.add('text-green-600');
  elementSvgpath.removeAttribute('d')
  elementSvgpath.setAttribute('d','M7.29417 12.9577L10.5048 16.1681L17.6729 9')
  elementNode.parentNode.classList.remove('text-red-600','border-rose-600')
  }

  function notSatisfy(elementNode,elementSpan,elementSvgpath,comment){
    elementSpan.classList.remove("hidden")
    elementNode.parentNode.classList.remove('text-green-600')
    elementNode.parentNode.classList.add('text-red-600','border-rose-600')
    elementSpan.innerHTML = comment;
    elementSvgpath.removeAttribute('d')
    elementSvgpath.setAttribute('d','M16 8L8 16M8.00001 8L16 16')
  }

}
}







function onKeyUpValidation(_this){
  let x = _this.id;

  let element = document.getElementById(x).value;
  let elementNode = document.getElementById(x)
  let elementSpan = document.getElementById(x+"Span")
  let elementSvgpath = document.getElementById(x+"Svgpath")
  elementSvgpath.parentNode.classList.remove("hidden")
  if(x=="email"){

    let regex = p = new RegExp("([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath)
    return false;
    }
  }
  if(x=="password"){
    let regex = p = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath)
    return false;
    }
  }
  if(x=="image"){
    let regex = p = new RegExp("^[\w]*.*","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath)
    return false;
    }
  }
  if(x=="price"){

    let regex = new RegExp("^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$","g");

    if(/^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$/.test(element) && /\d{3,}/.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath)
    return false;
    }
  }
  if(/\w{3,}/.test(element) && /^[^/:;<>!_~@#$%^&()+=?()“|!\[#$-]+$/.test(element)){
     satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
  }else{
    notSatisfy(elementNode,elementSpan,elementSvgpath)
    return false;
  }
function satisfy(elementNode,elementSpan,elementSvgpath){
  elementNode.parentNode.classList.add('text-green-600');
  elementSvgpath.removeAttribute('d')
  elementSvgpath.setAttribute('d','M7.29417 12.9577L10.5048 16.1681L17.6729 9')
  elementNode.parentNode.classList.remove('text-red-600','border-rose-600')
  }

  function notSatisfy(elementNode,elementSpan,elementSvgpath){
    elementNode.parentNode.classList.remove('text-green-600')
    elementNode.parentNode.classList.add('text-red-600','border-rose-600')
    elementSvgpath.removeAttribute('d')
    elementSvgpath.setAttribute('d','M16 8L8 16M8.00001 8L16 16')
  }

}

//star rating for review
function star(_this){
  ["starid1", "starid2", "starid3", "starid4", "starid5"].forEach((id)=>{document.getElementById(id).classList.remove('text-yellow-500','animate-spin')})
  const str = _this.id
  const num = Number(str.substr(str.length-1))
  document.getElementById("ratingReview").value = num
  arr =[]
  for(let i=1;i<=num;i++){
	arr.push(str.substr(0,str.length-1) + String(i));
  
  } 
  arr.map(fun)
  
  function fun(id){
  const starId  = document.getElementById(id)
  if(starId.classList.contains('text-yellow-500')){
 	 	starId.classList.remove('text-yellow-500','animate-spin');
 	 }else{
 		 starId.classList.remove('text-white','animate-spin');
 		 starId.classList.add('text-yellow-500','animate-spin');
  } 
   
  } 
}


//review

function validateReview(_this){

  if(document.reviewForm.ratingReview.value == ""){
    document.getElementById('showError1').innerHTML = "Must give star between 1(Less Valued) to 5(High Valued)"
    return false
  }
  if(document.getElementById('review').value.length-1 <= 100 ){
    document.getElementById('showError2').innerHTML="Must write atlest 100 character about Hotel staff and cleaniness."
    return false
  } 
}

function idReviewValid(){
  document.getElementById('counterReview').innerHTML= "Character Count: "+document.getElementById('review').value.length;
  if(document.getElementById('review').value.length<100){
    document.getElementById('counterReview').classList.add('text-red-600')
  }else{
  document.getElementById('counterReview').classList.remove('text-red-600')
  document.getElementById('counterReview').classList.add('text-green-600')
  }
}

//review delete ------------------------------------------------------------
document.addEventListener("click", reviewMenuCloseGlobal);

function mainReview(event,_this){
event.stopPropagation();
if(_this.parentNode.nextElementSibling.classList.contains("hidden")){
	reviewMenuOpen(event,_this)
}else{
	reviewMenuClose(event,_this)

}
}


function reviewMenuOpen(event,_this) {
event.stopPropagation()
_this.parentNode.nextElementSibling.classList.remove("hidden");
  return true;
}
function reviewMenuClose(event,_this) {
event.stopPropagation()
_this.parentNode.nextElementSibling.classList.add("hidden");
  return false;
}

function reviewMenuCloseGlobal(event) {
  event.stopPropagation()
  var x = document.getElementsByClassName('reviewDeleteList');
  for (var i = 0; i < x.length; i++) {
    x[i].classList.add('hidden');
}
  return false;
  }



function ff(_this){
  ["starUpdateid1", "starUpdateid2", "starUpdateid3", "starUpdateid4", "starUpdateid5"].forEach((newid)=>{document.getElementById(newid).classList.remove('text-yellow-500','animate-spin')})
  num1 = Number(_this.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.textContent.trim())
  document.getElementById("ratingUpdateReview").value = num1
  str1 = "starUpdateid"
  arr =[]
  document.getElementById("reviewUpdateId").value= _this.nextElementSibling.value
  for(let i=1;i<=num1;i++){
	arr.push(str1.substr(0,str1.length) + String(i));
  } 
  arr.map(funUpdateReview1)
  function funUpdateReview1(id){
    starId  = document.getElementById(id)
    if(starId.classList.contains('text-yellow-500')){
 	 	starId.classList.remove('text-yellow-500','animate-spin');
 	 }else{
 		 starId.classList.remove('text-white','animate-spin');
 		 starId.classList.add('text-yellow-500','animate-spin');
  }
    
  }
  document.getElementById("editReview").innerHTML = _this.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.textContent.trim()
  document.getElementById("reviewUpdate").classList.remove("hidden")
  
}

function closeReviewUpdate(_this){
  
  document.getElementById("reviewUpdate").classList.add("hidden")
  document.getElementById("reviewUpdate").classList.add("hidden")
}



//Update star rating for review
function starUpdate(_this){
  let collection = _this.parentNode.children.length;
  for (let i = 0; i < collection.length; i++) {
   // collection[i].classList.remove('text-yellow-500','animate-spin');
}
  ["starUpdateid1", "starUpdateid2", "starUpdateid3", "starUpdateid4", "starUpdateid5"].forEach((newid)=>{document.getElementById(newid).classList.remove('text-yellow-500','animate-spin')})
  const str = _this.id
  const num = Number(str.substr(str.length-1))
  document.getElementById("ratingUpdateReview").value = num
  arr =[]
  for(let i=1;i<=num;i++){
	arr.push(str.substr(0,str.length-1) + String(i));
  } 
  arr.map(funUpdateReview)
  
  function funUpdateReview(id){
  const starId  = document.getElementById(id)
  if(starId.classList.contains('text-yellow-500')){
 	 	starId.classList.remove('text-yellow-500','animate-spin');
 	 }else{
 		 starId.classList.remove('text-white','animate-spin');
 		 starId.classList.add('text-yellow-500','animate-spin');
  } 
   
  } 
}



//review update----------------------

function validateReviewUpdate(_this){
  //alert(document.reviewUpdateForm.reviewUpdate.value.length)
  if(_this.ratingUpdateReview.value == ""){
    document.getElementById('showUpdateError1').innerHTML = "Must give star between 1(Less Valued) to 5(High Valued)"
    return false
  }
  if(_this.review.value.length <= 100 ){
    _this.review.nextElementSibling.innerHTML="Must write atlest 100 character about Hotel staff and cleaniness."
    return false
  } 

  return true;
}

function idUpdateReviewValid(_this){
  document.getElementById("counterReviewUpdate").innerHTML = "Character Count:"+_this.value.length;
  if(_this.value.length<100){
    document.getElementById('counterReviewUpdate').classList.add('text-red-600')
  }else{
  document.getElementById('counterReviewUpdate').classList.remove('text-red-600')
  document.getElementById('counterReviewUpdate').classList.add('text-green-600')
  }
}

/* Flash msg Function  */
function closeFlash(){
  document.getElementById("flashClose").classList.add("hidden")
  }
  document.body.onload = function() {
      document.getElementById("flashClose").classList.remove("hidden")
  };

/* POP UP DELETE */

/* function sureDelete(_this){


  document.getElementById('deleteClosePopup').classList.remove("hidden")
  return false;
} */
/* function closeDelete(){
  document.getElementById('deleteClosePopup').classList.add("hidden")
  return false
} */

/* function okDelete(){

  document.getElementById("confirmDeleteForm").submit()
} */



// signup---------

function validateSignupForm(){

  let arr = [];
  ['username','email','password'].forEach((x)=>{arr.push(v(x))})
  if(arr.every(val=>val==true)){
    return true;
  }else{
    return false;
  }

function v(x){

  let element = document.getElementById(x).value;
  let elementNode = document.getElementById(x)
  let elementSpan = document.getElementById(x+"Span")
  let elementSvgpath = document.getElementById(x+"Svgpath")
  elementSvgpath.parentNode.classList.remove("hidden") 
  if(x=="password"){
    let regex = p = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have atleast One Capital letter, one small letter, one special character, one number and the length of the password be 8.")
    return false;
    }
  }
  if(x=="email"){
    let regex = p = new RegExp("([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have valid Email ID")
    return false;
    }
  }
  if(x=="price"){

    let regex = new RegExp("^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$","g");

    if(/^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$/.test(element) && /\d{3,}/.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Price should be greater than 99 and must be Number")
    return false;
    }
  }
  if(/\w{3,}/.test(element) && /^[^/:;<>!_~@#$%^&()+=?()“|!\[#$-]+$/.test(element)){
     satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
  }else{
    if(x=="username"){
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have at least 3 character")
    return false;
    }else{
    notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have One Capital letter, small letter, one special character, one number and length of the password must be 8")
    return false;
    }
  }
function satisfy(elementNode,elementSpan,elementSvgpath){
  elementSpan.classList.add("hidden")
  elementNode.parentNode.classList.add('text-green-600');
  elementSvgpath.removeAttribute('d')
  elementSvgpath.setAttribute('d','M7.29417 12.9577L10.5048 16.1681L17.6729 9')
  elementNode.parentNode.classList.remove('text-red-600','border-rose-600')
  }

  function notSatisfy(elementNode,elementSpan,elementSvgpath,comment){
    elementSpan.classList.remove("hidden")
    elementNode.parentNode.classList.remove('text-green-600')
    elementNode.parentNode.classList.add('text-red-600','border-rose-600')
    elementSpan.innerHTML = comment;
    elementSvgpath.removeAttribute('d')
    elementSvgpath.setAttribute('d','M16 8L8 16M8.00001 8L16 16')
  }

}
}


//login-form-------


function validateLoginForm(){

  let arr = [];
  ['username','password'].forEach((x)=>{arr.push(v(x))})
  if(arr.every(val=>val==true)){
    return true;
  }else{
    return false;
  }

function v(x){

  let element = document.getElementById(x).value;
  let elementNode = document.getElementById(x)
  let elementSpan = document.getElementById(x+"Span")
  let elementSvgpath = document.getElementById(x+"Svgpath")
  elementSvgpath.parentNode.classList.remove("hidden") 
  if(x=="password"){
    let regex = p = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have atleast One Capital letter, one small letter, one special character, one number and the length of the password be 8.")
    return false;
    }
  }
  if(x=="email"){
    let regex = p = new RegExp("([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)","g");
    if(regex.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have valid Email ID")
    return false;
    }
  }
  if(x=="price"){

    let regex = new RegExp("^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$","g");

    if(/^\d[^/,:;<>!_~@#$%^&()+=?()“|!\[#$-]+\d$/.test(element) && /\d{3,}/.test(element)){
      satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
    }else{
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Price should be greater than 99 and must be Number")
    return false;
    }
  }
  if(/\w{3,}/.test(element) && /^[^/:;<>!_~@#$%^&()+=?()“|!\[#$-]+$/.test(element)){
     satisfy(elementNode,elementSpan,elementSvgpath)
    return true;
  }else{
    if(x=="username"){
      notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have at least 3 character")
    return false;
    }else{
    notSatisfy(elementNode,elementSpan,elementSvgpath,"Must have One Capital letter, small letter, one special character, one number and length of the password must be 8")
    return false;
    }
  }
function satisfy(elementNode,elementSpan,elementSvgpath){
  elementSpan.classList.add("hidden")
  elementNode.parentNode.classList.add('text-green-600');
  elementSvgpath.removeAttribute('d')
  elementSvgpath.setAttribute('d','M7.29417 12.9577L10.5048 16.1681L17.6729 9')
  elementNode.parentNode.classList.remove('text-red-600','border-rose-600')
  }

  function notSatisfy(elementNode,elementSpan,elementSvgpath,comment){
    elementSpan.classList.remove("hidden")
    elementNode.parentNode.classList.remove('text-green-600')
    elementNode.parentNode.classList.add('text-red-600','border-rose-600')
    elementSpan.innerHTML = comment;
    elementSvgpath.removeAttribute('d')
    elementSvgpath.setAttribute('d','M16 8L8 16M8.00001 8L16 16')
  }

}
}