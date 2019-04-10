/**
 * Задание: написать построитель SQL-запросов.
 * Данный модуль должен экспортировать функцию `query`, вызов которой должен возвращать новый экземпляр объекта query.
 * Например:
 * const q1 = query();
 * const q2 = query();
 * console.log(Object.is(q1, q2)) // false
 *
 * В качестве аргументов query может передаваться имя таблицы.
 * Тогда при дальнейшем составлении запроса вызовы метода from(tableName) игнорируются.
 *
 * У возвращаемого объекта должны быть следующие методы:
 *
 * select(arg1, arg2 ... argN) - может принимать список полей для выборки.
 * Аргументы должны иметь тип String. Если ни одного аргумента не передано должны быть получены все поля таблицы
 * Например:
 * q.select().from('users')
 * > SELECT * FROM users
 * q.select('id', 'name').from('users')
 * > SELECT id, name FROM users
 *
 * from(tableName: String) - указывает из какой таблицы получать данные.
 *
 * where(fieldName: String) - служит для задания условия фильтрации.
 * При множественном вызове метода where в одном запросе условия должны объединяться через логическое "И".
 * Метод where должен возвращать объект имеющий следующие методы:
 * orWhere(fieldName: String) - делает то же самое что where, но объединяет через "ИЛИ".
 * Метод where должен возвращать объект имеющий следующие методы:
 *
 * equals(value: any) - условие равенства
 * Например: SELECT * FROM student WHERE age = 42;
 *
 * in(values: array) - позволяет определить, совпадает ли значение объекта со значением в списке
 * Например: SELECT * FROM offices WHERE city IN ('Minsk', 'Nicosia', 'Seattle');
 *
 * gt(value: any) - условие больше '>'
 * gte(value: any) - условие больше или равно '>='
 * lt(value: any) -  условие меньше '<'
 * lte(value: any) -  условие меньше или равно '<='
 * between(from: any, to: any) -  условие нахождения значения поля в заданном диапазоне:
 * SELECT * FROM products WHERE price BETWEEN 4.95 AND 9.95;
 *
 * isNull() - условие отсутствия значения у поля
 *
 * not() - служит для задания противоположного.
 * После вызова not можно вызывать только те же методы, которые использует where для сравнения.
 *
 * q.select().from('users').where('name').not().equals('Vasya')
 *
 * Вызов not не может быть вызван более одного раза подряд:
 * q.select().from('users').where('name').not().not().equals('Vasya')
 *
 * Внимание: методы сравнения не могут быть вызваны до вызова метода where()!
 *
 * Получения строчного представления сконструированного SQL-запроса должно происходить при
 * вызове метода toString() у объекта query.
 * В конце строки SQL-запроса должен быть символ ';'
 *
 * Дополнительные задания:
 *
 * 1. Добавить в сигнатуру функии query второй опциональный аргумент options типа Object.
 * Если в options есть поле escapeNames со значением true, названия полей и таблиц должны быть обёрнуты в двойные кавычки:
 *
 * const q = query({escapeNames: true});
 * q.select('name').from('people').toString()
 * > SELECT "name" FROM "people";

 * const q = query('books', {escapeNames: true});
 * q.select('title').toString()
 * > SELECT "title" FROM "books";
 *
 * 2. Добавить возможность передавать в условия методов сравнения в качестве значения экземпляр запроса query.
 *
 * const q1 = query('users');
 * const admins = q1.select('id').where('role').equals('admin');
 * const q2 = query('posts');
 * const posts = q2.select().where('author_id').in(admins);
 * posts.toString();
 * > SELECT * FROM posts WHERE author_id IN (SELECT id FROM users WHERE role = 'admin');
 *
 * 3. Реализовать функциональность создания INSERT и DELETE запросов. Написать для них тесты.
 */

export default function query(tableName) {
  // ¯\_(ツ)_/¯
  const result = {
    flags: {
      select: false,
      from: true,
      where: false,
      orWhere: false,
      not: false
    }
  }
  const WHERE_METHODS = {
    equals: (value) => {
      if (result.flags.not) {
        result.query = result.query.replace(/WHERE/g, 'WHERE NOT')
      }
      if (typeof value === 'number') { result.query += ` = ${value}` }
      else { result.query += ` = '${value}'` }
      return WHERE_METHODS
    },
    in: (...values) => {
      const valuseWithSpace = values.toString().split(',').join(', ')
      result.query += (result.flags.not) ? ` NOT IN(${valuseWithSpace})` : ` IN (${valuseWithSpace})`
      return WHERE_METHODS
    },
    gt: (value) => {
      if (typeof value === 'number') { result.query += ` = ${value}` }
      else { result.query += ` = '${value}'` }
      return WHERE_METHODS
    },
    gte: (value) => {
      if (typeof value === 'number') { result.query += ` = ${value}` }
      else { result.query += ` = '${value}'` }
      return WHERE_METHODS
    },
    lt: (value) => {
      if (typeof value === 'number') { result.query += ` = ${value}` }
      else { result.query += ` = '${value}'` }
      return WHERE_METHODS
    },
    lte: (value) => {
      if (typeof value === 'number') { result.query += ` = ${value}` }
      else { result.query += ` = '${value}'` }
      return WHERE_METHODS
    },
    between: (from, to) => {
      result.query += ` BETWEEN ${from} AND ${to}`
      return WHERE_METHODS
    },
    isNull: () => {
      result.query += (result.flags.not) ? ` IS NOT NULL` : ` IS NULL`
      return WHERE_METHODS
    },
    not: () => {
      if (!result.flags.where) { return new Error(`not() can't be called before where`) }
      else if (result.flags.not) { return new Error(`not() can't be called multiple times in a row`) }
      else {
        result.flags.not = true
        return WHERE_METHODS
      }
    },
    where: (fieldName) => {
      if (typeof fieldName !== 'string') { return new Error('argument is not a string') }
      result.query += (result.flags.where) ? ` AND ${fieldName}` : ` WHERE ${fieldName}`
      result.flags.where = true
      return WHERE_METHODS
    },
    orWhere: (fieldName) => {
      if (typeof fieldName !== 'string') { return new Error('argument is not a string') }
      result.query += (result.flags.where) ? ` OR ${fieldName}` : ` WHERE ${fieldName}`
      result.flags.where = true
      return WHERE_METHODS
    },
    toString: () => {
      if (result.query.indexOf(';') > 0) {
        result.query = result.query.replace(/;/g, '')
        result.query += ';'
      }
      else { result.query += `;` }
      return result.query
    }
  }
  const QUERY_METHODS = {
    select: (...args) => {
      result.flags.where = false
      result.query = (args.length === 0) ? `SELECT *` : `SELECT ${args}`
      result.flags.select = true
      return QUERY_METHODS
    },
    from: (tableName) => {
      if (typeof tableName !== 'string') { return new Error('argument is not a string') }
      if (!result.flags.from) {
        result.query += ` FROM ${tableName}`
        result.flags.from = true
      }
      return QUERY_METHODS
    },
    not: WHERE_METHODS.not,
    where: WHERE_METHODS.where,
    orWhere: WHERE_METHODS.orWhere,
    toString: WHERE_METHODS.toString
  }
  if (!tableName) { result.flags.from = false }//check arg for query()
  return QUERY_METHODS
}
