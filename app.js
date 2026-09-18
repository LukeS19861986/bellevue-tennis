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
const membershipForm = document.querySelector('#membership-form');
const membershipSubmit = membershipForm.querySelector('button[type="submit"]');
const membershipStatus = membershipForm.querySelector('.form-message');

membershipForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (membershipSubmit.disabled) return;

  membershipStatus.hidden = true;
  membershipSubmit.disabled = true;
  membershipSubmit.textContent = 'Sending…';

  try {
    const response = await fetch('https://forms.bellevuetennis.co.za/membership.php', {
      method: 'POST',
      mode: 'cors',
      headers: { Accept: 'application/json' },
      body: new FormData(membershipForm),
    });

    if (!response.ok) throw new Error('Submission failed');

    membershipStatus.textContent = 'Thank you. Your membership application has been submitted successfully.';
  } catch (error) {
    membershipStatus.textContent = "We couldn't submit your application. Please try again.";
  } finally {
    membershipStatus.hidden = false;
    membershipSubmit.disabled = false;
    membershipSubmit.textContent = 'Send application';
  }
});
