export enum Time {
  FOUR_OCLOCK = 14400, //14 400
  FOUR_AND_HALF_HOURS = 16200,
}

export enum URLS {
  USERS = 'https://rslang-v1.herokuapp.com/users',
  URL = 'https://rslang-v1.herokuapp.com',
  SIGN_IN = 'https://rslang-v1.herokuapp.com/signin',
  GET_WORDS = 'https://rslang-v1.herokuapp.com/words',
}

export enum Constants {
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
  MAX_BOOK_PAGE = 29,
  MIN_PASS_LENGTH = 8,
  MAX_PASS_LENGTH = 12,
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

export enum RequestResponseCode {
  USER_WORD_HAS_BEEN_DELETED = 204,
  NOT_FOUND = 404,
  ACCESS_TOKEN_IS_MISSING_OR_INVALID = 401,
  DATA_ALREDY_EXISTS = 417,
}
