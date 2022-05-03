const button = document.getElementById('post-btn');

button.addEventListener('click', async _ => {
    try {
        const response = await fetch('https://fundzer.herokuapp.com/api/transaction/create-transaction', {
            method: 'post',
            body: {
                data
            }
        });
        console.log('Completed!', response);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
});