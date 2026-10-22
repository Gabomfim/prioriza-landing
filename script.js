const FORM_ENDPOINT = '';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('pt-BR');
const ids = ['leads', 'conversion', 'uplift', 'ticket'];

function updateCalculator() {
  const leads = Number(document.querySelector('#leads').value);
  const conversion = Number(document.querySelector('#conversion').value);
  const uplift = Number(document.querySelector('#uplift').value);
  const ticket = Number(document.querySelector('#ticket').value);
  const extraSales = Math.round(leads * (uplift / 100));
  const annual = extraSales * ticket * 12;
  document.querySelector('#leads-output').textContent = number.format(leads);
  document.querySelector('#conversion-output').textContent = `${conversion}%`;
  document.querySelector('#uplift-output').textContent = `+${uplift} p.p.`;
  document.querySelector('#ticket-output').textContent = money.format(ticket);
  document.querySelector('#result').textContent = money.format(annual);
  document.querySelector('#result-detail').textContent = `${extraSales} ${extraSales === 1 ? 'venda adicional' : 'vendas adicionais'} por mês`;
}

ids.forEach(id => document.querySelector(`#${id}`).addEventListener('input', updateCalculator));
updateCalculator();

const challenge = document.querySelector('#challenge');
challenge.addEventListener('input', () => {
  challenge.value = challenge.value.slice(0, 500);
  document.querySelector('#char-count').textContent = challenge.value.length;
});

const phone = document.querySelector('#phone');
phone.addEventListener('input', () => {
  const digits = phone.value.replace(/\D/g, '').slice(0, 11);
  phone.value = digits.length > 10
    ? digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    : digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
});

const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  status.className = 'form-status';
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Revise os campos destacados para continuar.';
    status.classList.add('error');
    return;
  }
  if (!FORM_ENDPOINT) {
    status.textContent = 'Formulário em fase de configuração. Obrigado pelo interesse — a captura será ativada no lançamento.';
    status.classList.add('error');
    return;
  }
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Enviando…';
  try {
    const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Falha no envio');
    form.reset();
    document.querySelector('#char-count').textContent = '0';
    status.textContent = 'Recebemos seus dados. Em breve, nossa equipe falará com você.';
    status.classList.add('success');
  } catch {
    status.textContent = 'Não foi possível enviar agora. Tente novamente em alguns instantes.';
    status.classList.add('error');
  } finally {
    button.disabled = false;
    button.innerHTML = 'Quero participar do piloto <span aria-hidden="true">↗</span>';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
