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

function smoosh(input) {
  if (!Array.isArray(input)) { return 'argument should be an array' }
  const resArray = [];
  (function noMutation(argument) {
    argument.forEach((item) => {
      if (Array.isArray(item)) { noMutation(item) }
      else { resArray.push(item) }
    })
  }(input));
  return resArray
}

function squeeze(input) {
  if (!Array.isArray(input)) { return 'argument should be an array' }
  const length = input.length;
  (function mutation(argument) {
    argument.forEach((item) => {
      if (Array.isArray(item)) { mutation(item) }
      else { input.push(item) }
    })
  }(input));
  input.splice(0, length);//orginal array
  return input
}

export { smoosh, squeeze };
