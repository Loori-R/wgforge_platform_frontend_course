/**
 * Реализовать функцию cloneDeep которая копирует объекты по значению с любой глубиной вложенности
 */
export default function cloneDeep(sourceObject) {
  // ¯\_(ツ)_/¯
  //sourceObject is array or object?
  const res = (Array.isArray(sourceObject)) ? [] : {}
  for (let i in sourceObject) {
    const item = sourceObject[i]
    if (Array.isArray(item) || typeof item === 'object') {
      res[i] = cloneDeep(item)
    }
    else {
      res[i] = item
    }
  }
  return res
}
