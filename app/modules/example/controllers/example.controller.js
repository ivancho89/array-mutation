const fileUtil = rootRequire('lib/utils/files.util')
const i18n = require('i18n')

const ExampleService = fileUtil.requireService('example')

/**
 * This method allow generate the database type that is passed
 * @param req {object} request -> dbType : BASIC
 * @param res {object} response
 * @param context Application context
 *
 * return message advising that the database was generated
 */
exports.example = async (req, res) => {
	try {
		const serviceInstance = new ExampleService()
		const result = await serviceInstance.example(req.body)
		res.ok({ data: result })
	} catch (e) {
		res.badRequest(e)
	}
}
