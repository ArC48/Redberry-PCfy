export const langValid = (str) => {
    const alphabet = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
    let count = 0; 
    for(let i = 0; i < str.length; i++){
        if(!alphabet.includes(str[i])){
            return false;
        } else {
            count++
        }
    }
    return count;
}