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
		 * @apiName Array Mutations
		 * @apiGroup Examples
		 *
		 * @apiDescription Get the update statements according the original document and the mutations provided
		 *
		 * @apiParam {Object} original
		 * @apiParam {Object} mutation
		 *
		 * @apiParamExample {json} Request-Example:
		 * 
		 *
		 *  {
	     *		"original":{
		 *			"name":"ivan",
		 *			"videos":[{
		 *				"_id":1,
		 *				"label":"one",
		 *				"comments":[{
		 *					"_id":4,
		 *					"new_stuff":[{
		 *						"_id":6
		 *					}]
		 *				}]
		 *			},{
		 *				"_id":2,
		 *				"label":"two",
		 *				"another":[{
		 *					"_id":8,
		 *					"mew":123
		 *				}]
		 *			},{
		 *				"_id":3,
		 *				"label":"three",
		 *				"comments":[{
		 *					"_id":5,
		 *					"haters":[{
		 *						"_id":7
		 *					}]
		 *				}]
		 *			}]
		 *		},
		 *		"mutation": { "videos": [{"_id":2, "another":[{"_id":8,"asd":"true"}] }]}
		 *	}
		 * @apiSuccessExample {json} Success-Response:
		 *  HTTP/1.1 200 OK
		 *  {
		 *   "code": 200,
		 *   "userMessage":"",
		 *   "serverInfo": "",
		 *   "data": {
		 *	    "$update": {
		 *	      "videos.1.another.0.asd": "true"
		 *	    }
		 *	  }
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
