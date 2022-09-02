export const mailValid = (str) => {
    const mailRegex = new RegExp('[a-z0-9]+@redberry.ge');
    return mailRegex.test(str);
}
