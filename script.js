'use strict';
const content = document.querySelector('#content');
const dialog = document.querySelector('#request-dialog');
const requestForm = document.querySelector('#request-form');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const asset = (page, name, alt = '', className = '') => {
  const source = DESIGN_ASSETS[page]?.[name];
  if (!source) throw new Error('Missing design asset: ' + page + '/' + name);
  return '<img src="' + source + '" alt="' + escapeHtml(alt) + '" class="' + className + '">';
};
const wordmark = '<span class="wordmark-word"><span class="capital">б</span><span class="small">юро</span></span><span class="wordmark-word"><span class="capital">Р</span><span class="small">ешений</span></span>';
const requestButton = (title = 'Заказать услугу', label = 'заказать услуги', comment = '') => '<button type="button" class="button" data-request="' + escapeHtml(title) + '" data-comment="' + escapeHtml(comment) + '">' + escapeHtml(label) + '</button>';
const heading = (title, back = '') => '<h1>' + (back ? '<a class="back" href="#' + back + '" aria-label="Назад">‹</a>' : '') + title + '</h1>';

function homePage() {
  return '<section class="home" aria-label="Бюро решений">' + asset('home','imgEllipse126','','home-glow') +
    '<h1 class="wordmark" aria-label="Бюро решений">' + wordmark + '</h1><p class="mission">Мы стремимся облегчить вашу жизнь, устраняя ненужные вопросы и сложности в сфере бухгалтерии. Наше увлечение работой позволяет нам видеть в учете не просто цифры, а целую историю!</p>' +
    '<div class="stats">' + [['<small>с</small>2015','опыт в бухгалтерии'],['70','Бухгалтеров в команде'],['200','Компаний нам доверяют'],['1','Среди франчайзи']].map(([number,text]) => '<article class="stat"><strong>' + number + '</strong><p>' + text + '</p></article>').join('') + '</div></section>';
}
function approachPage() {
  const benefit = (icon,title,text,yellow = false) => '<article class="benefit card' + (yellow?' yellow':'') + '">' + asset('143:243',icon) + '<h2>' + title + '</h2><p>' + text + '</p></article>';
  return '<section class="page-section approach">' + heading('С нами вы получаете больше, чем бухгалтерию') +
    '<div class="benefits"><div class="benefit-column">' +
    benefit('imgGroup','Фокус на ваших<br>потребностях','Подстраиваемся под ваш бизнес: размер, отрасль, сезонность. Знаем, как оптимизировать налоговую нагрузку и общаться с контролирующими органами.',true) +
    benefit('imgGroup5','Финансовые гарантии','Всегда работаем по договору и несём материальную ответственность за ваш учёт. Не оставим вас наедине с вопросами и поможем решить все проблемы!') +
    '</div><div class="benefit-column">' +
    benefit('imgGroup1','Практический опыт во всех вопросах бухгалтерии','Мы не только регулярно обучаемся, но и обмениваемся ценным опытом внутри команды. Наши бухгалтеры ведут учёт самых разных сфер бизнеса по всей России.') +
    benefit('imgGroup4','Оплата только за оказанные услуги','Тарифы складываются из количества операций. Вы видите и знаете, за что платите ежемесячно. За нас не нужно оплачивать взносы или выплачивать отпускные.',true) +
    '</div><div class="benefit-column"><div class="benefit-split"><article class="benefit card partner-card">' + asset('143:243','img11','1С') + '<strong>1С:Бухгалтерия</strong></article>' +
    benefit('imgGroup3','Защита и безопасность данных','Ваши базы и документы будут храниться на защищённых серверах 1С.') + '</div>' +
    benefit('imgGroup2','Безопасность и конфиденциальность','Работаем в облачной 1С:Бухгалтерия, и бесплатно предоставляем вам доступ к вашей базе. Данные надёжно хранятся на защищённых серверах.',true) + '</div></div></section>';
}
function servicesPage() {
  return '<section class="page-section services"><div class="services-intro"><p>Коммерческая деятельность любых размеров требует участия квалифицированного бухгалтера.</p><p>Помощь специалиста требуется не только юридическим, но и физическим лицам, особенно в ситуациях, касающихся заполнения налоговых документов и получения вычетов. «Бухгалтерия Плюс» предлагает своим клиентам комплекс услуг, помогающий быстро решить различные проблемы.</p></div><div class="service-categories"><a href="#business"><h1>ЮРИДИЧЕСКИМ ЛИЦАМ</h1><p>Полный спектр услуг по поддержке вашего бизнеса</p></a><a href="#individual"><h2>ФИЗИЧЕСКИМ ЛИЦАМ</h2><p>Мы окажем лучшую поддержку и защиту наших клиентов</p></a><a href="#rates"><h2>ТАРИФЫ</h2></a></div></section>';
}
const businessServices = [
  ['РЕГИСТРАЦИЯ ООО И ИП БЕЗ ВИЗИТА В ИНСПЕКЦИЮ','registration','imgGroup',false],
  ['СПИСАНИЕ ЗАДОЛЖЕННОСТИ ПО НАЛОГАМ','debt','imgGroup1',true],
  ['НАЛОГОВАЯ ОПТИМИЗАЦИЯ','optimization','imgMingcuteTrendingUpFill',false],
  ['НАЛОГОВЫЙ АУДИТ','audit','imgGroup6',true],
  ['СОПРОВОЖДЕНИЕ КАМЕРАЛЬНЫХ И ВЫЕЗДНЫХ НАЛОГОВЫХ ПРОВЕРОК','inspections','imgGroup4',true],
  ['КАДРОВЫЙ УЧЁТ НА ПРЕДПРИЯТИИ','staff','imgGroup3',false],
  ['ВОССТАНОВЛЕНИЕ БУХГАЛТЕРСКОГО УЧЁТА','recovery','imgGroup2',true],
  ['СБИС','sbis','imgGroup5',false]
];
const individualServices = [
  ['3-НДФЛ','ndfl','imgGroup',true],
  ['КОНТРОЛИРУЕМЫЕ ИНОСТРАННЫЕ КОМПАНИИ','foreign-companies','imgPhGlobeLight',false],
  ['УВЕДОМЛЕНИЕ О СЧЕТАХ В ИНОСТРАННЫХ БАНКАХ','foreign-accounts','imgPhChatCenteredText',false],
  ['ОТЧЕТ О ДВИЖЕНИИ ДЕНЕЖНЫХ СРЕДСТВ В ИНОСТРАННЫХ БАНКАХ','foreign-report','imgPhCurrencyCircleDollar',true]
];
function catalogPage(individual) {
  const page = individual?'143:246':'143:247';
  const cards = (individual?individualServices:businessServices).map(([title,route,icon,yellow]) => {
    const tag = route?'a':'button';
    const action = route?'href="#' + route + '"':'type="button" data-request="Заказать услугу" data-comment="' + escapeHtml(title) + '"';
    return '<' + tag + ' class="service-tile' + (yellow?' yellow':'') + '" ' + action + '><span>' + title + '</span><span class="tile-icon">' + asset(page,icon) + '</span></' + tag + '>';
  }).join('');
  const description = individual?'Компания «Бюро Решений» оказывает консалтинговые услуги в области налогообложения физических лиц.':'Современная коммерческая деятельность не может обойтись без участия опытного бухгалтера и налогового консультанта. Они могут помочь избежать проблем с налоговыми органами и оптимально организовать бизнес.';
  return '<section class="page-section catalog' + (individual?' individual':'') + '">' + heading(individual?'ФИЗИЧЕСКИМ ЛИЦАМ':'ЮРИДИЧЕСКИМ ЛИЦАМ','services') + '<div class="catalog-layout"><div class="service-grid">' + cards + '</div><p class="catalog-description">' + description + '</p></div></section>';
}
const reviews = [
  ['Владимир','ИП','Я очень доволен сотрудничеством с этой бухгалтерской компанией. Они всегда демонстрируют высокий уровень профессионализма и глубокие знания в области бухгалтерии и налогообложения. Благодаря их точности и вниманию к деталям, я уверен, что моя финансовая отчетность всегда в порядке и соответствует всем требованиям законодательства. Рекомендую всем, кто ищет надежного и компетентного партнера в бухгалтерских вопросах.'],
  ['Иван','ООО”Димет”','Хочу выразить благодарность команде этой бухгалтерской компании за их клиентоориентированность и оперативность. Они всегда готовы ответить на мои вопросы, объяснить сложные моменты простым языком и предложить оптимальные решения для моего бизнеса. Они очень быстро реагируют на запросы и всегда держат меня в курсе всех важных изменений. С ними я чувствую себя уверенно и спокойно за свою бухгалтерию.'],
  ['Александр','ООО”Спец”','Сотрудничество с этой бухгалтерской компанией стало одним из ключевых факторов успеха моего бизнеса. Они не просто ведут мою бухгалтерию, но и помогают мне принимать обоснованные финансовые решения, оптимизировать налогообложение и планировать развитие компании. Благодаря их профессиональным консультациям я смог значительно улучшить финансовые показатели своего бизнеса и выйти на новый уровень. Спасибо за вашу поддержку и экспертизу!']
];
function reviewsPage() {
  return '<section class="page-section reviews">' + heading('Отзывы') + '<div class="review-grid">' + reviews.map(([name,company,text]) => '<article><div class="review-person">' + asset('143:262','imgVector') + '<div>' + name + '<p>' + company + '</p></div></div><div class="review-card"><div class="stars" aria-label="5 из 5">' + asset('143:262','imgMaterialSymbolsLightStarRounded').repeat(5) + '</div><p>' + text + '</p></div></article>').join('') + '</div></section>';
}
const rates = [
  ['Комплексный сервис',2350,'ООО и ИП с сотрудниками независимо от оборотов компании и сферы бизнеса.','Передает все заботы бухучета профессионалам.','Бухгалтер всегда на связи, удаленный доступ к учетной базе, оплата за услуги по факту и объему выполненных работ.'],
  ['Отчетность',1550,'ООО и ИП, которые самостоятельно вводят все данные в облачную «1С:Бухгалтерию».','Составление и сдача отчетности. Консультации по вопросам ведения бухгалтерского и налогового учета 1С:Предприятие.','Налоги рассчитаны верно, отчетность корректно сформирована и сдана в срок. Средняя стоимость обслуживания.'],
  ['Программа и консультация',2630,'Для владельцев и руководителей, кто самостоятельно ведет учет своего бизнеса.','Вести учет и сдавать отчеты без специальных знаний с помощью понятной онлайн-бухгалтерии; контролировать показатели своего бизнеса.','Обучение работе с программой и часы гарантированных консультаций от партнеров сети 1С:БухОбслуживание.'],
  ['Расчет заработной платы',5130,'Для компаний с любыми системами оплаты труда, которые организовали ведение кадрового делопроизводства.','Расчет всех видов выплат, начислений, удержаний, предусмотренных системой оплаты труда в компании и действующим законодательством.','Передать расчет зарплатной платы партнеру 1С:БО выгоднее, чем брать в штат сотрудника на этот блок работ.'],
  ['Расчет заработной платы',6530,'Для компаний, ведущих бухучет самостоятельно, предлагается делегировать кадровый учет и расчет заработной платы.','Обслуживание сотрудников клиента от момента приема на работу, до расчета выплат по больничным листам, расчета зарплат, премий и т. д.','Все задачи решаются строго в срок, конфиденциально, с предоставлением пояснений сотрудникам по оформлению документов и суммам начисленного вознаграждения.']
];
function ratesPage() {
  return '<section class="page-section rates">' + heading('Тарифы','services') + rates.map(([title,price,...texts]) => '<article class="rate-card"><h2>«' + title + '»</h2><div class="rate-columns">' + texts.map((text,i) => '<div><h3>' + ['Кому подходит:','Какие задачи решает:','Преимущества:'][i] + '</h3><p>' + text + '</p></div>').join('') + '</div><div class="rate-bottom"><strong class="rate-price">' + price + ' ₽<small>за месяц</small></strong>' + requestButton('Консультация по подбору бухгалтера','Выбрать бухгалтера','Интересует тариф «' + title + '».') + '</div></article>').join('') + '</section>';
}
const planLabels = ['Комплексный сервис','Отчетность','Расчет заработной платы','Кадровый учет и расчёт ЗП','Программа и консультация','Нулевая отчётность'];
const taxLabels = ['УСН «Доходы»','УСН «Доходы − расходы»','ОСН','Патент + УСН «Доходы»','Патент + УСН «Доходы − расходы»','Патент + ОСН','Патент'];
function selectField(id,label,options,icon) {
  return '<div><label for="' + id + '">' + label + '</label><div class="select-wrap"><select id="' + id + '" name="' + id + '">' + options.map((text,i) => '<option value="' + i + '">' + text + '</option>').join('') + '</select>' + asset('143:261',icon) + '</div></div>';
}
function calculatorPage() {
  return '<section class="page-section calculator-page">' + heading('Расчет стоимости услуг') +
    '<div class="calculator-box"><form id="calculator-form" class="calculator-controls">' +
    selectField('plan','Тариф',planLabels,'imgMaterialSymbolsLightExpandCircleDownOutline') +
    selectField('company','Форма собственности',['Юр. лица и ИП с работниками','ИП без работников'],'imgMaterialSymbolsLightExpandCircleDownOutline1') +
    selectField('tax','Тип налогообложения',taxLabels,'imgMaterialSymbolsLightExpandCircleDownOutline2') +
    '<div><label for="operations">Количество Х.О.</label><div class="operation-field"><input id="operations" name="operations" type="number" min="0" max="1000" step="1" value="0"><label class="sr-only" for="operations-range">Количество хозяйственных операций</label><input id="operations-range" type="range" min="0" max="1000" step="1" value="0"></div></div></form>' +
    '<div class="calculator-result"><div><h2>Цена в месяц</h2><output id="cost" aria-live="polite" aria-atomic="true">5234 ₽</output><br>' + requestButton('Оставить заявку','оставить заявку') + '</div><div><h2><label for="employees">Работников</label></h2><div class="employee-result">' + asset('143:261','imgMaterialSymbolsLightCoPresent') + '<input id="employees" name="employees" type="number" min="0" max="500" step="1" value="2"></div></div></div></div><p class="calculator-note">Предварительный расчёт по демонстрационной формуле. Итоговую стоимость подтвердит специалист.</p></section>';
}
function contactsPage() {
  return '<section class="page-section contacts"><div class="contacts-top"><div>' + heading('Контакты') +
    '<article class="office-card card"><div class="office-heading"><strong>Наш офис в</strong><details class="city-selector"><summary>Москве</summary><div class="city-menu"><button type="button" data-city="Иркутск">Иркутск</button><button type="button" data-city="Красноярск">Красноярск</button><button type="button" data-city="Новосибирск">Новосибирск</button><button type="button" data-city="Екатеринбург">Екатеринбург</button><button type="button" data-city="Владивосток">Владивосток</button><button type="button" data-city="Севастополь">Севастополь</button><button type="button" data-city="Москва">Москва</button><button type="button" data-city="Все города">Все города</button></div></details></div><div class="office-grid"><div><span class="muted">Адрес</span>Летниковская ул., 11/10с22, Москва</div><div><span class="muted">Телефон</span><br><a href="tel:+79219232431">+7 921 923 24 31</a></div></div><div class="office-hours"><span class="muted">Режим работы</span><p>пн-пт<br>9:00 до 21:00</p></div></article></div>' +
    '<div class="contact-card"><h2>Оставить заявку</h2><p>Оставьте Ваши контактные данные, и<br>мы с Вами свяжемся в рабочее время</p><form id="contact-form"><label class="sr-only" for="contact-name">Имя</label><input id="contact-name" name="name" autocomplete="name" placeholder="Имя" required maxlength="80"><label class="sr-only" for="contact-phone">Телефон</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" placeholder="Телефон" required maxlength="40"><button class="button black" type="submit">Отправить заявку</button><p class="form-status" role="status"></p></form></div></div>' +
    '<a class="map-link" href="https://yandex.ru/maps/?text=Москва%20Летниковская%2011%2F10с22%20Бюро%20решений" target="_blank" rel="noopener" aria-label="Открыть адрес Бюро решений на карте">' + asset('143:251','img190320251200','Карта: офис Бюро решений, Москва, Летниковская улица') + '<span class="map-label" aria-hidden="true">Бюро Решений ★ 5,0<br>до 21:00</span></a></section>';
}
function ndflPage() {
  const texts = ['Возврат налога на доходы физлиц при приобретении квартиры, продаже автомашины и прочего дорогостоящего имущества; строительстве дома; оплате за лечение или обучение;','Заполнение налоговой декларации согласно форме 3-НДФЛ;','Получение профессиональных, имущественных и социальных вычетов;','Подтверждение льгот по налогу на имущество, транспорт, НДФЛ.'];
  return '<section class="page-section detail-page ndfl">' + asset('143:142','imgRectangle5733','','design-art') + heading('3-НДФЛ') + '<p class="detail-lead">Компания «Бюро решений» оказывает консалтинговые услуги в области налогообложения физических лиц. <strong>Мы поможем вам разрешить следующие вопросы:</strong></p><div class="ndfl-grid">' + texts.map(text => '<article class="card yellow">' + text + '</article>').join('') + '</div>' + requestButton('Заказать услугу','заказать услуги','3-НДФЛ') + '</section>';
}
function debtPage() {
  const steps = [['imgGroup2','Подготовка и направление жалобы в вышестоящий налоговый орган (процедура досудебного урегулирования является обязательной), получение решения УФНС по субъекту РФ по жалобе;'],['imgGroup1','Подготовка и направление искового заявления в арбитражный суд, получение решения суда;'],['imgGroup','Контроль действий инспекции по своевременному исполнению решения суда.']];
  return '<section class="page-section detail-page debt">' + heading('СПИСАНИЕ ЗАДОЛЖЕННОСТИ ПО НАЛОГАМ') + '<div class="detail-columns"><p class="detail-copy">Специалистами «Бюро решений» отработана система действий по списанию налоговых долгов, срок взыскания которых истек. Мы имеем успешный опыт проведения всей процедуры списания (например, решения Арбитражного суда г. Москвы по делам № А40-155492/2020, № А40-214699/2016, № А40-164676/2015), которая занимает от 3 до 6 месяцев:</p><ul class="detail-list">' + steps.map(([icon,text]) => '<li>' + asset('128:467',icon) + '<p>' + text + '</p></li>').join('') + '</ul></div>' + requestButton('Заказать услугу','заказать услуги','Списание задолженности по налогам') + '</section>';
}
function staffPage() {
  const tasks = ['Подготовка документации для оформления приема на работу нового сотрудника;','Заключение трудовых договоров с сотрудниками; оформление личных карточек (форма Т-2);','Ведение трудовых книжек;','Подсчет общего и непрерывного трудового стажа;','Оформление переводов, изменений заработной платы, изменений к трудовым договорам;','Оформление больничных листов; ведение учета отпусков;','Поддержание штатного расписания;'];
  return '<section class="page-section detail-page staff">' + asset('128:469','imgRectangle5732','','design-art') + heading('КАДРОВЫЙ УЧЁТ НА ПРЕДПРИЯТИИ') + '<div class="detail-columns"><div class="staff-copy"><p class="detail-copy">Наша компания предлагает Вам аутсорсинг кадрового администрирования. В рамках этой деятельности ведение и оформление кадровой документации Вашей фирмы будет осуществляться нашими специалистами, которые будут осуществлять функции Вашего отдела кадров.</p>' + requestButton('Заказать услугу','заказать услуги','Кадровый учёт на предприятии') + '</div><div class="staff-list">' + tasks.map(text => '<p>' + text + '</p>').join('') + '</div></div></section>';
}
function optimizationPage() {
  const cards = [['imgGroup1','Аудит имеющихся налоговых рисков, с оценкой вероятности их наступления и размера предполагаемых доначислений налогов;'],['imgGroup','устное и письменное консультирование'],['imgGroup3','Налоговое структурирование – разработка письменного юридического заключения, включающего в себя оценку используемых Доверителем способов налоговой оптимизации, существующих налоговых рисков, путей их нивелирования, возможности осуществления иных способов оптимизации, с экономическими расчётами эффективности и оценкой рисков по вероятностному и суммовому критериям;'],['imgGroup2','Аудит и оценка структурирования и способов налоговой оптимизации, разработанных штатными сотрудниками Доверителя или привлеченными специалистами, для получения Доверителем независимого экспертного мнения (второго мнения), для принятия правильных решений.']];
  return '<section class="page-section detail-page optimization">' + heading('НАЛОГОВАЯ ОПТИМИЗАЦИЯ') + '<div class="optimization-grid">' + cards.map(([icon,text]) => '<article class="card yellow">' + asset('128:470',icon) + '<p>' + text + '</p></article>').join('') + '</div>' + requestButton('Заказать услугу','заказать услуги','Налоговая оптимизация') + '</section>';
}
function registrationPage() {
  const docs = [
    [['imgGrou','Заявление о государственной регистрации физического лица в качестве индивидуального предпринимателя (форма № Р21001).',false],['imgGroup','Копия паспорта гражданина РФ',true],['imgGroup1','Уведомление о переходе на упрощенную систему налогообложения (УСН) (форма № 26.2-1) (если вы планируете применять УСН).',true],['imgGroup2','Квитанция об уплате государственной пошлины',false]],
    [['imgGroup3','Устав ООО. Это основной учредительный документ, определяющий деятельность общества.',false],['imgGroup4','Заявление о государственной регистрации юридического лица при создании (форма Р11001)',true],['imgGroup5','Решение единственного учредителя (если учредитель один) или Протокол общего собрания учредителей (если учредителей несколько) о создании ООО',false],['imgGroup6','Квитанция об оплате государственной пошлины.',true]]
  ];
  const steps = [['Оставьте заявку и получите консультацию','Порекомендуем форму ведения бизнеса, ОКВЭД, систему налогообложения исходя из ваших планов, расскажем о правильном порядке регистрации.'],['Отправьте документы, а мы все оформим','Менеджер назовёт необходимые документы, после их получения корректно подготовит всё для регистрации.'],['Подадим документы на регистрацию','Направим готовые документы в ФНС. Подтверждение регистрации придёт на вашу почту в течение 3 рабочих дней.']];
  return '<section class="page-section registration">' + heading('Что нужно для регистрации бизнеса') + '<div class="registration-columns">' + docs.map((cards,i) => '<div><h2>Для регистрации ' + (i?'ООО':'ИП') + '</h2><div class="document-grid">' + cards.map(([icon,text,yellow]) => '<article class="card' + (yellow?' yellow':'') + '">' + asset('128:466',icon) + '<p>' + text + '</p></article>').join('') + '</div></div>').join('') + '</div><div class="registration-steps"><h2>Откройте свое дело в 3 простых шага с 1С:БухОбслуживание. Бюро решений</h2><div class="step-grid">' + steps.map(([title,text],i) => '<article class="step-card card"><strong>' + (i+1) + '.</strong><h3>' + title + '</h3><p>' + text + '</p></article>').join('') + '</div>' + requestButton('Открыть своё дело','открыть своё дело') + '</div></section>';
}
const pages = {
  home:{title:'Главная',render:homePage},
  approach:{title:'Как мы работаем',render:approachPage},
  services:{title:'Услуги',render:servicesPage,dark:true},
  business:{title:'Юридическим лицам',render:() => catalogPage(false),dark:true},
  individual:{title:'Физическим лицам',render:() => catalogPage(true),dark:true},
  rates:{title:'Тарифы',render:ratesPage,dark:true},
  calculator:{title:'Калькулятор',render:calculatorPage},
  reviews:{title:'Отзывы',render:reviewsPage},
  contacts:{title:'Контакты',render:contactsPage},
  ndfl:{title:'3-НДФЛ',render:ndflPage},
  debt:{title:'Списание задолженности по налогам',render:debtPage},
  staff:{title:'Кадровый учёт',render:staffPage},
  optimization:{title:'Налоговая оптимизация',render:optimizationPage},
  registration:{title:'Регистрация ООО и ИП',render:registrationPage},
  inspections:{title:'Сопровождение налоговых проверок',render:inspectionsPage},
  recovery:{title:'Восстановление бухгалтерского учёта',render:recoveryPage},
  audit:{title:'Внутренний налоговый контроль',render:auditPage},
  sbis:{title:'СБИС',render:sbisPage},
  'foreign-accounts':{title:'Счета в иностранных банках',render:foreignAccountsPage},
  'foreign-companies':{title:'Контролируемые иностранные компании',render:foreignCompaniesPage},
  'foreign-report':{title:'Движение денежных средств в иностранных банках',render:foreignReportPage}
};
const serviceRoutes = ['business','individual','rates','ndfl','debt','staff','optimization','registration','inspections','recovery','audit','sbis','foreign-accounts','foreign-companies','foreign-report'];
let currentRoute = '';
function renderPage(moveFocus = false) {
  if (location.hash === '#content') { content.focus(); return; }
  const route = location.hash.slice(1) || 'home';
  const resolved = Object.hasOwn(pages,route) ? route : 'home';
  const page = pages[resolved];
  if (resolved === currentRoute) return;
  currentRoute = resolved;
  document.body.classList.toggle('dark',Boolean(page.dark));
  document.title = page.title + ' — Бюро решений';
  content.innerHTML = page.render();
  content.dataset.page = resolved;
  const active = serviceRoutes.includes(resolved)?'services':resolved;
  document.querySelectorAll('.header nav a').forEach(link => {
    if (link.hash === '#' + active) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo(0,0);
  if (moveFocus) content.focus({preventScroll:true});
  if (resolved === 'calculator') setupCalculator();
  document.querySelector('#contact-form')?.addEventListener('submit', prepareEmail);
}
function openRequest(title,comment) {
  dialog.dataset.kind = title === 'Заказать услугу' ? 'service' : title === 'Оставить заявку' ? 'request' : title === 'Открыть своё дело' ? 'business' : 'consultation';
  dialog.querySelector('[type="submit"]').textContent = title === 'Заказать услугу' ? 'заказать услуги' : 'отправить';
  document.querySelector('#request-title').textContent = title;
  requestForm.reset();
  document.querySelector('#request-comment').value = comment || '';
  requestForm.querySelector('.form-status').replaceChildren();
  dialog.showModal();
}
document.addEventListener('click', event => {
  const city = event.target.closest('[data-city]');
  if (city) {
    city.closest('details').open = false;
    openRequest('Связаться с нами','Уточнить контакты: ' + city.dataset.city);
    return;
  }
  const button = event.target.closest('[data-request]');
  if (!button) return;
  let comment = button.dataset.comment || '';
  if (currentRoute === 'calculator') comment = calculatorSummary();
  openRequest(button.dataset.request,comment);
});
document.querySelector('.dialog-close').addEventListener('click',() => dialog.close());
dialog.addEventListener('click',event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
function prepareEmail(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = form === requestForm?document.querySelector('#request-title').textContent:'Заявка с сайта Бюро решений';
  const body = 'Имя: ' + data.get('name') + '\nТелефон: ' + data.get('phone') + '\n\n' + (data.get('comment') || '');
  const link = document.createElement('a');
  link.href = 'mailto:buroresh01@mail.ru?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  link.textContent = 'Открыть письмо';
  const status = form.querySelector('.form-status');
  status.replaceChildren('Письмо подготовлено. ',link,'. Отправьте его в почтовом приложении. Заявка ещё не отправлена.');
}
requestForm.addEventListener('submit',prepareEmail);
function boundedInteger(value,min,max) {
  const number = Number(value);
  return Number.isFinite(number)?Math.min(max,Math.max(min,Math.trunc(number))):min;
}
// The design supplies a sample total, but no business pricing specification.
// Keep this explicitly demonstrational until the owner supplies approved rules.
function calculateCost(plan,company,tax,operations,employees) {
  const bases = [5234,1550,5130,6530,2630,1000];
  const taxExtra = [0,800,2000,600,1400,2600,400];
  const base = bases[boundedInteger(plan,0,5)];
  return Math.max(0,base + taxExtra[boundedInteger(tax,0,6)] + boundedInteger(operations,0,1000)*30 + Math.max(0,boundedInteger(employees,0,500)-2)*500 - (Number(company)===1?700:0));
}
function setupCalculator() {
  const form = document.querySelector('#calculator-form');
  const operations = document.querySelector('#operations');
  const range = document.querySelector('#operations-range');
  const employees = document.querySelector('#employees');
  const update = () => {
    const total = calculateCost(form.elements.plan.value,form.elements.company.value,form.elements.tax.value,operations.value,employees.value);
    document.querySelector('#cost').textContent = String(total) + ' ₽';
  };
  form.addEventListener('submit',event => event.preventDefault());
  form.addEventListener('input',event => {
    if (event.target === range) operations.value = range.value;
    if (event.target === operations) range.value = boundedInteger(operations.value,0,1000);
    update();
  });
  form.addEventListener('change',update);
  employees.addEventListener('input',update);
  for (const input of [operations,employees]) input.addEventListener('change',() => {
    input.value = boundedInteger(input.value,Number(input.min),Number(input.max));
    if (input === operations) range.value = input.value;
    update();
  });
  update();
}
function calculatorSummary() {
  const form = document.querySelector('#calculator-form');
  return 'Интересует расчёт: ' + planLabels[form.elements.plan.value] + '; ' + form.elements.company.selectedOptions[0].textContent + '; ' + taxLabels[form.elements.tax.value] + '; хозяйственных операций: ' + boundedInteger(form.elements.operations.value,0,1000) + '; работников: ' + boundedInteger(document.querySelector('#employees').value,0,500) + '. Предварительный демонстрационный расчёт: ' + document.querySelector('#cost').textContent + ' в месяц.';
}
window.addEventListener('hashchange',() => renderPage(true));
renderPage();
