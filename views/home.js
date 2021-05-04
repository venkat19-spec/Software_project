const adminlogin = document.querySelector('#admin');
adminlogin.onlclick=function(){
    fetch('http://localhost:5000/admin')
}
const facultylogin =document.querySelector('#faculty');
facultylogin.onclick=function(){
    fetch('http://localhost:5000/faculty')
}