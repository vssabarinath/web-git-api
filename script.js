const profilePicture = document.getElementById('profile-pic');
const fullName = document.getElementById('full-name');
const userName = document.getElementById('username');
const repoGrid = document.getElementById('repo-grid');

function truncateString(str, maxLength = 65) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  } else {
    return str;
  }
}

axios.get('https://api.github.com/users/shreyas-a-s')
  .then(response => {
    const userInfo = response.data;
    profilePicture.src = userInfo.avatar_url;
    fullName.textContent = userInfo.name;
    userName.textContent = userInfo.login;
  })
  .catch(error => {
    console.log('Error while fetching user info: ' + error);
  });

axios.get('https://api.github.com/users/shreyas-a-s/repos')
  .then(response => {
    const reposInfo = response.data;

    // Sort the repos based on last updated time
    reposInfo.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB - dateA;
    });;

    // get the first 9 repos
    const slicedRepos = reposInfo.slice(0, 9);

    slicedRepos.forEach(repo => {
      // Create the card element
      const card = document.createElement('div');
      card.className = 'repo-card';

      // Create the repository name element
      const repoName = document.createElement('h3');
      repoName.className = 'repo-name';
      repoName.textContent = repo.name;

      // Create the repository description element
      const repoDescription = document.createElement('p');
      repoDescription.className = 'repo-description';
      repoDescription.textContent = repo.description ? truncateString(repo.description) : 'No description';

      // Create the link element
      const repoLink = document.createElement('a');
      repoLink.className = 'repo-link';
      repoLink.href = repo.html_url;
      repoLink.target = '_blank';
      repoLink.textContent = 'View on GitHub';

      // Append the elements to the card
      card.appendChild(repoName);
      card.appendChild(repoDescription);
      card.appendChild(repoLink);

      // Append the card to the repo grid
      repoGrid.appendChild(card);
    });
  })
  .catch(error => {
    console.log('Error while fetching repos info: ' + error);
  });
