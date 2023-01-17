const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const API_URL = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000%40public&facet=feature_code&facet=cou_name_en&facet=timezone&sort=population&rows=5&q='

const select = document.getElementById('select-element');
const contry = document.getElementById("country-states-container");

countries.forEach(data => {
    const countryOption = document.createElement('option');
    countryOption.innerHTML = data.name;
    countryOption.setAttribute("value", data.name);
    select.appendChild(countryOption);
});

function displayCountry() {
    contry.innerHTML = "";
    const selectedOption = select.options[select.selectedIndex];
    const selectedValue = selectedOption.value;
    const url = API_URL + selectedValue;
    const searchText = document.createElement('h4');
    searchText.textContent = "Search results for: " + selectedValue;

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headerCells = ['City name', 'Population'].map(text => {
                const th = document.createElement('th');
                th.textContent = text;
                return th;
            });

            headerCells.forEach(cell => headerRow.appendChild(cell));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            data = data.records;
            data.forEach(item => {
                const row = document.createElement('tr');

                const td1 = document.createElement('td');
                const td2 = document.createElement('td');

                td1.textContent = item.fields.name;
                td2.textContent = item.fields.population;
                row.appendChild(td1);
                row.appendChild(td2);
                tbody.appendChild(row);
            });
            table.className = "table table-striped mt-4";
            table.appendChild(tbody);
            contry.appendChild(searchText);
            contry.appendChild(table);

        })
        .catch(error => console.log('error', error));
}

document.getElementById("find-button").addEventListener("click", displayCountry);