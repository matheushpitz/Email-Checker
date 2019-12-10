export function GetAllLists(key) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/lists', {
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
                key
            })
        }).then(rawData => {
            rawData.json().then(data => {
                resolve(data);
            });
        });        
    });    
}