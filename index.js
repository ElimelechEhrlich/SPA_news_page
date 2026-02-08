import { news } from "./main.js"

const root = document.getElementById('root')
const header = document.getElementById('header')
const page_content = document.getElementById('content')
const footer = document.getElementById('footer')


function createNavHeader() {
    createLink('News')
    createLink('Home')
    createLink('Create Story')
}

function createLink(titleContent) {
    const title = document.createElement('a')
    title.textContent = titleContent
    title.classList.add('link')
    header.appendChild(title)
    linkEvent(title)
}

function linkEvent(link) {
    link.addEventListener('click', e => {
        e.preventDefault()
        if (link.textContent === 'News') {
            header.innerHTML = ''
            createNavHeader()
            const data = document.createElement('div')
            data.textContent = data
        }
    })
}


function createHomeContent(d, id) {
    const news_card = document.createElement('section')
    news_card.classList.add('news')
    news_card.id = id
    page_content.appendChild(news_card)
    const data = { urlToImage: d.urlToImage, author: d.author, title: d.title, content: d.content, description: d.description }
    const titlep = document.createElement('p')
    titlep.textContent = data.title
    titlep.classList.add('title')
    news_card.appendChild(titlep)
    const image = document.createElement('img')
    image.src = data.urlToImage
    image.classList.add('image')
    news_card.appendChild(image)
    const authorp = document.createElement('p')
    authorp.textContent = data.author
    authorp.classList.add('author')
    news_card.appendChild(authorp)
}
function createNewsContent(urlToImage, content, description) {
    page_content.innerHTML = ''
    const news_card = document.createElement('section')
    news_card.classList.add('news')
    page_content.appendChild(news_card)
    const descriptionp = document.createElement('p')
    descriptionp.textContent = description
    descriptionp.classList.add('description')
    news_card.appendChild(descriptionp)
    const image = document.createElement('img')
    image.src = urlToImage
    image.classList.add('image')
    news_card.appendChild(image)
    const contentp = document.createElement('p')
    contentp.textContent = content
    contentp.classList.add('content')
    news_card.appendChild(contentp)
}



createNavHeader()
for (let i = 0; i < news.length; i++) {
    createHomeContent(news[i], i + 1)
    news[i].id = i + 1
    // console.log(id);

}
localStorage.setItem('data', JSON.stringify(news))

const news_cards = document.querySelectorAll('.news')

for (let i = 0; i < news_cards.length; i++) {
    news_cards[i].addEventListener('click', e => {
        e.preventDefault()
        if (localStorage.data) {
            const d = JSON.parse(localStorage.getItem('data'))
            console.log(d);
            console.log(e.target);
            console.log(d[i].id);
            console.log(e.target.id);
            const n = d.find((v, j) => d[j].id == e.target.id)
            createNewsContent(n.urlToImage, n.content, n.description)
        }
    })
}