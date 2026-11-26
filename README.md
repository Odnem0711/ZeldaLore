# ZeldaLore

ZeldaLore is a website that presents the chronology of The Legend of Zelda saga, game by game. Each branch of the timeline groups the games that belong to the same storyline, and clicking a game opens its description, cover, and official link.

**Live site:** https://odnem0711.github.io/ZeldaLore

## Team

- Lohan Nantha
- Anna-Lucia Puddinu
- Eloise Goulais
- Lauris Amendola

Department of Computer Science, IUT d'Aix-Marseille Université (AMU), S1 project for the course *Développement d'interfaces Web*.

## Features

- Interactive timeline: click a branch title to show its games, or click a game to jump to its description.
- Two stylesheets: a green theme and a gold theme, switched with the triforce image in the header, with a sound effect.
- Contact form that opens a pre-filled email in the visitor's mail client.
- Embedded YouTube video with a hidden easter egg (Konami code).
- Responsive layout for smartphones, tablets, and desktops.
- Scroll-to-top button and a "Back to top" anchor for long pages.
- SEO: meta description, Open Graph and Twitter tags, JSON-LD structured data, and an "About us" page.

## Project structure

```
project/
├── index.html
└── sources/
    ├── timeline.html
    ├── about.html
    ├── script.js
    ├── style1.css
    ├── style2.css
    ├── Font/
    │   └── Triforce.ttf
    ├── Sounds/
    │   ├── sound1.mp3
    │   └── sound2.mp3
    └── images/
        └── ...
```

## Technologies

- HTML5 with semantic elements
- CSS3 (custom properties, `clamp()`, `aspect-ratio`, grid and flexbox)
- Vanilla JavaScript (DOM manipulation, `mailto:` links, YouTube embed)
- Google Fonts (Jersey 20)

## Running the project locally

Clone the repository, then start a local server from the project folder:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

Opening `index.html` directly from the file system can break the stylesheets, sounds, and video, so use a server.

## Browser support

Tested on recent versions of Chrome and Firefox on Windows. Mail links need a mail application configured on the computer.

