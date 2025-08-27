// ###################

// const baseURL= process.env.NEXT_PUBLIC_RAILWAY_API_URL
// const baseURL = process.env.RAILWAY_API_URL;

//testing new implimentation:
// const rawgURL = process.env.BACKUP_URL;
// const RAWG_API_KEY = process.env.RAWG_API_KEY;


// export const fetchGames = async () => {
export const fetchGames = async (page = 1) => {
    console.log("inside fetch");

    // original
    // const url = `${baseURL}?page=${page}`;
    
    const url = `/api/games?page=${page}`;

    try {
        // console.log(`api.ts link: ${process.env.NEXT_PUBLIC_RAILWAY_API_URL}?page=${page}`);
        // console.log(`api.ts link: ${baseURL}?page=${page}`);
        // console.log(`fetching details from: ${url}`)

        //original
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('api call to c#:')
        const data = await response.json();

        console.log(data);

        // possible problem, wasn't needed in original code = (data) .
        
        // return data.results; //works with rawg fine
        return data // works with railway

    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};

export const fetchDetails = async (id: number) => {
    
    // Original
    // const url = `${baseURL}/${id}`;

    const url = `/api/games/${id}`;

    console.log('Fetching details from URL:', url);
    
    try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_RAILWAY_API_URL}/${id}`);
        
        const response = await fetch(url, { cache: "no-store" });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Received data:');
        console.log(data);

        return data; //works with rawg fine

    } catch (error) {
        console.error('Error fetching game details:', error);
        return null;
    }
};


