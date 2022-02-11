export enum Text {
  DropdownText = 'Уровень',
  HeaderSprintPopUp = 'Спринт',
  SubtitleSprintPopUp = 'Выберите соответсвует ли перевод предложенному слову',
  StartSprintButton = 'Начать',
  RightAnswerSprintButton = 'Верно',
  WrongAnswerSprintButton = 'Не верно',
  menuOptionStartPage = 'Главная страница',
  menuOptionLoginPage = 'Авторизация',
  menuOptionWordList = 'Список слов',
  menuOptionMiniGames = 'Мини-игры',
  menuOptionStatPage = 'Статистика',
  menuOptionAbout = 'О нас',
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
  mainRsSpan = 'RS',
  mainPromoPartOne = 'Уровень твоего',
  mainPromoPartTwo = 'останавливается на',
  mainPromoPartThree = '? Не переживай, с нашим приложением ты можешь изучать язык как в привычном формате словаря, так и играя. Скорее жми кнопку "Начать"!',
  mainPromoSpanOne = 'English',
  mainPromoSpanTwo = 'London is the capital of Great Britan',

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
  pavelTasksDescription = 'Настройка получения/отправки данных на сервер через Redux, реализация регистрации и авторизации пользователя, создание учебника и списка слов.',
  timurTasksDescription = 'Верстка, графическое оформление, создание бургер-меню.',
}

export enum API {
  URL = 'http://localhost:5000/',
  Words = 'words',
  Users = 'users',
}

export enum MagicNumbers {
  MAX_NUM_OF_QUESTIONS = 20,
  SERIES_OF_CORRECT_ANSWERS_1 = 3,
  SERIES_OF_CORRECT_ANSWERS_2 = 6,
  BASIC_SCORE = 10, 
  BONUS_SCORE = 20, 
  SUPER_BONUS_SCORE = 40
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

   mainAboutPage = 'main_about-page',
  
  mainStatisticsPageTitle = 'main-statistics-page_title',
  mainStatisticsPageTabs = 'main-statistics-page_tabs',

  aboutPageContainer = 'about-page-container',
  aboutPageDevCard = 'about-page-container_dev-card',
  aboutPageDevCardImage = 'about-page-container_dev-card__image',
  aboutPageDevCardTitle = 'about-page-container_dev-card__title',
  aboutPageDevCardPosition = 'about-page-container_dev-card__position',
  aboutPageDevCardGitHub = 'about-page-container_dev-card__github',
}