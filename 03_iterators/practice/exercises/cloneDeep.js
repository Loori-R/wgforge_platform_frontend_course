/**
 * Реализовать функцию cloneDeep которая копирует объекты по значению с любой глубиной вложенности
 */
export default function cloneDeep(sourceObject) {
  // ¯\_(ツ)_/¯
  //sourceObject is array or object?
  const res = {}

  Object.keys(sourceObject).forEach(key => {
    if (typeof sourceObject[key] === 'object') { res[key] = cloneDeep(sourceObject[key]) }
    else { res[key] = sourceObject[key] }
  })

  return res
}
