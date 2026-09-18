const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
document.querySelector('.qr-grid').replaceChildren(...Array.from({ length: 64 }, () => document.createElement('i')));
document.querySelector('#membership-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const details = [
    `Full name: ${form.get('name')}`,
    `Email: ${form.get('email')}`,
    `ID number: ${form.get('idNumber') || 'Not supplied'}`,
    `Mobile: ${form.get('phone')}`,
    `Previous club: ${form.get('previousClub') || 'None'}`,
    `Member of another club: ${form.get('otherClub')}`,
    `Played league before: ${form.get('leagueExperience')}`,
    `Membership: ${form.get('membership')}`,
    `Notes: ${form.get('notes') || 'None'}`,
  ].join('\n');
  window.location.href = `mailto:swanneysmobile@gmail.com,kensington2016@gmail.com?subject=${encodeURIComponent('Bellevue membership application')}&body=${encodeURIComponent(details)}`;
  const status = document.querySelector('.form-message');
  status.hidden = false;
  status.textContent = 'Your email application has been prepared for the Chairman and Club Secretary. Please press Send in your email app to submit it.';
});
