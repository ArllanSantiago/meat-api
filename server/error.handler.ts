import * as restify from 'restify'


export const handleError = (req:restify.Request, res:restify.Response,err,done)=>{

    err.toJSON = ()=>{
        return{message :err.message}
    }
    switch(err.name){
        case 'MongoError':
            (err.code === 11000)? err.statusCode = 400: err.statusCode = err.statusCode 
            break
        case 'ValidationError':
            err.statusCode = 400
            break
        
    }

    done()
}