export enum Text {
  HeaderSprintPopUp = 'Спринт',
  HeaderAudioChallengePopUp = 'Аудио вызов',
  SubtitleSprintPopUp = 'Выберите соответсвует ли перевод предложенному слову',
  SubtitleAudioChallengePopUp = '«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух.',
  NextButton = 'Далее',
  ShowCurrectAnswerButton = 'Не знаю',
  IconAttributeAudioChallenge = 'dynamic',
  StartGameButton = 'Начать',
  RightAnswerSprintButton = 'Верно',
  WrongAnswerSprintButton = 'Не верно',
  menuOptionStartPage = ' Главная',
  menuOptionLoginPage = ' Авторизация',
  menuOptionElectronicBook = ' Учебник',
  menuOptionMiniGames = ' Мини-игры',
  menuOptionStatPage = ' Статистика',
  menuOptionAbout = ' О нас',
  headerAppName = 'RS•',
  headerAppNameSpan = 'Lang',
  headerAppNameMotto = 'изучай английский играючи',
  loginButtonValue = 'Войти',
  footerRsSchool = 'Javascript/Front-end 2021Q3',
  footerGithubLinksItem1 = 'SergeyKozlovskiy',
  footerGithubLinksItem2 = 'VoitihovichP',
  footerGithubLinksItem3 = 'Stellarator85',
  footerLogo = 'RS•Lang',
  footerYearMark = '© 2022г.',
  exit = 'Выйти',
  mainStartButtonValue = 'Старт',
  authorizationRegBtn = 'Регестрация',
  authorizationBackBtn = 'Назад',
  authorizationRegText = 'Ещё нет аккаунта? Тогда',
  authorizationRegLink = 'зарегистрируйтесь!',
  headerUserExit = 'выйти',
  noneString = 'none',
  localStorageParam = 'UserInfo',
  authorizationPassword = 'Введите пароль',
  authorizationEmail = 'Введите вашу почту',
  authorizationName = 'Введите ваше имя',
  authorizationEmailSmal = 'Мы сохраним вашу почту в безопасности!',
  mainGreetingPartOne = 'Добро пожаловать в',
  mainGreetingPartTwo = 'Lang',
  mainRsSpan = 'RS•',
  mainPromoPartOne = 'Уровень твоего',
  mainPromoPartTwo = 'останавливается на',
  mainPromoPartThree = '? Не переживай, с нашим приложением ты можешь изучать язык как в привычном формате словаря, так и играя. Скорее жми кнопку "Начать"!',
  mainPromoSpanOne = 'English',
  mainPromoSpanTwo = 'London is the capital of Great Britan',
  bookDescrPartOne = 'Электронный учебник предназначен для тех, кому удобнее изучать слова стандартными методами. Тут ты можешь посмотреть на написание слова, послушать как звучит его произношение и увидеть примеры употребления этого слова в предложении. Слово показалось тебе сложным? Не беда, пометь его как',
  bookDescrPartTwo = 'и вернись к нему позже! Слова идут по возрастанию сложности. Выбирай и учи, Удачи!',
  bookDescrSpan = 'СЛОЖНОЕ СЛОВО',
  mainStatisticsPageTitle = 'Ваша статистика',
  mainStatisticsPageTabOneName ='general',
  mainStatisticsPageTabOneTitle = "Общая",
  mainStatisticsPageTabTwoName = 'sprint-game',
  mainStatisticsPageTabTwoTitle = 'Спринт',
  mainStatisticsPageTabThreeName = 'audiochallenge-game',
  mainStatisticsPageTabThreeTitle = 'Аудио-вызов',
  mainStatisticsPageTableHeadCellOneContent = '#',
  mainStatisticsPageTableHeadCellTwoContent = 'Пользователь',
  mainStatisticsPageTableHeadCellThreeContent = 'Cыгранных игр',
  mainStatisticsPageTableHeadCellFourContent = 'Пройденных слов',
  mainStatisticsPageTableHeadCellFiveContent = 'Правильных ответов',
  mainStatisticsPageTableHeadCellSixContent = 'Рекорд правильных ответов подряд',
  mainStatisticsPageTableRowOneCellOneContent = '1',
  mainStatisticsPageTableRowOneCellTwoContent = 'Имярек',
  mainStatisticsPageTableRowOneCellThreeContent = '0',
  mainStatisticsPageTableRowOneCellFourContent = '0',
  mainStatisticsPageTableRowOneCellFiveContent = '0%',
  mainStatisticsPageTableRowOneCellSixContent = '0',
  aboutPageTitle = 'Приложение RS•Lang для Вас разработали:',
  sergeyFullName = 'Сергей Козловский',
  pavelFullName = 'Павел Войтехович',
  timurFullName = 'Тимур Щербина',
  sergeyTasksDescription = 'Ежедневная связь с командой, постановка/контроль тасков, настройка роутинга и получения данных с бекенда через Redux, создание игр "Спринт" и "Аудио-вызов".',
  pavelTasksDescription = 'Настройка получения, отправки данных на сервер через Redux, реализация регистрации и авторизации пользователя, создание учебника и списка слов.',
  timurTasksDescription = 'Верстка, графическое оформление, создание бургер-меню.',
  closeBookBtn = 'Закрыть учебник',
  nextBookPage = 'Вперёд',
  bookPageCounterText = 'Page',
  bookPageError = 'Error: Words not found',
  wordCardHardBtn = 'В сложные слова',
  wordCardLernBtn  = 'В изученые слова',
  wordCardDeleteBtn = 'Удалить',
  dictionaryWarning = 'Для использования словаря нужно войти или зарегистрироваться',
  dictionaryBtnTextHard = 'сложные слова',
  dictionaryBtnTextLern = 'изученые слова',
  dictionaryHomeBtn = 'Закрыть словарь'
}

export enum API {
  URL = 'http://localhost:5000/',
  Words = 'words',
  Users = 'users',
  Tokens = 'tokens',
  Statistics = 'statistics',
  AggregatedWords = 'aggregatedWords'
}

export enum MagicNumbers {
  MAX_NUM_OF_QUESTIONS = 20,
  SERIES_OF_CORRECT_ANSWERS_1 = 3,
  SERIES_OF_CORRECT_ANSWERS_2 = 6,
  BASIC_SCORE = 10, 
  BONUS_SCORE = 20, 
  SUPER_BONUS_SCORE = 40,
  PERCENT = 100,
  NUMBER_OF_RESPONSES = 5, 
  MIN_QUESTION_NUMBER = 0, 
  MAX_QUESTION_NUMBER = 19, 
  MIN_PAGE = 0,
  MAX_PAGE = 19,
  ZER0_VALUE = 0,
  STEP = 1,
  MAX_BOOK_PAGE = 29
}

export enum Actions {
  CREATE_USER = 'CREATE_USER',
  LOGOUT_USER = 'LOGOUT_USER'
}


export enum Classes {
  header = 'header',
  menuContainer = 'menu-container',
  menuButton = 'menu-button',
  menuList = 'menu-list',
  menuListCloseButton = 'menu-list-close-button',
  menuListItem = 'menu-list_item',
  menuListItemOption = 'menu-list_item__option',
  headerAppName = 'header_app-name',
  headerAppNameSpan = 'header_app-name__span',
  headerAppNameMotto = 'header_app-name__motto',
  loginButton = 'log-in-button',
  main = 'main',
  mainStartPage = 'main main_start-page',
  mainStartPageContainer = 'main_start-page_container',
  mainStartButton = 'main-start-btn',
  mainGreetingSpanOne = 'main-greeting-span-one',
  mainGreetingSpanTwo = 'main-greeting-span-two',
  footer = 'footer',
  footerRsSchool = 'footer_rs-school',
  footerGithubLinks = 'footer_github-links',
  footerGithubLinksItem = 'footer_github-links__item',
  footerLogo = 'footer_logo',
  footerLogoSpan = 'footer_logo__span',
  headerUserPanel = 'user-panel',
  headerUserName = 'user-name',
  nameInput = 'name-input',
  emailInput = 'email-input',
  passInput = 'password-input',
  formBack = 'back',
  formReg = 'registr',
  regPopup = 'registration-popup',
  logPopup = 'login-popup',
  activePopup = 'popup-active',
  mainStatisticsPage = 'main_statistics-page',
  mainStatisticsPageTitle = 'statistics-page_title',
  mainStatisticsPageTabs = 'statistics-page_tabs',
  mainAboutPage = 'main_about-page',
  aboutPageContainer = 'about-page-container',
  aboutPageDevCard = 'about-page-container_dev-card',
  aboutPageDevCardImage = 'about-page-container_dev-card__image',
  aboutPageDevCardTitle = 'about-page-container_dev-card__title',
  aboutPageDevCardPosition = 'about-page-container_dev-card__position',
  aboutPageDevCardGitHub = 'about-page-container_dev-card__github',
  bookLevelDefault = 'level-button',
  bookLevelShort = 'level-short',
  bookLevelTitle = 'level-title',
  book = 'electronic-book',
  bookLevels = 'electronic-levels',
  bookText = 'electronic-descr',
  bookImage = 'electronic-img',
  bookDescr = 'elctronic-text'
}

export enum BookLevelColor {
one = 'level_color-one',
two = 'level_color-two',
three = 'level_color-three',
four = 'level_color-four',
five = 'level_color-five',
six = 'level_color-six'
}

export enum EnglishLevels {
A1 = 'A1',
A2 = 'A2',
B1 = 'B1',
B2 = 'B2',
C1 = 'C1',
C2 = 'C2',
ELEMENTARY = 'Elementary',
PRE_INTERMEDIATE = 'Pre-Intermediate',
INTERMEDIATE = 'Intermediate',
UPPER_INTERMEDIATE = 'Upper-Intermediate',
ADVANCED = 'Advanced',
PROFICIENCY = 'Proficiency',
}

export enum RequestStatistic {
sprint = 'sprint',
audioChalenge = 'audioChalenge'
}

export enum WordsDifficult {
  hard = 'hard',
  lern = 'lern'
}