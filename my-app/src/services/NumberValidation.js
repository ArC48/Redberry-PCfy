export const numberValid = (number) => {
    const numberRegex = new RegExp(/^(\+?995)?(5\d{8})$/);
    return numberRegex.test(number);
}