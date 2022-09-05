export const mailValid = (str) => {
    const mailRegex = new RegExp('[A-Za-z0-9]+@redberry.ge');
    return mailRegex.test(str);
}
