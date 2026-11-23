document.addEventListener('DOMContentLoaded', () => {
  const branches = document.querySelectorAll('.timeline__branche');
  const articles = document.querySelectorAll('.jeu');

  // For each branch, keep its title element and the article ids its links point to
  const branchData = Array.from(branches).map(branch => ({
    element: branch,
    title: branch.querySelector('h3'),
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

  // Click on a branch title shows that branch
  branchData.forEach((branch, index) => {
    branch.title.addEventListener('click', () => {
      showBranch(index);
      if (branch.ids.length) {
        history.pushState(null, '', '#' + branch.ids[0]);
      }
    });
  });

  // Click on an episode link: show its branch, then center the game on the page
  document.querySelectorAll('.timeline__jeux a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // handle the scrolling ourselves

      const id = link.getAttribute('href').substring(1);
      const index = findBranchIndex(id);
      if (index !== -1) showBranch(index);

      const article = document.getElementById(id);
      if (article) {
        article.scrollIntoView({ behavior: 'smooth', block: 'center' });
        history.pushState(null, '', '#' + id);
      }
    });
  });
// Back and forward buttons: show the branch matching the URL
  window.addEventListener('popstate', () => {
    const id = window.location.hash.substring(1);
    const index = findBranchIndex(id);
    showBranch(index !== -1 ? index : 0);
  });

  // On load: show the branch from the URL if there is one, otherwise the first branch
  const hash = window.location.hash.substring(1);
  const startIndex = findBranchIndex(hash);
  showBranch(startIndex !== -1 ? startIndex : 0);
});
