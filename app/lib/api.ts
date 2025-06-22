// ###################

// const baseURL= process.env.NEXT_PUBLIC_RAILWAY_API_URL
const baseURL = process.env.RAILWAY_API_URL;

// export const fetchGames = async () => {
export const fetchGames = async (page = 1) => {
    const url = `${baseURL}?page=${page}`;
    try {
        // console.log(`api.ts link: ${process.env.NEXT_PUBLIC_RAILWAY_API_URL}?page=${page}`);
        // console.log(`api.ts link: ${baseURL}?page=${page}`);
        // console.log(`fetching details from: ${url}`)

        // const response = await fetch(`${process.env.NEXT_PUBLIC_RAILWAY_API_URL}?page=${page}`); // Update URL if needed
        // const response = await fetch(`${baseURL}?page=${page}`); // Update URL if needed
        const response = await fetch(url);

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
    
    const url = `${baseURL}/${id}`;
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


