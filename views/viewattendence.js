const take =document.querySelector('#take');
take.onclick = function(){
    var searchValue = document.querySelector('#name-input').value;
    fetch('http://localhost:5000/getall_log'+ searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

}
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    
    data.forEach(function ({rollno,Date,present}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${rollno}</td>`;
        tableHtml += `<td>${Date}</td>`;
        tableHtml += `<td>${present}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
