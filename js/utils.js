const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = matchMedia("(pointer: coarse)").matches;

const NEW_TAB = 'target="_blank" rel="noopener"';

function icon(name, cls) {
  return `<svg class="ic${cls ? " " + cls : ""}" aria-hidden="true"><use href="assets/icons.svg#i-${name}"/></svg>`;
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

function tagList(tags = []) {
  return `<div class="tags">${tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div>`;
}

function bulletList(items) {
  if (!items?.length) return "";
  return `<ul class="feature-list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function scrollToEl(el) {
  el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

async function fetchJSON(url) {
  const res = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(4000) });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

function countLanguages(repoList) {
  const counts = {};
  for (const repo of repoList) {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  }
  return counts;
}

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
