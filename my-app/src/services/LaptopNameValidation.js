export const laptopNameValidaton = (str) => {
    const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=';
    if(!str) return false;
    
    for(let i = 0; i < str.length; i++){
        if(!validChars.includes(str[i].toLowerCase())){
            return false;
        } else {
            continue;
        }
    }
    return true;
}