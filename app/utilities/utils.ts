import exp from "constants";

export const getMovies =async() =>{
    try{
    const response = await fetch (`/api/get-movies`,{
        method:'GET',
    })
    const result = await response.json();
    console.log(result);
    return result;
   
    
    }
    catch(error){
        return error;
    }
    }

    export const getTopRated =async() =>{
        try{
        const response = await fetch (`/api/get-toprated`,{
            method:'GET',
        })
        const result = await response.json();
        console.log(result);
        return result;
       
        
        }
        catch(error){
            return error;
        }
        }


export const getGenres = async() =>{
    try{
        const response = await fetch (`/api/get-genres`,{
            method:'GET',
        })
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch(error){
        return error;
    }
}


export const getUpcoming = async() =>{
    try{
        const response = await fetch (`/api/get-upcoming`,{
            method:'GET',
        })
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch(error){
        return error;
    }
}

 

export async function getMovieDetails(movieId:number) {
    const url=`/api/getMovieDetails/${movieId}`
    try{
        const response=await fetch(url)
        if(!response.ok){
            return `movie with id ${movieId} not found`
        }
        const result=await response.json()
        return result;
    }
    catch(error){
        return error
    }
}

  