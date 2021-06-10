document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getall_check'+-1)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});
const take =document.querySelector('#take');
take.onclick = function(){
    const searchValue = document.querySelector('#name-input').value;
    fetch('http://localhost:5000/getall_check'+ searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

}
const addBtn = document.querySelector('#submit');
addBtn.onclick = function (){  
    location.replace("detailed_view.html");
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    
    data.forEach(function ({rollno,name,present,total}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${rollno}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${present}</td>`;
        tableHtml += `<td>${total}</td>`;
        var pn;
        if(total==0){
            pn=0.00;
        }
        else{
        var p=present/total*100;
        pn = p.toFixed(2);
        }
        tableHtml += `<td>${pn}</td>`;
        tableHtml += "</tr>";
        
    });

    table.innerHTML = tableHtml;
}
