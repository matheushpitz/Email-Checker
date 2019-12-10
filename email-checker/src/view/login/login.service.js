export function Authenticate(username, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/auth', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
                username,
                password
            })
        }).then(rawData => {
            rawData.json().then(data => {
                resolve(data);
            });
        });        
    });    
}