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

// Условные ставки для прототипа, не реальные тарифы компании.
function calculateServiceCost({ business, tax, operations, employees, hr }) {
  const base = (business === 'ooo' ? 12000 : 5000)
    + ({ income: 0, expenses: 3000, general: 8000 }[tax]);
  const extraOperations = Math.max(0, operations - 30) * 100;
  const salary = employees * 700;
  const personnel = hr ? employees * 300 : 0;
  return { base, extraOperations, salary, personnel, total: base + extraOperations + salary + personnel };
}
const calculator = document.querySelector('#calculator-form');
const businessType = document.querySelector('#business-type');
const taxSystem = document.querySelector('#tax-system');
const operations = document.querySelector('#operations');
const employees = document.querySelector('#employees');
const hrDocuments = document.querySelector('#hr-documents');
const rubles = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
function updateCalculator() {
  const employeeCount = Number(employees.value);
  hrDocuments.disabled = employeeCount === 0;
  if (!employeeCount) hrDocuments.checked = false;
  document.querySelector('#operations-value').textContent = operations.value;
  document.querySelector('#employees-value').textContent = employees.value;
  const cost = calculateServiceCost({ business: businessType.value, tax: taxSystem.value,
    operations: Number(operations.value), employees: employeeCount, hr: hrDocuments.checked });
  for (const [id, value] of Object.entries({ 'calc-base': cost.base, 'calc-operations': cost.extraOperations,
    'calc-salary': cost.salary, 'calc-hr': cost.personnel, 'calc-total': cost.total })) {
    document.getElementById(id).textContent = rubles(value);
  }
  return cost;
}
calculator.addEventListener('input', updateCalculator);
calculator.addEventListener('change', updateCalculator);
calculator.addEventListener('submit', event => event.preventDefault());
document.querySelector('#calc-request').addEventListener('click', () => {
  const cost = updateCalculator();
  const summary = `Расчёт обслуживания: ${businessType.selectedOptions[0].textContent}, ${taxSystem.selectedOptions[0].textContent}; операций в месяц: ${operations.value}; сотрудников: ${employees.value}; кадровое сопровождение: ${hrDocuments.checked ? 'да' : 'нет'}. Примерная стоимость: ${rubles(cost.total)}/месяц.`;
  const previous = message.value.replace(/^Расчёт обслуживания:.*?(?:\n\n|$)/u, '').trim();
  message.value = [summary, previous].filter(Boolean).join('\n\n');
});
updateCalculator();
