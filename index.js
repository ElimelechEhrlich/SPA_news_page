import { news } from "./main.js"

const root = document.getElementById('root')
const header = document.getElementById('nav')
const page_content = document.getElementById('content')
const footer = document.getElementById('footer')

function checkLocalStorage() {
    if (localStorage.data) return JSON.parse(localStorage.getItem('data'))
    else return news
}



function linkEvent(link) {
    link.addEventListener('click', e => {
        e.preventDefault()
        if (link.textContent === 'Home') {
            page_content.innerHTML = ''
            contentLoading()
        }
        else if (link.textContent === 'News') {
            page_content.innerHTML = ''
            for (let i = 0; i < news.length; i++) {
                createNewsContent(news[i].urlToImage, news[i].content, news[i].description)
            }
        }
        if (link.textContent === 'CreateStory') {
            page_content.innerHTML = ''
            storyCreationPage()
        }
    })
}


function createLink(titleContent) {
    const title = document.createElement('a')
    title.textContent = titleContent
    title.classList.add('link')
    title.classList.add(titleContent)
    if (titleContent === 'News') header.appendChild(title)
    else {
        let headerDiv = document.getElementById('headerDiv')
        if (!headerDiv) {
            headerDiv = document.createElement('div')
            headerDiv.id = 'headerDiv'
            header.appendChild(headerDiv)
        }
        title.classList.add('headerDiv')
        headerDiv.appendChild(title)
    }
    linkEvent(title)
}

function createNavHeader() {
    createLink('News')
    createLink('Home')
    createLink('CreateStory')
}

function createHomeContent(d, id) {
    const news_card = document.createElement('section')
    news_card.classList.add('news')
    news_card.id = id
    page_content.appendChild(news_card)
    page_content.classList.remove('column')
    page_content.classList.add('row')
    page_content.classList.remove('news_content')
    page_content.classList.add('home_content')
    const data = { urlToImage: d.urlToImage, author: d.author, title: d.title, content: d.content, description: d.description }
    const titlep = document.createElement('p')
    titlep.textContent = data.title
    titlep.classList.add('title')
    news_card.appendChild(titlep)
    const authorp = document.createElement('p')
    authorp.textContent = data.author
    authorp.classList.add('author')
    news_card.appendChild(authorp)
    const image = document.createElement('img')
    image.src = data.urlToImage
    image.classList.add('image')
    news_card.appendChild(image)
}
function createNewsContent(urlToImage, content, description) {
    const news_card = document.createElement('section')
    news_card.classList.add('news')
    page_content.appendChild(news_card)
    page_content.classList.remove('row')
    page_content.classList.add('column')
    page_content.classList.remove('home_content')
    page_content.classList.add('news_content')
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

function storyCreationPage() {
    const createStoryBox = document.createElement('fieldset')
    const header = document.createElement('h1')
    header.textContent = 'News-Story creation'
    header.classList.add('headerCreateStory')
    createStoryBox.appendChild(header)
    page_content.classList.remove('row')
    page_content.classList.add('column')
    const form = document.createElement('form')
    form.method = 'POST';
    createStoryBox.appendChild(form)
    page_content.appendChild(createStoryBox)
    // page_content.appendChild(form)
    const title = createInput('title', 'text', 'input title')
    form.appendChild(title.label)
    form.appendChild(title.input)
    const author = createInput('author', 'text', 'input author')
    form.appendChild(author.label)
    form.appendChild(author.input)
    const content = createInput('content', 'text', 'input content')
    form.appendChild(content.label)
    form.appendChild(content.input)
    const image = createInput('image', 'file')
    form.appendChild(image.label)
    form.appendChild(image.input)
    const button = document.createElement('div')
    button.textContent = 'submit'
    button.classList.add('button')
    form.appendChild(button)
    button.addEventListener('click', (e) => {
        const {titleValue, authorValue, imageValue, contentValue} = localStorage
        console.log([titleValue, authorValue, imageValue, contentValue]);
        
    })
}
function getGuess(e) {
    const { value } = e.target
    return Number(value)
}
function isCorrectGuess(number, guess) {
    console.log(guess === number);
    return guess === number
}


function createInput(name, inputType, placeholder = null) {
    const label = document.createElement('label')
    label.textContent = `${name}:`
    label.for
    label.classList.add(`${name}Label`, 'label')
    const input = document.createElement('input')
    input.type = inputType
    input.name = name
    input.placeholder = placeholder
    input.classList.add(`${name}Input`, 'input')
    input.addEventListener('change', (e) => {
        const { value } = e.target
        localStorage.setItem(`${name}Value`, value)
    })
    return { label, input }
}


function contentLoading() {
    const news = checkLocalStorage()
    for (let i = 0; i < news.length; i++) {
        createHomeContent(news[i], i + 1)
        news[i].id = i + 1
    }
    if (!localStorage.data) localStorage.setItem('data', JSON.stringify(news))
    const news_cards = document.querySelectorAll('.news')
    for (let i = 0; i < news_cards.length; i++) {
        news_cards[i].addEventListener('click', e => {
            e.preventDefault()
            page_content.innerHTML = ''
            createNewsContent(news[i].urlToImage, news[i].content, news[i].description)
        })
    }
}







createNavHeader()
contentLoading()

// const news_cards = document.querySelectorAll('.news')
// for (let i = 0; i < news_cards.length; i++) {
//     let d = []
//     news_cards[i].addEventListener('click', e => {
//         e.preventDefault()
//         if (localStorage.data) d = JSON.parse(localStorage.getItem('data'))
//         else d = news
//         createNewsContent(d[i].urlToImage, d[i].content, d[i].description)
//     })
// }

