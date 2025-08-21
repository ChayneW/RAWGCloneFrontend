// ###################

// const baseURL= process.env.NEXT_PUBLIC_RAILWAY_API_URL
const baseURL = process.env.RAILWAY_API_URL;

//testing new implimentation:
const rawgURL = process.env.BACKUP_URL;
const RAWG_API_KEY = process.env.RAWG_API_KEY;



// export const fetchGames = async () => {
export const fetchGames = async (page = 1) => {
    console.log("inside fetch");
    console.log(rawgURL);
    console.log(RAWG_API_KEY);

    
    const url = `${baseURL}?page=${page}`;
    
    // const testURL = `${rawgURL}?key=${RAWG_API_KEY}&page=${page}&page_size=50`
    const testURL = `$https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=${page}&page_size=50`

    try {
        // console.log(`api.ts link: ${process.env.NEXT_PUBLIC_RAILWAY_API_URL}?page=${page}`);
        // console.log(`api.ts link: ${baseURL}?page=${page}`);
        // console.log(`fetching details from: ${url}`)

        // const response = await fetch(`${process.env.NEXT_PUBLIC_RAILWAY_API_URL}?page=${page}`); // Update URL if needed
        // const response = await fetch(`${baseURL}?page=${page}`); // Update URL if needed
        

        //original
        // const response = await fetch(url);

        const response = await fetch(testURL);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('api call to c#:')
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};

export const fetchDetails = async (id: number) => {
    
    // const url = `${baseURL}/${id}`;

    const testURL = `${rawgURL}?key=${RAWG_API_KEY}&page=${page}&page_size=50`
    

    // console.log('Fetching details from URL:', url);
    
    try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_RAILWAY_API_URL}/${id}`);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log('Received data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching game details:', error);
        return null;
    }
};


