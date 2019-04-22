/**
 * Реализовать метод deepMerge для рекурсивного слияния собственных и унаследованных перечислимых
 * строковых свойств исходного объекта в целевой объект.
 * Свойства исходного объекта, которые разрешаются в undefined, пропускаются,
 * если свойство существует в целевом объекте.
 * Свойства Array и plain Object типа рекурсивно объединяются, свойства других типов из исходного объекта
 * переписывают свойства в объекте назначения либо добавляются если их нету в объекте назначения
 *
 * Пример:
 *
 * const destinationObject = {
 *   students: [{ name: 'Unit 1' }, { name: 'Unit 2'}],
 *   label: 'backend',
 *   count: 1
 * };
 *
 * const sourceObject = {
 *  students: [{ surname: 'Forge 1' }, { surname: 'Forge 2'}],
 *  label: 'frontend'
 * };
 *
 * deepMerge(destinationObject, sourceObject);
 * // => {
 * //       students: [{ name: 'Unit 1', surname: 'Forge 1' }, { name: 'Unit 2', surname: 'Forge 2' }],
 * //       label: 'frontend',
 * //       count: 1
 * //    }
 */
function helper(inputObj, outputObject) {
  Object.entries(inputObj).forEach(element => {
    const key = element[0]
    const val = element[1]
    if (outputObject[key] && Array.isArray(val)) {
      for (let i in val) {
        outputObject[key][i] = deepMerge(outputObject[key][i], val[i])
      }
    } else if (!outputObject[key]) { outputObject[key] = val }
  })
}

export default function deepMerge(destinationObject, sourceObject) {
  // ¯\_(ツ)_/¯
  const res = {}
  helper(destinationObject, res)
  helper(sourceObject, res)
  return res
}
