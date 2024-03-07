
class ApiFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyWord = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } :{};
        this.query=this.query.find({...keyWord});
        return this;
    }
    filter(){
        let queryStrCopy = {...this.queryStr};
        const fieldsToRemove = ["keyword","page"];

        fieldsToRemove.forEach((field)=>delete queryStrCopy[field]);
        
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match)=>`$${match}`);

        this.query=this.query.find(JSON.parse(queryStr));
        
        return this;
    }
    pagination(resPerPage){
        const currPage=Number(this.queryStr.page) || 1;
        const skip = resPerPage*(currPage-1);
        this.query= this.query.limit(resPerPage).skip(skip);
        return this;
    }
    
}

export default ApiFilters;
