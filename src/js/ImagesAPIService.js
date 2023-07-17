// import axios from 'axios';
// const API_KEY = '38295997-c79217038b4f657b51b1fa265';
// axios.defaults.baseURL = 'https://pixabay.com/api';

// const limit = 40;

// class FetchImages {
//   #query;

//   constructor() {
//     this.page = 1;
//   }

//   set query(newQuery) {
//     this.page = 1;
//     this.#query = newQuery;
//   }

//   async fetch() {
//     const response = await axios.get(`/?key=${API_KEY}`, {
//       params: {
//         q: this.#query,
//         page: this.page,
//         per_page: limit,
//         image_type: 'foto',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//     });
//     if (this.page > response.data.totalHits / limit) {
//       response.data.isEnd = true;
//     }
//     this.page += 1;
//     return response.data;
//   }
// }

// export default FetchImages;