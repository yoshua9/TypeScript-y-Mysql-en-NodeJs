import MySQL from '../mysql/mysql';
import{Router,Request,Response} from 'express';


const router = Router();

router.get('/heroes/:id',(req:Request,res:Response)=>{

    const id = req.params.id;

    //evitar mysql injection
    const escapedID = MySQL.instance.cnn.escape(id);

    const query = `SELECT * FROM heroes WHERE id = ${escapedID}`;
    
    MySQL.ejecutarQuery(query,(err:any,heroe:Object[])=>{

        if(err){
            res.status(400).json({
                ok:false,
                error:err
            })
        }else{
            res.json({
                ok:true,
                heroe
            })
        }

    });
    
});


export default router;