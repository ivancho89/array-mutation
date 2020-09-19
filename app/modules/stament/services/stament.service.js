const config = require('config')
const i18n = require('i18n')

const fileUtil = rootRequire('lib/utils/files.util')
const baseService = fileUtil.requireBase('service')
/**
 *
 */
module.exports = class stamentModuleService extends baseService {
	constructor() {
		super()
		this.updateStaments = {}
	}

	findListKey(items){

		const keys = Object.keys(items)
		const listKeyStr = keys.find(key => Array.isArray(items[key]) )
		return listKeyStr;
	}

	setStament(operation = "add", key ='', stamentValue = ''){

		console.log(" setStament ", operation, key, stamentValue)

		const operationTypeKeyStr = `$${operation}`
		if(!this.updateStaments[operationTypeKeyStr])
			this.updateStaments[operationTypeKeyStr] = {}

		switch(operation){
			case "add":
				this.updateStaments[operationTypeKeyStr][key] = [stamentValue]
			break;
			case "update":
				this.updateStaments[operationTypeKeyStr][key] = stamentValue
			break;
			case "remove":
				this.updateStaments[operationTypeKeyStr][key] = stamentValue
			break
			default:
				this.updateStaments[operationTypeKeyStr][key] = [stamentValue]
			break; 
		}

	}

	async generateUpdateStatement(params) {


		const originalDocument = params.original;
		const mutations = params.mutation;

		//Get the key with the array inside
		const arrayKeyStr  = Object.keys(originalDocument).find(key => Array.isArray( originalDocument[key])  )

		try{

			const mutationList = mutations[arrayKeyStr];
			mutationList.forEach(mutation => this.deepIterator(originalDocument[arrayKeyStr], mutation, arrayKeyStr) )
			return this.updateStaments

		}catch(e){
			Promise.reject(e)
		}

	}

	deepIterator(mainList = [], mutationDoc= {}, parentKey = null){

		try{

			mainList.forEach((listItem, mainIndex)=>{
				
				const listKeyStr = this.findListKey(listItem) 

				if(!mutationDoc._id){

					this.setStament("add", parentKey, mutationDoc )
					return 

				}else{

					if(listItem._id === mutationDoc._id  ){

						if(mutationDoc._delete){

							let key = `${parentKey}.${mainIndex}`
							this.setStament("remove", key, true )

							return;
						}

						let mutationKeys = Object.keys(mutationDoc)
						mutationKeys = mutationKeys.filter(key => { return key != "_id"})
						const mutationListKeyStr = mutationKeys.find(key => Array.isArray(mutationDoc[key]) )

						console.log(this)
						mutationKeys.forEach(k =>{


							if( !Array.isArray(mutationDoc[k]) ){
								this.setStament("update", `${parentKey}.${mainIndex}.${k}`, mutationDoc[k] )
							}
						})
						 
						if(mutationListKeyStr){	

							mutationDoc[mutationListKeyStr].forEach((mutationItemList)=>{
								this.deepIterator(  listItem[listKeyStr], mutationItemList, `${parentKey}.${mainIndex}.${mutationListKeyStr}`)
							})
						}
	 

					}

				}
			})
		}catch(e){
			return e
		}

	}
}
