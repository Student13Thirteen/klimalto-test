(() => {
  const form = document.getElementById('quote-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  // Servizio gratuito per recapitare il modulo via email.
  // Alla PRIMA richiesta FormSubmit invierà una email di attivazione a klimaltosystem@gmail.com.
  // Dopo averla confermata, i messaggi successivi arriveranno normalmente.
  const endpoint = 'https://formsubmit.co/ajax/klimaltosystem@gmail.com';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());

    status.className = 'form-status';
    status.textContent = 'Invio in corso…';
    button.disabled = true;

    const payload = {
      ...data,
      _subject: 'Nuova richiesta preventivo dal sito Klimalto System',
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Invio non riuscito');

      status.className = 'form-status success';
      status.textContent = 'Richiesta inviata! Ti ricontatteremo al più presto.';
      form.reset();
    } catch (error) {
      status.className = 'form-status error';
      status.innerHTML = 'Invio email non riuscito. <a href="https://wa.me/393314184949" target="_blank" rel="noopener"><strong>Scrivici su WhatsApp</strong></a> oppure chiama il +39 331 418 4949.';
    } finally {
      button.disabled = false;
    }
  });
})();
