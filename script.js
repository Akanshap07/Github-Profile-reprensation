const perPageSelect = document.getElementById('perPage');
const usernameInput = document.getElementById('username');
const repositoriesContainer = document.getElementById('repositories');
const currentPageSpan = document.getElementById('currentPage');

let currentPage = 1;

function searchRepositories() {
    const username = usernameInput.value;
    const perPage = perPageSelect.value;
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRepositories(data))
        .catch(error => console.error('Error fetching repositories:', error));
}

function displayRepositories(repositories) {
    repositoriesContainer.innerHTML = '';

    if (repositories.length === 0) {
        repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
        return;
    }

    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.innerHTML = `<p><strong>${repo.name}</strong>: ${repo.description}</p>`;
        repositoriesContainer.appendChild(repoElement);
    });

    updatePagination();
}

function updatePagination() {
    currentPageSpan.textContent = currentPage;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        searchRepositories();
    }
}

function nextPage() {
    currentPage++;
    searchRepositories();
}
