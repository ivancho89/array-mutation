const config = require('config')
const i18n = require('i18n')

const fileUtil = rootRequire('lib/utils/files.util')
const baseService = fileUtil.requireBase('service')
/**
 *
 */
module.exports = class statementModuleService extends baseService {
	constructor() {
		super()
		this.updateStaments = {}
	}


	/*
	*  Find the key that has an array on it if any
	*
	*  @param {Object} items  object to find the key with the array on it
	*/
	findListKey(items) {
		const keys = Object.keys(items)
		const listKeyStr = keys.find(key => Array.isArray(items[key]))
		return listKeyStr
	}

	/*
	*  Set the statements
	*
	*  @param {String} operation  the type of stament to add
	*  @param {String} Key the key to add in the stament
	*  @param {Any} stamentValue the value of the key in the statement
	*/
	setStatement(operation = 'add', key = '', stamentValue) {
		const operationTypeKeyStr = `$${operation}`
		if (!this.updateStaments[operationTypeKeyStr]) this.updateStaments[operationTypeKeyStr] = {}

		switch (operation) {
			case 'add':
				this.updateStaments[operationTypeKeyStr][key] = [stamentValue]
				break
			default:
				this.updateStaments[operationTypeKeyStr][key] = stamentValue
				break
		}
	}

	/*
	* Start the flow to go through the mutations and generate the statements if any
	*
	*  @param {Object} params 
	*  @param {Object} params.original original document
	*  @param {Object} params.mutation List of mutation to process
	*/
	async generateUpdateStatement(params) {
		const originalDocument = params.original
		const mutations = params.mutation

		//Get the key with the array inside
		const arrayKeyStr = Object.keys(originalDocument).find(key =>
			Array.isArray(originalDocument[key])
		)

		try {
			const mutationList = mutations[arrayKeyStr]

			//iterate the mutation list in order to get the statement for each one of them
			mutationList.forEach(mutation =>
				this.deepIterator(originalDocument[arrayKeyStr], mutation, arrayKeyStr)
			)
			return this.updateStaments
		} catch (e) {
			Promise.reject(e)
		}
	}

	/**
	 *  Iterate through a list and validate if match the at least one of the cases ($add, $update, $delete)
	 *  if so, add the case into updateStaments and complete
	 *
	 *  @param {Array} mainList main list to search to
	 *  @param {Object} mutationDoc mutation to validate
	 *  @param {String} parentKey parent key of the process
	 */
	deepIterator(mainList = [], mutationDoc = {}, parentKey = null) {
		try {
			// Iterta the main list
			mainList.forEach((listItem, mainIndex) => {
				// Validate if the mutation doesn't have the _id in order to set the create
				if (!mutationDoc._id) {
					this.setStatement('add', parentKey, mutationDoc)
					return
				} else if (listItem._id === mutationDoc._id) {
					// Validate if the mutation has the _delete in order to set the remove
					if (mutationDoc._delete) {
						let mutationKey = `${parentKey}.${mainIndex}`
						this.setStatement('remove', mutationKey, true)
						return
					}

					// if the mutation has fields that are not an array, set each one of the to update
					Object.keys(mutationDoc)
						.filter(key => {
							return key != '_id'
						})
						.forEach(k => {
							if (!Array.isArray(mutationDoc[k]))
								this.setStatement('update', `${parentKey}.${mainIndex}.${k}`, mutationDoc[k])
						})

					// Get the key if the mutation that has an array as a value
					const mutationListKeyStr = this.findListKey(mutationDoc)

					// if exists the array, iterate through it in order to fulfill the mutation
					if (mutationListKeyStr) {
						const listKeyStr = this.findListKey(listItem)

						mutationDoc[mutationListKeyStr].forEach(mutationItemList => {
							return this.deepIterator(
								listItem[listKeyStr],
								mutationItemList,
								`${parentKey}.${mainIndex}.${mutationListKeyStr}`
							)
						})
					}

					return
				}
			})
		} catch (e) {
			return e
		}
	}
}
