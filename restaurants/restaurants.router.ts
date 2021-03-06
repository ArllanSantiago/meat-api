import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {Restaurant} from './restaurants.model'
import {NotFoundError} from 'restify-errors'

class RestaurantsRouter extends ModelRouter<Restaurant> {

  constructor(){
    super(Restaurant)   
  }

  envelope(document){
    let resource = super.envelope(document)
    resource._links.menu = `${this.basePath}/${resource._id}/menu`
    return resource
  }
  findMenu = (req,res,next)=>{
      Restaurant.findById(req.params.id,"+menu")
        .then(rest =>{
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                res.json(rest.menu)
            }
        }).catch(next)
  }

  replaceMenu = (req,res,next)=>{
        Restaurant.findById(req.params.id,"+menu")
        .then(rest =>{
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                rest.menu = req.body
                return rest.save()
            }
        }).then(rest => {
            res.json(rest.menu)       
            return next 
        }).catch(next)
  }

  applyRoutes(application: restify.Server){
    application.get(this.basePath,this.findAll)
    application.get(`${this.basePath}/:id`, [this.validateId,this.findOne])
    application.post(this.basePath,this.save)
    application.put(`${this.basePath}/:id`,[this.validateId,this.replace])
    application.patch(`${this.basePath}/:id`,[this.validateId,this.update])
    application.del(`${this.basePath}/:id`, [this.validateId,this.delete])
    
    application.get(`${this.basePath}/:id/menu`,[this.validateId,this.findMenu])
    application.put(`${this.basePath}/:id/menu`,[this.validateId,this.replaceMenu])
  }
}
export const restaurantsRouter = new RestaurantsRouter()