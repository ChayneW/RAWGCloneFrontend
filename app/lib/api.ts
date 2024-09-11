// // export const fetchDetails = async (id:number) => {
// //     try {
// //         const response = await fetch(`http://localhost:5250/games/${id}`);
// //         if (!response.ok) {
// //             throw new Error('Network response was not ok');
// //         }
// //         console.log('api call fetchDetails to c#:');
// //         const data = await response.json();
// //         return data;
// //     } catch(error){
// //         console.error('Error fetching game details:', error);
// //         return null;
// //     };
// // }

// ###################

// export const fetchGames = async () => {
//     try {
//         const response = await fetch('http://localhost:5250/games'); // Update URL if needed
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         console.log('api call to c#:')
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching games:', error);
//         return [];
//     }
// };

// export const fetchDetails = async (id: number) => {
//     try {
//         const response = await fetch(`http://localhost:5250/games/${id}`);
//         console.log('Response status:', response.status);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log('Received data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching game details:', error);
//         return null;
//     }
// };

// // export const fetchGames = async () => {
// //     const response = await fetch('http://localhost:5250/games'); // Replace with your real API
// //     return response.json();
// //   };
  
// //   export const fetchGameDetails = async (id: number) => {
// //     const response = await fetch(`http://localhost:5250/games/${id}`); // Replace with your real API
// //     return response.json();
// //   };


// ###################

// const LOCAL_API_URL = 'http://localhost:5250/games';
// // const PRODUCTION_API_URL = process.env.NEXT_PUBLIC_RAILWAY_API_URL || '';
// const PRODUCTION_API_URL = process.env.RAILWAY_API_URL || '';

// export const fetchGames = async () => {
//     try {
//         // First, try to call the local API
//         const response = await fetch(LOCAL_API_URL);
//         if (!response.ok) {
//             throw new Error('Network response was not ok from localhost');
//         }
//         console.log('API call to localhost successful');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching games from localhost:', error);

//         // Fall back to the Railway-hosted API if the localhost call fails
//         try {
//             const response = await fetch(PRODUCTION_API_URL);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok from production');
//             }
//             console.log('API call to production successful');
//             const data = await response.json();
//             return data;
//         } catch (productionError) {
//             console.error('Error fetching games from production:', productionError);
//             return []; // Return an empty array if both calls fail
//         }
//     }
// };

// export const fetchDetails = async (id: number) => {
//     try {
//         // Try to call the local API first
//         const response = await fetch(`${LOCAL_API_URL}/${id}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok from localhost');
//         }
//         console.log('API call to localhost successful');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching game details from localhost:', error);

//         // Fall back to the Railway-hosted API if the localhost call fails
//         try {
//             const response = await fetch(`${PRODUCTION_API_URL}/${id}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok from production');
//             }
//             console.log('API call to production successful');
//             const data = await response.json();
//             return data;
//         } catch (productionError) {
//             console.error('Error fetching game details from production:', productionError);
//             return null; // Return null if both calls fail
//         }
//     }
// };


const LOCAL_API_URL = 'http://localhost:5250/games';
const PRODUCTION_API_URL = process.env.NEXT_PUBLIC_RAILWAY_API_URL || '';

export const fetchGames = async () => {
    try {
        // First, try to call the local API
        const response = await fetch(LOCAL_API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok from localhost');
        }
        console.log('API call to localhost successful');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching games from localhost:', error);

        // Fall back to the Railway-hosted API if the localhost call fails
        try {
            const response = await fetch(PRODUCTION_API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok from production');
            }
            console.log('API call to production successful');
            const data = await response.json();
            return data;
        } catch (productionError) {
            console.error('Error fetching games from production:', productionError);
            return []; // Return an empty array if both calls fail
        }
    }
};

export const fetchDetails = async (id: number) => {
        try {
            // Try to call the local API first
            const response = await fetch(`${LOCAL_API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok from localhost');
            }
            console.log('API call to localhost successful');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game details from localhost:', error);
    
            // Fall back to the Railway-hosted API if the localhost call fails
            try {
                const response = await fetch(`${PRODUCTION_API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok from production');
                }
                console.log('API call to production successful');
                const data = await response.json();
                return data;
            } catch (productionError) {
                console.error('Error fetching game details from production:', productionError);
                return null; // Return null if both calls fail
            }
        }
    };

