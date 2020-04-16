let _queryFullInfo = Symbol('queryFull');

export default class Common_Methods {
    constructor(queryFull) {
        this[_queryFullInfo] = queryFull
    }

    get getQueryResult() {
        return this[_queryFullInfo]
    }

    setQueryResult(key, value) {
        this[_queryFullInfo][key] = [value]
    }

    where(fieldName) {
        if (typeof fieldName !== 'string') {
            throw new TypeError('arguments not be string')
        } else if (this.getQueryResult.where) {
            this.getQueryResult.where.push({
                whereOrAnd: 'AND',
                fieldName: fieldName
            })
        } else {
            this.setQueryResult('where', {
                whereOrAnd: 'WHERE',
                fieldName: fieldName
            })
        }
    }
    orWhere(fieldName) {
        if (typeof fieldName !== 'string') {
            throw new TypeError('arguments not be string')
        } else if (this.getQueryResult.where) {
            this.getQueryResult.where.push({
                whereOrAnd: 'OR',
                fieldName: fieldName
            })
        } else {
            this.setQueryResult('where', {
                whereOrAnd: 'WHERE',
                fieldName: fieldName
            })
        }
    }

    whereMethodsToString(obj) {
        const whereOrAnd = obj.whereOrAnd
        const fieldName = obj.fieldName
        const not = (obj.not) ? ' NOT' : ''
        const method = obj.method
        const methodValue = obj.methodValue

        switch (method) {
            case 'equals':
                return `${whereOrAnd}${not} ${fieldName} = ${methodValue}`
            case 'in':
                return `${whereOrAnd} ${fieldName}${not} IN (${methodValue})`
            case 'gt':
                return `${whereOrAnd} ${fieldName}${not} > ${methodValue}`
            case 'gte':
                return `${whereOrAnd} ${fieldName}${not} >= ${methodValue}`
            case 'lt':
                return `${whereOrAnd} ${fieldName}${not} < ${methodValue}`
            case 'lte':
                return `${whereOrAnd} ${fieldName}${not} <= ${methodValue}`
            case 'between':
                return `${whereOrAnd} ${fieldName}${not} BETWEEN ${methodValue}`
            case 'isNull':
                return `${whereOrAnd} ${fieldName} IS${not} NULL`
            default:
                return `${whereOrAnd} ${fieldName}`
        }

    }
    //end whereMethodsToString()

    toString() {
        const result = this.getQueryResult

        if (!result.where) {
            return `SELECT ${result.select} FROM ${result.from};`
        }

        const allWhere = result.where.map((item) => {
            return this.whereMethodsToString(item)
        })

        return `SELECT ${result.select} FROM ${result.from} ${allWhere.join(' ')};`
    }
}
