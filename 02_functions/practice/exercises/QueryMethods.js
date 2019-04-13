import Common_Methods from './CommonMethods'
import { Where_Methods } from './WhereMethods'
//'select', 'from', 'where', 'orWhere', 'toString'
export class Query_Methods extends Common_Methods {
    constructor(queryFull) {
        super(queryFull)
        this.select = (...args) => {
            queryFull = queryFull
            if (args.length === 0) {
                super.setQueryResult('select', '*')
                return this
            }
            else if (args.some(elem => typeof elem !== 'string')) {
                return 'arguments not be string'
            }
            else {
                super.setQueryResult('select', ...args)
                return this
            }
        }
        this.from = (tableName) => {
            if (super.getQueryResult.from) { return this } //property exists
            else if (typeof tableName !== 'string') { return 'arguments not be string' }
            else {
                super.setQueryResult('from', tableName)
                return this
            }
        }
        this.where = (fieldName) => {
            /*  "if/else" for tests of WHERE_METHODS  */
            if (!this.getQueryResult.select) {
                return new Where_Methods(queryFull)
            }
            else {
                super.where(fieldName)
                return new Where_Methods(queryFull)
            }
        }
        this.orWhere = (fieldName) => {
            super.orWhere(fieldName)
            return new Where_Methods(queryFull)
        }
        this.toString = () => {
            return super.toString()
        }
    }
}