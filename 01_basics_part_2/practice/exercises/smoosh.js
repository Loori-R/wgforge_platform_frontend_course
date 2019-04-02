/**
 * Задача 1: написать функцию smoosh, которая принимает массив, "выравнивает" вложенные массивы
 * в одноуровневый массив и возвращает новый плоский массив.
 * Например:
 * smoosh([1, 2, [3, 4], 5])
 * > [1, 2, 3, 4, 5]
 * Входной массив может содержать массивы любого уровня вложенности.
 * Например: [[1, 2], [3, [4, [5]]]]
 *
 * Задача 2: написать функцию squeeze (по аналогии со smoosh) таким образом,
 * чтобы она модифицировала исходный массив, а не возвращала новый.
 *
 * Задача 3*: для функций smoosh и squeeze добавить валидацию входного параметра.
 * В случае, если на вход передан не массив функция должна выбросить исключение
 * с сообщением 'argument should be an array'.
 */

function smoosh(array) {
  const result = []
  if (!Array.isArray(array)) { return 'argument should be an array' }
  (function monster(arg) {
    arg.forEach((item) => {
      if (Array.isArray(item)) { monster(item) }
      else { result.push(item) }
    })
  })(array)
  return result
}

function squeeze(array) {
  const length = array.length
  if (!Array.isArray(array)) { return 'argument should be an array' }
  (function monster(arg) {
    arg.forEach((item) => {
      if (Array.isArray(item)) { monster(item) }
      else { array.push(item) }
    })
  })(array)
  array.splice(0, length)
  return array
}

export { smoosh, squeeze };
