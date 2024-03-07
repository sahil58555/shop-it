
export default (conrollerFunction)=> (req,res,next)=>
    Promise.resolve(conrollerFunction(req,res,next)).catch(next);

