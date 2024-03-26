const setAuthInfo = (data) => {
    localStorage.setItem('username', data.username || '');
    localStorage.setItem('name', data.name || '');
    localStorage.setItem('password', data.password || '');

    console.log("Saved user info to localStorage:", JSON.stringify(data, null, 4));
}

export { setAuthInfo };