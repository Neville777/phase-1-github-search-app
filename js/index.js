document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      // Clear previous results
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      if (searchTerm !== '') {
        searchGitHubUsers(searchTerm);
      }
    });
  
    function searchGitHubUsers(username) {
      // Make a request to GitHub User Search Endpoint
      fetch(`https://api.github.com/search/users?q=${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            displayUserResults(data.items);
          } else {
            userList.innerHTML = '<li>No users found.</li>';
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  
    function displayUserResults(users) {
      users.forEach((user) => {
        const listItem = document.createElement('li');
        const avatar = user.avatar_url;
        const username = user.login;
        const profileLink = user.html_url;
  
        listItem.innerHTML = `
          <img src="${avatar}" alt="${username}" />
          <span class="username">${username}</span>
          <a href="${profileLink}" target="_blank">Profile</a>
        `;
  
        listItem.addEventListener('click', function () {
          getUserRepositories(username);
        });
  
        userList.appendChild(listItem);
      });
    }
  
    function getUserRepositories(username) {
      // Make a request to GitHub User Repos Endpoint
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            displayUserRepositories(data);
          } else {
            reposList.innerHTML = '<li>No repositories found for this user.</li>';
          }
        })
        .catch((error) => {
          console.error('Error fetching user repositories:', error);
        });
    }
  
    function displayUserRepositories(repositories) {
      reposList.innerHTML = '';  
  
      repositories.forEach((repo) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(listItem);
      });
    }
  });
  