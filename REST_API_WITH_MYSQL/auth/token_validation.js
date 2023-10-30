const {verify}=require("jsonwebtoken");

module.exports={
    checkToken:(req,res,next)=>{
        let token=req.get("authorization");// key of header 
        if(token){
                token=token.slice(7);//to remove bearer from token, bearer has 6 words and 1 space after that
                
                verify(token,"qwe1234",(err,decoded)=>{
                    if(err){
                        res.json({
                            success:false,
                            message:"Invalid token"
                        });
                    }else{
                        next();
                    }
                })
        }else{
            res.json({
                success:false,
                message:"Access denied! unauthorized user"
            })
        }
    }
}