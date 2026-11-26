// Le js a ete fait par claude le goat

document.addEventListener('DOMContentLoaded', () => {
  const articles = document.querySelectorAll('.jeu');

  // Each h3 in the nav starts a branch; its games are the links up to the next h3
  const branchData = Array.from(document.querySelectorAll('.timeline_branche h3')).map(title => {
    const ids = [];
    let el = title.nextElementSibling;
    while (el && el.tagName !== 'H3') {
      el.querySelectorAll('a[href^="#"]').forEach(link => {
        ids.push(link.getAttribute('href').substring(1));
      });
      el = el.nextElementSibling;
    }
    return { title, ids };
  });

  function showBranch(index) {
    articles.forEach(article => article.classList.add('is-hidden'));

    branchData[index].ids.forEach(id => {
      const article = document.getElementById(id);
      if (article) article.classList.remove('is-hidden');
    });

    branchData.forEach(branch => branch.title.classList.remove('active'));
    branchData[index].title.classList.add('active');
  }

  function findBranchIndex(id) {
    return branchData.findIndex(branch => branch.ids.includes(id));
  }

  // Click on a branch title
  branchData.forEach((branch, index) => {
    branch.title.addEventListener('click', () => {
      showBranch(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (branch.ids.length) {
        history.pushState(null, '', '#' + branch.ids[0]);
      }
    });
  });

  // Click on an episode link
  document.querySelectorAll('.timeline_jeux a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const id = link.getAttribute('href').substring(1);
      const index = findBranchIndex(id);
      if (index !== -1) showBranch(index);

      const article = document.getElementById(id);
      if (article) {
        article.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + id);
      }
    });
  });

  window.addEventListener('popstate', () => {
    const id = window.location.hash.substring(1);
    const index = findBranchIndex(id);
    if (index !== -1) showBranch(index);
  });

  const hash = window.location.hash.substring(1);
  const startIndex = findBranchIndex(hash);
  showBranch(startIndex !== -1 ? startIndex : 0);
});


// Ca par contre c'est moi qui lai fait

function ChangeStyle() {
  let link = document.getElementById('original');
  const audio = new Audio('Sounds/sound.mp3');
  audio.play();
  if (link.getAttribute('href') == "style1.css") {
    link.setAttribute('href', 'style2.css');
  } else {
    link.setAttribute('href', 'style1.css');
  }
}

function sendMail() {
	const nom = document.getElementById('nameForm').value;
	const message = document.getElementById('messageForm').value;
	window.location.href = "mailto:lauris.amendola@etu.univ-amu.fr,lohan.nanthavongdouangsy@etu.univ-amu.fr,eloise.goulais@etu.univ-amu.fr,anna-lucia.puddinu@etu.univ-amu.fr?&subject=Message de la part de " + nom + "&body=" + message ;
}
