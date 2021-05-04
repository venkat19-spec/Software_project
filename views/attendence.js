document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getall_attend'+-1)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});
const take =document.querySelector('#take');
take.onclick = function(){
    const searchValue = document.querySelector('#semester-input').value;
    fetch('http://localhost:5000/getall_attend'+ searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

}
const addBtn = document.querySelector('#submit');
addBtn.onclick = function (){
    fetch('http://localhost:5000/update_attend', {
        method: 'PATCH'
    })
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
        fetch('http://localhost:5000/update_take', {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                id: checkboxes[i].id 
            
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

    data.forEach(function ({id,Rollno,Name}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${Rollno}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml +=`<td><input type="checkbox" id=${id}></input></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
