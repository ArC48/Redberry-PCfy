export const langValid = (str) => {
    const alphabet = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
    if(!str) return false;
    
    for(let i = 0; i < str.length; i++){
        if(!alphabet.includes(str[i])){
            return false;
        } else {
            continue;
        }
    }
    return true;
}