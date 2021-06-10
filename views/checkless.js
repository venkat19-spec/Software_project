document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getallsem')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({subject,present,total}) {
        var pn;
        if(present==0){
            pn=0.00;
        }
        else{
        var p=present/total*100;
        pn = p.toFixed(2);
        }
       
        if(pn<75){
        tableHtml += "<tr>";
        tableHtml += `<td>${subject}</td>`;
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
    }
    });

    table.innerHTML = tableHtml;
}
