// import { config } from "dotenv";
// config()

// const api_key = process.env.API_KEY
const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f408d5751db9483797d84b2826f9c967`

export async function getData(link) {
    const res = await fetch(link)
    const result = await res.json()
    const news = []
    try {
        for (let i = 0; i < 50; i++) {
            const { author, title, urlToImage, description, content } = result.articles[i]
            news.push({ author, title, urlToImage, description, content })
        }
        return news
    } catch (error) {
        return error
    }
}

// async function getNews() {
//     const news = []
//     for (let i = 0; i < 10; i++) {
//         const data = await getData(url)[i]
//         console.log(data);

//         if (data)
//             news.push(data)
//     }
//     return news
// }

const news_data = await getData(url)

function checkLocalStorage() {
    if (localStorage.data) return JSON.parse(localStorage.getItem('data'))
    else return news_data
}

const news = checkLocalStorage()

export {
    news
}
console.log(news);


