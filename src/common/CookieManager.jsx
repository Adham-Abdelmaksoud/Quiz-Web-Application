let setCookie = (key, value) => {
    const value_str = JSON.stringify(value);
    document.cookie = `${key}=${value_str}`;
}
let getCookieByName = (name) => {
    let cookies = document.cookie.split(';');
    let required_cookie = cookies.filter((e) => e.trim().startsWith(`${name}=`));
    if(required_cookie.length == 0){
        return '';
    }
    else{
        required_cookie = required_cookie[0];
    }
    let value = required_cookie.split(`${name}=`)[1];
    return JSON.parse(value);
}
let clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

export {
    setCookie,
    getCookieByName,
    clearCookie
}