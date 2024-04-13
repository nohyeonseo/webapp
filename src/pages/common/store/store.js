const setAuthInfo = (data) => {
    localStorage.setItem('username', data.username || '');
    localStorage.setItem('name', data.name || '');
    localStorage.setItem('password', data.password || '');
    localStorage.setItem('address',data.address || '');
    localStorage.setItem('tellnumber',data.tellnumber || '');

    console.log("user localStorage:", JSON.stringify(data, null, 4));
}

export { setAuthInfo };