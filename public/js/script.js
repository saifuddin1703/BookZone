const formates = [
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

const catagories = [
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

getFilter = (item,index)=>{
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

function loadFilters(node,data){
    console.log(data)
    data.forEach((item, index)=>{
        node.appendChild(getFilter(item,index))
    }); 
}

function removeFilters(node){
    let i = node.childElementCount; 
    while (i-- > 5) {
        node.removeChild(node.lastChild);
    }
}
function addclicklisterner(node,listnode,data){
    node.addEventListener('click',()=>{
        // console.log(node.childElementCount)
        if(listnode.childElementCount == 5){
            loadFilters(listnode,data.slice(5,data.length))
            node.innerHTML = '<u>See less</u>'; 
            // more_less.
        }else{
            removeFilters(listnode); 
            node.innerHTML = '<u>See more</u>'; 
        }
    }); 
}

//formate filter list
const formate_list = document.getElementById('formates-list')
loadFilters(formate_list,formates.slice(0,5)); 
const more_less_formates = document.getElementById('more-less-formates')
addclicklisterner(more_less_formates,formate_list,formates);

//catagory filter list
const catagory_list = document.getElementById('catagories-list')
loadFilters(catagory_list,catagories.slice(0,5)); 
const more_less_catagories = document.getElementById('more-less-catagories')
addclicklisterner(more_less_catagories,catagory_list,catagories);



// console.log(document.getElementById('formate-box'))