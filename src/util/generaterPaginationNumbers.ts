


export const generaterPagination=(currentPage:number,totalPages:number)=>{

        // si el numero total de 7 o menos vamos a mostrar todas las paginas 
        //sin puntos suspensivos

        if(totalPages <= 7){
            return Array.from({length:totalPages},(_,i)=>i+1)
        }

        //si la pagina actualar esta entre las primeras tres paginas 
        //mostrar las primeras tres .. y las ultimas 2

        if(currentPage<=3){
            return[1,2,3,'...',totalPages-1,totalPages]
        }
        


        //si las pagina actual esta entre las ultimas 
        //se muestras las primeras de dos y las ultimas tres
        if(currentPage>=totalPages-2){
            return[1,2,'...',totalPages-2,totalPages-1,totalPages]
        }

        //si la pagina actual esta en un punto medio
        //mostrar la primera pagina , puntos sunpensivos , lapagina actual y vecinos
         
        return[
            1,
            '...',
            currentPage-1,
            currentPage,
            currentPage-2,
            '...',
            totalPages    
        ]



}