export default function errorHandler(res: any, err: Record<any, any>){
    res.json(err)
    console.error("Error: "+err.message)
}