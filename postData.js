const nameField = document.getElementById('name');
const passField = document.getElementById('pass');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    const user = {
        name: nameField.value,
        pass: passField.value
    };

    const promise = fetch('https://api.jsonbin.io/b/5f2c66aa6f8e4e3faf2cd347', {
        method: 'PUT',
        headers: {
           ' Content-Type': 'application/json',
            'secret-key': '$2b$10$dgM1SKMKiT9Mwj/qs8/0auCBRW85JrfDfVhdB8uoUfh90.wEpXJcK'
        },
        body: JSON.stringify(user)
    });

    promise
        .then((data) => {
            return data.json();
        })
        .then((items) => {
            console.log('items: ',items )
        })
})