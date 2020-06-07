import Reveal from 'reveal.js';
window.Reveal = Reveal;

Reveal.configure({
});

Reveal.initialize({
  controls: true,
  mouseWheel: true,
  dependencies: [
    { src: 'plugins/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugins/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugins/highlight.js', async: true },
  ],
  markdown: {
    smartypants: true
  },
});
