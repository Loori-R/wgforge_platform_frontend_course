/**
 * Задание: написать функцию sleep, которая приостанавливает работу потока на
 * время переданное в аргументе. Время задаётся в секундах с точностью до 1 сек.
 * Если передан не валидный аргумент функция должна сразу завершить своё
 * выполнение и вернуть undefined.
 */

export default function sleep(seconds) {
  if (!Number.isInteger(seconds)) { return }
  const start = Date.now()
  while (Date.now() < start + seconds * 1000) {
    // wait
  }
}
