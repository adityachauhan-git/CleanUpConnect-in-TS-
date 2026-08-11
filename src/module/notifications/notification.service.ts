export async function getAllNotificationService(query:object , userData?:string){

    const user_id = Number(userData)

    let conditions:string[] = []
    let values = []

    for(const [keys , values] of Object.entries(query)){
        conditions.push(``)
        values.push(values)
    }   
}