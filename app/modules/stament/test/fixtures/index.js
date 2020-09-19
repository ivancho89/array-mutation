const original = {
	name: 'ivan',
	videos: [
		{
			_id: 1,
			label: 'one',
			comments: [
				{
					_id: 4,
					new_stuff: [
						{
							_id: 6,
						},
					],
				},
			],
		},
		{
			_id: 2,
			label: 'two',
			another: [
				{
					_id: 8,
					mew: 123,
				},
			],
		},
		{
			_id: 3,
			label: 'three',
			comments: [
				{
					_id: 5,
					haters: [
						{
							_id: 7,
						},
					],
				},
			],
		},
	],
}

const singleAdd = { videos: [{ mykey: 'update one' }] }

const addDeep = { videos: [{ _id: 2, another: [{ lable: 'hurra' }] }] }

const wrongAdd = { videos: [{ _id: 15, another: [{ lable: 'hurra' }] }] }

const singleUpdate = { videos: [{ _id: 2, mykey: 'update one' }] }

const updateDeep = { videos: [{ _id: 2, another: [{ _id: 8, hello: 'true' }] }] }

const singleDelete = { videos: [{ _id: 3, another: [{ _id: 5, _delete: true }] }] }

const deleteDeep = {
	videos: [{ _id: 3, another: [{ _id: 5, haters: [{ _id: 7, _delete: true }] }] }],
}

module.exports = {
	original,
	singleAdd,
	addDeep,
	wrongAdd,
	singleUpdate,
	updateDeep,
	singleDelete,
	deleteDeep,
}
