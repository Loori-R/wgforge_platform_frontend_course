import Common_Methods from './CommonMethods'

//'equals', 'in', 'gt', 'gte', 'lt', 'lte', 'between', 'isNull', 'not'
export class Where_Methods extends Common_Methods {
    constructor(queryFull) {
        super(queryFull)

        this.equals = (value) => {
            this.checkTypeAndSet('equals', value)
            return this
        }

        this.in = (values) => {
            if (!Array.isArray(values)) {
                throw new TypeError('arguments not be array')
            }

            values = this.arrayToStringEscape(values)
            this.setQueryWhere('in', values)
            return this
        }

        this.gt = (value) => {
            this.checkTypeAndSet('gt', value)
            return this
        }

        this.gte = (value) => {
            this.checkTypeAndSet('gte', value)
            return this
        }

        this.lt = (value) => {
            this.checkTypeAndSet('lt', value)
            return this
        }

        this.lte = (value) => {
            this.checkTypeAndSet('lte', value)
            return this
        }

        this.between = (from, to) => {
            if (typeof from !== 'number') {
                from = `'${from}'`
            }
            if (typeof to !== 'number') {
                to = `'${to}'`
            }

            this.setQueryWhere('between', `${from} AND ${to}`)
            return this
        }

        this.isNull = () => {
            this.setQueryWhere('isNull', true)
            return this
        }

        this.not = () => {
            if (super.getQueryResult.notCheck === 'off') {
                throw new SyntaxError("not() can't be called multiple times in a row")
            }

            super.setQueryResult('notCheck', 'off')
            this.setQueryWhere('not')
            return this
        }

    }
    //end constructor

    setQueryWhere(key, value) {
        const whereCount = super.getQueryResult.where.length - 1

        if (key !== 'not') {
            super.setQueryResult('notCheck', 'on')
            super.getQueryResult.where[whereCount].push(key, value)
        } else {
            super.getQueryResult.where[whereCount].push(key)
        }
    }

    checkTypeAndSet(key, value) {
        if (typeof value !== 'number') {
            value = `'${value}'`
        }
        this.setQueryWhere(key, value)
    }

    arrayToStringEscape(array) {
        //[1,"2",3,"4"] => 1,<space>"\"2\"",<space>3,<space>"\"4\""
        const noSpace = array.map(item => {
            if (typeof item === 'string') {
                item = `'${item}'`
            }

            return item
        })

        return noSpace.join(', ')
    }

    where(fieldName) {
        if (super.getQueryResult.notCheck === 'off') {
            throw new SyntaxError("After calling not(), you can only call the same methods that uses where to compare.")
        }
        super.where(fieldName)
        return this
    }

    orWhere(fieldName) {
        super.orWhere(fieldName)
        return this
    }
}
