export const getUser = () =>{
    const userStr = localStorage.getItem('user');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () =>{
    return localStorage.getItem('token') || null;
}

export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
}

export const setUserSession = (token, user) =>{
    localStorage.setItem('token', token);
    localStorage.setItem('user',JSON.stringify(user));
}
