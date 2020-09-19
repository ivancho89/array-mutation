/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */

global.rootRequire = path => require(`${process.cwd()}/${path}`)

const fixtures = require('./fixtures')
const chai = require('chai')

const fileUtil = rootRequire('lib/utils/files.util')
const StamentService = fileUtil.requireService('stament')

const { expect } = chai

describe('Example Test', () => {
	before(() => {
		this.serviceInstance = new StamentService()
		this.reqBody = {
			original: fixtures.original
		}
	})


	describe('$ADD', () => {
		it('should add a route document', async () => {
			
			this.reqBody.mutation = fixtures.singleAdd

			const serviceInstance = new StamentService()
			const response = await serviceInstance.generateUpdateStatement(this.reqBody)

			expect(response).to.have.property('$add');
			expect(response).to.be.an('object')

		})

		it('should add a document in a leaf', async () => {
			
			this.reqBody.mutation = fixtures.addDeep
			const serviceInstance = new StamentService()
			const response = await serviceInstance.generateUpdateStatement(this.reqBody)

			expect(response).to.have.property('$add');
			expect(response).to.be.an('object')

		})

	})


	describe('$UPDATE', () => {
		it('should update a route document', async () => {
			
			this.reqBody.mutation = fixtures.singleUpdate
			const serviceInstance = new StamentService()
			const response = await serviceInstance.generateUpdateStatement(this.reqBody)
			expect(response).to.have.property('$update');

		})

		it('should update a document in a leaf', async () => {
			
			this.reqBody.mutation = fixtures.updateDeep
			const serviceInstance = new StamentService()
			const response = await serviceInstance.generateUpdateStatement(this.reqBody)

			expect(response).to.have.property('$update');

		})

	})


	describe('$REMOVE', () => {
		it('should remove a route document', async () => {
			
			this.reqBody.mutation = fixtures.singleDelete
			const serviceInstance = new StamentService()
			const response = await serviceInstance.generateUpdateStatement(this.reqBody)

			expect(response).to.have.property('$remove');

		})

		it('should remove a document in a leaf', async () => {
			
			this.reqBody.mutation = fixtures.deleteDeep
			const serviceInstance = new StamentService()
			const response = await serviceInstance.generateUpdateStatement(this.reqBody)

			expect(response).to.have.property('$remove');

		})

	})	
})
