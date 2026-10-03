// 1. Highlight the nav link of the section you are viewing
var links = document.querySelectorAll('.nav nav a');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(function (s) {
  observer.observe(s);
});

// 2. Project details popup
var modal = document.getElementById('modal');
document.querySelectorAll('.link').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.getElementById('m-title').textContent = btn.dataset.title;
    document.getElementById('m-text').textContent = btn.dataset.text;
    document.getElementById('m-tech').textContent = btn.dataset.tech;
    modal.showModal();
  });
});
modal.querySelector('.close').addEventListener('click', function () {
  modal.close();
});
modal.addEventListener('click', function (e) {
  if (e.target === modal) modal.close();
});

// 3. Contact form: opens your email app with the message filled in
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var f = new FormData(e.target);
  var body = f.get('msg') + '\n\nFrom: ' + f.get('name') + ' (' + f.get('email') + ')';
  location.href = 'mailto:poorvishivappa@gmail.com?subject=' +
    encodeURIComponent('Portfolio message from ' + f.get('name')) +
    '&body=' + encodeURIComponent(body);
});

// 4. Skills explorer: tap a skill to see details
var skills = {
  'Python': 'My main language. Used for data analysis and projects, with a Python certificate from freeCodeCamp and a Python developer internship.',
  'Flask': 'Used as the backend of my multilingual campus support chatbot.',
  'HTML & CSS': 'Used to build the front end of my projects. I also attended workshops on front-end development and UX/UI design.',
  'JavaScript': 'Used for interactive pages on the web, including this portfolio.',
  'SQL': 'Relational database skills, and I am studying Database Management Systems through NPTEL.',
  'MongoDB': 'Completed the Introduction to MongoDB course at MongoDB University.',
  'AI & NLP': 'Completed Getting Started with Artificial Intelligence (IBM SkillsBuild) and used AI and NLP in my chatbot and HealthBridge projects.',
  'Data Analytics': 'Completed a one-month virtual internship in Data Analytics with SKILLVORO.',
  'AWS': 'Basic knowledge of AWS cloud services.'
};
var chips = document.getElementById('chips');
function showSkill(name, btn) {
  document.getElementById('p-title').textContent = name;
  document.getElementById('p-text').textContent = skills[name];
  chips.querySelectorAll('.chip').forEach(function (c) {
    c.classList.toggle('on', c === btn);
  });
}
Object.keys(skills).forEach(function (name, i) {
  var b = document.createElement('button');
  b.className = 'chip';
  b.textContent = name;
  b.addEventListener('click', function () { showSkill(name, b); });
  chips.appendChild(b);
  if (i === 0) showSkill(name, b);
});

// 5. Fade-in on scroll
var fade = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      fade.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.card, .item, .resume-card').forEach(function (el) {
  el.classList.add('reveal');
  fade.observe(el);
});

// 6. Typing effect
var words = ['AI-powered web apps', 'Python projects', 'multilingual chatbots', 'data analytics work'];
var typeEl = document.getElementById('type');
var wi = 0, ci = 0, del = false;
function tick() {
  var w = words[wi];
  typeEl.textContent = w.slice(0, ci);
  if (!del && ci === w.length) { del = true; return setTimeout(tick, 1400); }
  if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
  ci += del ? -1 : 1;
  setTimeout(tick, del ? 35 : 70);
}
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { typeEl.textContent = words[0]; } else { tick(); }

// 7. Count-up numbers
var counter = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    var el = e.target, to = parseFloat(el.dataset.to), dec = el.dataset.to.indexOf('.') > -1 ? 1 : 0, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1200, 1);
      el.textContent = (to * p).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    counter.unobserve(el);
  });
});
document.querySelectorAll('.stats b').forEach(function (b) { counter.observe(b); });

// 8. Soft light that follows the mouse
var glow = document.getElementById('glow');
window.addEventListener('mousemove', function (e) {
  glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
});