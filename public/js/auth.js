import axios from 'axios';

export const login = async (email, password) =>{
    try{
        const res = await axios.post('http://127.0.0.1:3000/api/auth/login', {
            username : email,
            password
        }); 
        
        if(res.data.status === 'success'){
            alert('Logged in successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    }catch(err){
        console.log(err.response.data.message);
        alert(err.response.data.message);
    }
}

export const logout = async () => {
    try{
        const res = await axios.get('http://127.0.0.1:3000/api/auth/logout'); 
        
        if(res.data.status === 'success'){
            location.reload(true);
        }
    }catch(err){
        console.log(err.response.data.message);
        alert(err.response.data.message);
    }
}