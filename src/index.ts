import * as commands from './actions'
import * as options from './options'
import { Container } from 'func'
import * as print from './utils/print'

const next = print.cyanColor('func-service')
console.log(print.dangerColor('> Deprecated.'))
const text = print.logColor(`> Use package "${next}" instead.`)
console.log(text)
console.log('')

const modules = Object.assign({}, commands, options)
const params = Object.keys(modules).map(key => modules[key])
new Container(params)
