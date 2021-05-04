document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getall_check'+-1)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});
const take =document.querySelector('#take');
take.onclick = function(){
    const searchValue = document.querySelector('#semester-input').value;
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
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({Rollno,Name,no_attended,total_no}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${Rollno}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${no_attended}</td>`;
        tableHtml += `<td>${total_no}</td>`;
        var pn;
        if(total_no==0){
            pn=0.00;
        }
        else{
        var p=no_attended/total_no*100;
        pn = p.toFixed(2);
        }
        tableHtml += `<td>${pn}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
