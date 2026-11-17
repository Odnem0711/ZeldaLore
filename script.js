document.addEventListener('DOMContentLoaded', () => {
  const branches = document.querySelectorAll('.timeline__branche');
  const articles = document.querySelectorAll('.jeu');

  // For each branch, collect the article ids its links point to
  const branchData = Array.from(branches).map(branch => ({
    element: branch,
    ids: Array.from(branch.querySelectorAll('a[href^="#"]'))
      .map(link => link.getAttribute('href').substring(1))
  }));

  // Hide all games, then show the games of the chosen branch
  function showBranch(index) {
    articles.forEach(article => article.classList.add('is-hidden'));

    branchData[index].ids.forEach(id => {
      const article = document.getElementById(id);
      if (article) article.classList.remove('is-hidden');
    });

    branches.forEach(branch => branch.classList.remove('active'));
    branchData[index].element.classList.add('active');
  }

  // Find which branch contains a given article id
  function findBranchIndex(id) {
    return branchData.findIndex(branch => branch.ids.includes(id));
  }

  // Click on a timeline link
  document.querySelectorAll('.timeline__branche a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // stop the page from jumping
      const id = link.getAttribute('href').substring(1);
      const index = findBranchIndex(id);

      if (index !== -1) {
        showBranch(index);
        history.pushState(null, '', '#' + id);
      }
    });
  });

  // On load: show the branch from the URL if there is one, otherwise the first branch
  const hash = window.location.hash.substring(1);
  const startIndex = findBranchIndex(hash);
  showBranch(startIndex !== -1 ? startIndex : 0);
});
