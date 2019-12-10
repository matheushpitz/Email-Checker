export function GetAllMembers(key, listId) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/members', {
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
                key,
                listId
            })
        }).then(rawData => {
            rawData.json().then(data => {
                resolve(data);
            });
        });        
    });    
}