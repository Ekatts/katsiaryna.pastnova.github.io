document.getElementById('checkBtn').addEventListener('click', async () => {
    const inputElement = document.getElementById('inputText');
    const resultDiv = document.getElementById('result');

    const nValue = parseInt(inputElement.value.trim(), 10);

    if (isNaN(nValue) || nValue < 0 || nValue > 20) {
        resultDiv.textContent = 'Please enter correct number';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/bynomial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nOrder: nValue })
        });

        if (!response.ok) {
            throw new Error('Error on server side');
        }

        const data = await response.json();
        
        resultDiv.innerHTML = data.resultStr;
    } catch (error) {
        resultDiv.textContent = 'Request error';
        console.error(error);
    }
});


// selecting & quitting the Textarea field — handling
const textarea = document.getElementById('inputText');
const DEFAULT_PLACEHOLDER = 'Enter order n [0, 20]';

textarea.addEventListener('focus', () => {
    if (textarea.value.trim() === DEFAULT_PLACEHOLDER) {
        textarea.value = '';
    }
});

textarea.addEventListener('blur', () => {
    if (textarea.value.trim() === '') {
        textarea.value = DEFAULT_PLACEHOLDER;
    }
});
