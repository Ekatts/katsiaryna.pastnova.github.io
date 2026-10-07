document.getElementById('checkBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('https://kaciaryna-pastnova.runasp.net/api/entropy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        if (!response.ok) {
            throw new Error('Ошибка сервера');
        }

        const data = await response.json();
        resultDiv.textContent = `Entropy: ${data.entropy}`;
    } catch (error) {
        resultDiv.textContent = 'Ошибка выполнения запроса';
        console.error(error);
    }
});
