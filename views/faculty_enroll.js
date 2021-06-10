document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getall_fac')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});
const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search_fac/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
function deleteRowById(id) {
    fetch('http://localhost:5000/delete_fac/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}
function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}
updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:5000/update_fac', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}
const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";
    const subjectInput = document.querySelector('#subject-input');
    const subject = subjectInput.value;
    const departmentInput = document.querySelector('#department-input');
    const department = departmentInput.value;
    departmentInput.value = "";
    const semesterInput = document.querySelector('#semester-input');
    const semester = semesterInput.value;
    semesterInput.value = "";
    const classInput = document.querySelector('#class-input');
    const clas = classInput.value;
    classInput.value = "";
    console.log(name);
    fetch('http://localhost:5000/insert_fac', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name , subject:subject, department:department, semester:semester, clas:clas})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";
    var f=0;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if(f!=0){
            tableHtml += `<td>${data[key]}</td>`;
        }
        f=1;
    }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, subject, department, semester ,clas}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${subject}</td>`;
        tableHtml += `<td>${department}</td>`;
        tableHtml += `<td>${semester}</td>`;
        tableHtml += `<td>${clas}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}