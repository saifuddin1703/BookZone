export const formates = [
    'Paperback',
    'Hardback',
    'Mixed media product',
    'Spiral bound',
    'Cards',
    'Fold-out book or chart',
    'CD-Audio',
    'Book',
    'Game',
    'Board book',
    'Bath book',
    'Notebook / blank book',
    'Sheet music',
    'Postcard book or pack',
    'Calendar',
    'Leather / fine binding',
    'Diary',
    'Novelty book',
    'Loose-leaf',
    'DVD video',
    'Boxed Set',
    'Sheet map',
    'Toy',
    'General merchandise',
    'Other merchandise',
    'Multiple copy pack'
]

export const catagories = [
    'Medical',
    'Science-Geography',
    'Art-Photography',
    'Biography',
    'Business-Finance-Law',
    'Childrens-Books',
    'Computing',
    'Crafts-Hobbies',
    'Crime-Thriller',
    'Dictionaries-Languages',
    'Entertainment',
    'Food-Drink',
    'Graphic-Novels-Anime-Manga',
    'Health',
    'History-Archaeology',
    'Home-Garden',
    'Humour',
    'Mind-Body-Spirit',
    'Natural-History',
    'Personal-Development',
    'Poetry-Drama',
    'Reference',
    'Religion',
    'Romance',
    'Science-Fiction-Fantasy-Horror',
    'Society-Social-Sciences',
    'Sport',
    'Stationery',
    'Teaching-Resources-Education',
    'Technology-Engineering',
    'Teen-Young-Adult',
    'Transport',
    'Travel-Holiday-Guides'
]

const getFilter = (item,index)=>{
    let div = document.createElement('div')
    div.className = `filter ${item} filter-item`
    let input = document.createElement('input')
    input.type = 'checkbox'
    input.id = `filter-${index}`
    input.name = 'filter'
    input.value = item
    let label = document.createElement('label')
    label.htmlFor = `filter-${index}`
    label.innerText = item
    div.appendChild(input)
    div.appendChild(label)
    return div
}

export const loadFilters = (node,data)=> {
    console.log(data)
    data.forEach((item, index)=>{
        node.appendChild(getFilter(item,index))
    }); 
}

export const removeFilters = (node) => {
    let i = node.childElementCount; 
    while (i-- > 5) {
        node.removeChild(node.lastChild);
    }
}




// console.log(document.getElementById('formate-box'))