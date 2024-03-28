document.addEventListener('DOMContentLoaded', function() {
    const perPage = 10; // Number of items per page
    let currentPage = 1;
    let totalPages = 0;
    let data = []; // Array to store fetched data

    // Fetch data from the provided URL
    fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
        .then(response => response.json())
        .then(responseData => {
            data = responseData;
            totalPages = Math.ceil(data.length / perPage);
            renderTable(currentPage);
            renderPaginationButtons();
        })
        .catch(error => console.error('Error fetching data:', error));

    // Render table function
    function renderTable(page) {
        const tbody = document.querySelector('#table tbody');
        tbody.innerHTML = ''; // Clear previous data

        const startIdx = (page - 1) * perPage;
        const endIdx = Math.min(startIdx + perPage, data.length);

        for (let i = startIdx; i < endIdx; i++) {
            const entry = data[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.id}</td>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
            `;
            tbody.appendChild(row);
        }
    }

    // Render pagination buttons function
    function renderPaginationButtons() {
        const buttonsDiv = document.getElementById('buttons');
        buttonsDiv.innerHTML = ''; // Clear previous buttons

        const firstButton = createButton('First', () => goToPage(1));
        buttonsDiv.appendChild(firstButton);

        const prevButton = createButton('Previous', () => goToPage(currentPage - 1));
        buttonsDiv.appendChild(prevButton);

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(startPage + 4, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = createButton(i, () => goToPage(i));
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            buttonsDiv.appendChild(pageButton);
        }

        const nextButton = createButton('Next', () => goToPage(currentPage + 1));
        buttonsDiv.appendChild(nextButton);

        const lastButton = createButton('Last', () => goToPage(totalPages));
        buttonsDiv.appendChild(lastButton);
    }

    // Function to create a button
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'btn btn-primary m-1';
        button.addEventListener('click', onClick);
        return button;
    }

    // Function to navigate to a specific page
    function goToPage(page) {
        if (page < 1 || page > totalPages) {
            return;
        }
        currentPage = page;
        renderTable(page);
        renderPaginationButtons();
    }
});
