import Common_Methods from './CommonMethods'
import {
    Where_Methods
} from './WhereMethods'

//'select', 'from', 'where', 'orWhere', 'toString'
export class Query_Methods extends Common_Methods {

    select(...args) {
        if (args.length === 0) {
            super.setQueryResult('select', '*')
        } else if (args.some(elem => typeof elem !== 'string')) {
            throw new TypeError('arguments not be string')
        } else {
            super.setQueryResult('select', ...args)
        }

        return this
    }

    from(tableName) {
        if (!super.getQueryResult.from) {
            super.setQueryResult('from', tableName)
        } else if (typeof tableName !== 'string') {
            throw new TypeError('arguments not be string')
        }

        return this
    }

    where(fieldName) {
        /*  "if/else" for tests of WHERE_METHODS  */
        if (super.getQueryResult.select) {
            super.where(fieldName)
        }

        return new Where_Methods(super.getQueryResult)
    }

    orWhere(fieldName) {
        super.orWhere(fieldName)
        return new Where_Methods(super.getQueryResult)
    }
}
