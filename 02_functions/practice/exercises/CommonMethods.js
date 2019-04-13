let _queryFullInfo = Symbol('queryFull');
export default class Common_Methods {
    constructor(queryFull) {
        this[_queryFullInfo] = queryFull
    }

    get getQueryResult() {
        return this[_queryFullInfo]
    }

    setQueryResult(key, value, index) {
        if (index && this[_queryFullInfo][key]) {
            this[_queryFullInfo][key][index] = value
        }
        else { this[_queryFullInfo][key] = [value] }
    }

    where(fieldName) {
        if (typeof fieldName !== 'string') { return 'arguments not be string' }
        else if (this.getQueryResult.where) {
            this.getQueryResult.where.push(['AND', fieldName])
        }
        else {
            this.setQueryResult('where', ['WHERE', fieldName])
        }
    }
    orWhere(fieldName) {
        if (typeof fieldName !== 'string') { return 'arguments not be string' }
        else if (this.getQueryResult.where) {
            this.getQueryResult.where.push(['OR', fieldName])
        }
        else {
            this.setQueryResult('where', ['WHERE', fieldName])
        }
    }

    whereMethodsToString(array) {
        const whereOrAnd = array[0]
        const fieldName = array[1]
        const not = (array[2] === 'not') ? ' NOT' : ''
        const method = (array[2] === 'not') ? array[3] : array[2]
        const methodValue = array[array.length - 1]
        switch (method) {
            case 'equals':
                return `${whereOrAnd}${not} ${fieldName} = ${methodValue}`
                break;
            case 'in':
                return `${whereOrAnd} ${fieldName}${not} IN (${methodValue})`
                break;
            case 'gt':
                return `${whereOrAnd} ${fieldName}${not} > ${methodValue}`
                break;
            case 'gte':
                return `${whereOrAnd} ${fieldName}${not} >= ${methodValue}`
                break;
            case 'lt':
                return `${whereOrAnd} ${fieldName}${not} < ${methodValue}`
                break;
            case 'lte':
                return `${whereOrAnd} ${fieldName}${not} <= ${methodValue}`
                break;
            case 'between':
                return `${whereOrAnd} ${fieldName}${not} BETWEEN ${methodValue}`
                break;
            case 'isNull':
                return `${whereOrAnd} ${fieldName} IS${not} NULL`
                break;
            default:
                return `${whereOrAnd} ${fieldName}`
                break;
        }
    }

    toString() {
        const result = this.getQueryResult
        if (!result.where) { return `SELECT ${result.select} FROM ${result.from};` }
        const allWhere = result.where.map((item) => {
            return this.whereMethodsToString(item)
        })
        return `SELECT ${result.select} FROM ${result.from} ${allWhere.join(' ')};`
    }
}