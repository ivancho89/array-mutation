/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */

global.rootRequire = path => require(`${process.cwd()}/${path}`)

const fixtures = require('./fixtures')
const chai = require('chai')

const fileUtil = rootRequire('lib/utils/files.util')
const ExampleService = fileUtil.requireService('example')

const { expect } = chai

describe('Example Test', () => {
	before(() => {
		this.serviceInstance = new ExampleService()
	})

	describe('test', () => {
		it('should test', async () => {})
	})
})
