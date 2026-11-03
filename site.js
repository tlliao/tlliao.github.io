/* Frontend-only behavior. No build step, backend, or runtime fetch required. */
(function () {
  'use strict';
  const data = window.homepageData;
  const rows = Array.from(document.querySelectorAll('.publication'));
  const filters = document.getElementById('publication-filters');
  const status = document.getElementById('publication-status');
  const buttons = [];

  function matches(row, category) {
    return category === 'full' || (data.publicationCategories[row.dataset.paper] || []).includes(category);
  }

  function selectCategory(category) {
    let count = 0;
    rows.forEach(function (row) {
      row.hidden = !matches(row, category);
      if (!row.hidden) count += 1;
      if (row.hidden) {
        row.querySelectorAll('.bibtex-panel').forEach(function (panel) { panel.hidden = true; });
        row.querySelectorAll('.bibtex-toggle').forEach(function (link) { link.setAttribute('aria-expanded', 'false'); });
      }
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.category === category));
    });
    const label = data.categories.find(function (item) { return item.id === category; }).label;
    status.textContent = category === 'full' ? 'Showing all ' + count + ' publications' : label + ' · ' + count + (count === 1 ? ' publication' : ' publications');
  }

  data.categories.forEach(function (category) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-button';
    button.dataset.category = category.id;
    button.setAttribute('aria-controls', 'publication-list');
    const label = document.createElement('span');
    label.textContent = category.label;
    const count = document.createElement('span');
    count.className = 'filter-count';
    count.textContent = rows.filter(function (row) { return matches(row, category.id); }).length;
    button.append(label, count);
    button.addEventListener('click', function () { selectCategory(category.id); });
    buttons.push(button);
    filters.appendChild(button);
  });
  filters.hidden = false;
  selectCategory('full');

  document.getElementById('news-empty').hidden = data.news.length > 0;
  data.news.forEach(function (entry) {
    const item = document.createElement('li');
    const date = document.createElement('time');
    date.dateTime = entry.date;
    date.textContent = entry.displayDate || entry.date;
    const content = document.createElement('div');
    content.appendChild(document.createTextNode(entry.text));
    (entry.links || []).forEach(function (link, index) {
      if (index) content.appendChild(document.createTextNode(' and '));
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      content.appendChild(anchor);
    });
    content.appendChild(document.createTextNode(entry.suffix || ''));
    item.append(date, content);
    document.getElementById('news-list').appendChild(item);
  });

  // News links reveal the referenced paper even when another filter is active.
  function revealLinkedPaper() {
    const row = rows.find(function (item) { return '#' + item.id === window.location.hash; });
    if (row) {
      if (row.hidden) selectCategory('full');
      row.scrollIntoView({ block: 'start' });
    }
  }
  window.addEventListener('hashchange', revealLinkedPaper);
  document.getElementById('news-list').addEventListener('click', function (event) {
    if (event.target.closest('a[href^="#paper-"]')) selectCategory('full');
  });
  if (window.location.hash) revealLinkedPaper();

  const talks = document.getElementById('talks-list');
  document.getElementById('talks-empty').hidden = data.talks.length > 0;
  data.talks.forEach(function (talk) {
    const item = document.createElement('li');
    const date = document.createElement('time');
    date.dateTime = talk.date;
    date.textContent = talk.date;
    const content = document.createElement('div');
    const title = document.createElement(talk.url ? 'a' : 'span');
    title.textContent = talk.title;
    if (talk.url) title.href = talk.url;
    content.appendChild(title);
    if (talk.host) {
      const host = document.createElement('span');
      host.className = 'talk-host';
      host.textContent = talk.host;
      content.appendChild(host);
    }
    item.append(date, content);
    talks.appendChild(item);
  });
})();

(function () {
        const bibEntries = window.homepageData.bibEntries;

        function loadBibText(bibId) {
          const bibText = bibEntries[bibId];
          if (!bibText) {
            throw new Error('BibTeX entry not found: ' + bibId);
          }
          return bibText.trim();
        }

        async function copyText(text) {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
          }

          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        function buildBibPanel(bibId) {
          const panel = document.createElement('div');
          panel.className = 'bibtex-panel';
          panel.dataset.bib = bibId;
          panel.hidden = true;

          const toolbar = document.createElement('div');
          toolbar.className = 'bibtex-toolbar';

          const status = document.createElement('span');
          status.className = 'bibtex-status';

          const copyButton = document.createElement('button');
          copyButton.type = 'button';
          copyButton.className = 'bibtex-copy-btn';
          copyButton.textContent = 'copy';

          const content = document.createElement('pre');
          content.className = 'bibtex-content';

          toolbar.appendChild(status);
          toolbar.appendChild(copyButton);
          panel.appendChild(toolbar);
          panel.appendChild(content);

          copyButton.addEventListener('click', async function () {
            const text = content.textContent || '';
            if (!text || text === 'Failed to load BibTeX.') {
              return;
            }

            try {
              await copyText(text);
              status.textContent = 'Copied';
            } catch (error) {
              status.textContent = 'Copy failed';
            }

            window.setTimeout(function () {
              status.textContent = '';
            }, 1400);
          });

          return panel;
        }

        function onBibToggleClick(event) {
          event.preventDefault();

          const trigger = event.currentTarget;
          const bibId = trigger.dataset.bib;
          if (!bibId) {
            return;
          }

          let panel = trigger.parentElement.querySelector('.bibtex-panel[data-bib="' + bibId + '"]');
          if (!panel) {
            panel = buildBibPanel(bibId);
            trigger.insertAdjacentElement('afterend', panel);
          }

          const isOpening = panel.hidden;

          document.querySelectorAll('.bibtex-panel').forEach(function (item) {
            if (item !== panel) {
              item.hidden = true;
            }
          });
          document.querySelectorAll('.bibtex-toggle').forEach(function (item) {
            if (item !== trigger) {
              item.setAttribute('aria-expanded', 'false');
            }
          });

          if (!isOpening) {
            panel.hidden = true;
            trigger.setAttribute('aria-expanded', 'false');
            return;
          }

          panel.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');

          const content = panel.querySelector('.bibtex-content');
          if (content.dataset.loaded === 'true') {
            return;
          }

          try {
            content.textContent = loadBibText(bibId);
            content.dataset.loaded = 'true';
          } catch (error) {
            content.textContent = 'Failed to load BibTeX.';
          }
        }

        document.querySelectorAll('.bibtex-toggle').forEach(function (link) {
          link.setAttribute('role', 'button');
          link.setAttribute('aria-expanded', 'false');
          link.addEventListener('click', onBibToggleClick);
          link.addEventListener('keydown', function (event) {
            if (event.key === ' ') {
              event.preventDefault();
              link.click();
            }
          });
        });
      })();
