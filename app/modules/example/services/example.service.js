const config = require('config')
const i18n = require('i18n')

const fileUtil = rootRequire('lib/utils/files.util')
const baseService = fileUtil.requireBase('service')
/**
 *
 */
module.exports = class exampleModuleService extends baseService {
	constructor() {
		super()
	}

	async example(params) {
		return params
	}
}
