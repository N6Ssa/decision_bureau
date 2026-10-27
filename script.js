document.querySelector('#year').textContent = new Date().getFullYear();
const message = document.querySelector('#message');
document.querySelectorAll('[data-plan]').forEach(link => {
  link.addEventListener('click', () => {
    message.value = `Интересует пакет «${link.dataset.plan}». `;
  });
});
const dialog = document.querySelector('#demo-dialog');
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  dialog.showModal();
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});

// Условные ставки прототипа: услуги специалистов, без лицензий и подписок.
function calculateServiceCost({ configuration, hours, users, modified }) {
  if (configuration === 'custom' || modified) return null;
  const base = { 2: 5000, 6: 12000, 12: 22000 }[hours];
  const configurationCost = { accounting: 0, payroll: 2000, trade: 3000 }[configuration];
  const extraUsers = Math.max(0, users - 3) * 500;
  return { base, configurationCost, extraUsers, total: base + configurationCost + extraUsers };
}
const calculator = document.querySelector('#calculator-form');
const configuration = document.querySelector('#configuration');
const supportPlan = document.querySelector('#support-plan');
const users = document.querySelector('#users');
const modified = document.querySelector('#modified');
const rubles = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
function updateCalculator() {
  document.querySelector('#users-value').textContent = users.value;
  const cost = calculateServiceCost({ configuration: configuration.value, hours: Number(supportPlan.value), users: Number(users.value), modified: modified.checked });
  document.querySelector('#calc-total-caption').textContent = cost ? '/ месяц' : 'после знакомства с базой';
  for (const [id, value] of Object.entries({ 'calc-base': cost?.base, 'calc-configuration': cost?.configurationCost, 'calc-users': cost?.extraUsers, 'calc-total': cost?.total })) {
    document.getElementById(id).textContent = value === undefined ? (id === 'calc-total' ? 'По задаче' : '—') : rubles(value);
  }
  return cost;
}
calculator.addEventListener('input', updateCalculator);
calculator.addEventListener('change', updateCalculator);
calculator.addEventListener('submit', event => event.preventDefault());
document.querySelector('#calc-request').addEventListener('click', () => {
  const cost = updateCalculator();
  const summary = 'Расчёт сопровождения 1С: ' + configuration.selectedOptions[0].textContent + '; пакет: ' + supportPlan.selectedOptions[0].textContent + '; пользователей: ' + users.value + '; доработанная конфигурация: ' + (modified.checked ? 'да' : 'нет') + '. ' + (cost ? 'Примерная стоимость: ' + rubles(cost.total) + '/месяц.' : 'Нужна индивидуальная оценка.') + ' Лицензии и подписки не включены.';
  const previous = message.value.replace(/^Расчёт (?:обслуживания|сопровождения 1С):.*?(?:\n\n|$)/u, '').trim();
  message.value = [summary, previous].filter(Boolean).join('\n\n');
});
updateCalculator();
