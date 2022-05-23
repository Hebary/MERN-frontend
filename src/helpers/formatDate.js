export const formatDate = (date)=>{
    const d = new Date(date.split('T')[0].split('-'));
    
    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
    }
    
    return d.toLocaleDateString("es-ES",options);

}