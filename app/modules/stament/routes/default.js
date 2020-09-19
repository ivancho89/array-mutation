const fileUtil = rootRequire('lib/utils/files.util')

const stamentController = fileUtil.requireController('stament')

module.exports = {
	routes: [
		/*
		 * Entity
		 */

		['staments'],

		/**
		 * @api {post} /
		 *
		 *
		 * @apiName Example
		 * @apiGroup Examples
		 *
		 * @apiDescription
		 *
		 * @apiParam {Object} original
		 * @apiParam {Object} mutation
		 *
		 * @apiParamExample {json} Request-Example:
		 *
		 *
		 * @apiSuccessExample {json} Success-Response:
		 *  HTTP/1.1 200 OK
		 *  {
		 *   "code": 200,
		 *   "userMessage":"",
		 *   "serverInfo": "",
		 *   "data":{}
		 *  }
		 *
		 * @apiErrorExample {json} Error-Response:
		 *  HTTP/1.1 400 Bad Request
		 *  {
		 *   "code": 400,
		 *   "userMessage": "Oops! Seems something went wrong with the request, try again later.",
		 *   "serverInfo": "",
		 *   "data": []
		 *  }
		 */
		['post', '', stamentController.generateUpdateStatement],
	],
}
