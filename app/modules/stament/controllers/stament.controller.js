const fileUtil = rootRequire('lib/utils/files.util')
const i18n = require('i18n')

const StamentService = fileUtil.requireService('stament')

/**
 * This method allow generate the database type that is passed
 * @param req {object} request -> dbType : BASIC
 * @param res {object} response
 * @param context Application context
 *
 * return message advising that the database was generated
 */
exports.generateUpdateStatement = async (req, res) => {
	try {
		const serviceInstance = new StamentService()
		const result = await serviceInstance.generateUpdateStatement(req.body)
		res.ok({ data: result })
	} catch (e) {
		res.badRequest(e)
	}
}
