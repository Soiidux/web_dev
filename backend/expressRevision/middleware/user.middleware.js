import colors from 'colors'

export const logger = (req,res,next)=>{

    const methodColors = {
        GET:'green',
        POST:'yellow',
        PUT:'blue',
        DELETE:'red'
    };

    const color = methodColors[req.method] || 'white';
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]
    );
    next();
};




export const errorHandler = (err,req,res,next)=>{
    if(err.status){
        res.status(err.status).json({msg:err.message});
    }
    else{
        res.status(500).json({msg:'Internal server error'});
    }
}

export const notFoundHandler = (req,res,next)=>{
    if(err.status){
        const error = new Error('404: Not Found');
        error.status = 404;
        next(error);
    }
    else{
        res.status(500).json({msg:'Internal server error'});
    }
}