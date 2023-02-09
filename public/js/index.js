const login_btn = document.querySelector('.login-btn-action');
const signup_btn = document.querySelector('.signup-btn-action');
const logout_btn = document.querySelector('.logout-btn');
import {login, logout} from './auth'
import {loadFilters,removeFilters,catagories,formates} from './script'


if(login_btn)
    login_btn.addEventListener('click', (e) => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 
        console.log(email, password);   
        e.preventDefault();
        login(email, password); 
        // alert(`Email: ${email} Password: ${password}`);
    }); 

if(logout_btn)
    logout_btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout(); 
        // alert(`Email: ${email} Password: ${password}`);
}); 

if(signup_btn)
    signup_btn.addEventListener('click', (e) => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email, password)

        e.preventDefault();
        alert(`Email: ${email} Password: ${password}`);
}); 

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
if(formate_list)
loadFilters(formate_list,formates.slice(0,5)); 
const more_less_formates = document.getElementById('more-less-formates')
if(more_less_formates)
addclicklisterner(more_less_formates,formate_list,formates);

//catagory filter list
const catagory_list = document.getElementById('catagories-list')
if(catagory_list)
loadFilters(catagory_list,catagories.slice(0,5)); 
const more_less_catagories = document.getElementById('more-less-catagories')
if(more_less_catagories)
addclicklisterner(more_less_catagories,catagory_list,catagories);