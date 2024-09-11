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

export const fetchGames = async () => {
    try {
        const response = await fetch('http://localhost:5250/games'); // Update URL if needed
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
    try {
        const response = await fetch(`http://localhost:5250/games/${id}`);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Received data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching game details:', error);
        return null;
    }
};

// export const fetchGames = async () => {
//     const response = await fetch('http://localhost:5250/games'); // Replace with your real API
//     return response.json();
//   };
  
//   export const fetchGameDetails = async (id: number) => {
//     const response = await fetch(`http://localhost:5250/games/${id}`); // Replace with your real API
//     return response.json();
//   };