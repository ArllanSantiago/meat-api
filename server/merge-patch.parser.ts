import * as restify from 'restify'
import { version } from 'mongoose';

const mpContentType = 'merge-patch+json'/*'application/json'*/ /*merge-patch+json*/

export const mergePatchBodyParser = (req: restify.Request ,res: restify.Response , next)=>{
    if(req.getContentType() === mpContentType && req.method ==='PATCH'){
        (<any>req).rawBody = req.body
        try{
            req.body = JSON.parse(req.body)

        }catch(e){
            return next(new Error(`Invalid content: ${e.message}`))
        }
    }
    return next()
}