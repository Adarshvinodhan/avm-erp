import Org from "../models/org";

const createOrg = async(req,res)=>{
    try{
        const {name,email,gst,phone,address} = req.body;
        const org = Org.findOne({name});
        if(org){
            return res.json({message:"Company exists already"})
        }
        else{
            const newOrg = New 
        }
    }
    catch(err){
        res.status(500).json({
            message:"error creating company"
        })
    }
}

