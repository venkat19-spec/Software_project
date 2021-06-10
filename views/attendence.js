document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getall_attend'+-1)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});
const take =document.querySelector('#take');
take.onclick = function(){
    const searchValue = document.querySelector('#name-input').value;
    fetch('http://localhost:5000/getall_attend'+ searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

}
const addBtn = document.querySelector('#submit');
addBtn.onclick = function (){
    const searchValue = document.querySelector('#name-input').value;
    const Date = document.querySelector('#date-input').value;
    fetch('http://localhost:5000/update_attend', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            subject: searchValue
        })
    })
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
        fetch('http://localhost:5000/update_take', {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json'
            },
         
            body: JSON.stringify({
                id: checkboxes[i].id ,
            })
        
        })
        fetch('http://localhost:5000/update_log', {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                id: checkboxes[i].id,
                Date: Date,
                subject: searchValue
            
            })
        
        })    
      }

}
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    const searchValue = document.querySelector('#name-input').value;
    const Date = document.querySelector('#date-input').value;
    const Hour = document.querySelector('#Hour-input').value;
    const present = 0;
    data.forEach(function ({id,rollno,name}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${rollno}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml +=`<td><input type="checkbox" id=${id}></input></td>`;
        tableHtml += "</tr>";
        fetch('http://localhost:5000/insertlog', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ id : id , rollno:rollno, subject:searchValue, Date:Date, present:present, Hour:Hour, name:name})
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));

    });
    table.innerHTML = tableHtml;
}
