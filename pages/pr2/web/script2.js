document.getElementById('checkBtn').addEventListener('click', async () => {
    const inputElement = document.getElementById('inputText');
    const resultDiv = document.getElementById('result');

    const lengthValue = parseInt(inputElement.value.trim(), 10);

    if (isNaN(lengthValue) || lengthValue <= 0) {
        resultDiv.textContent = 'Please enter correct length';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/textgenerator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ length: lengthValue })
        });

        if (!response.ok) {
            throw new Error('Error on server side');
        }

        const data = await response.json();
        
        resultDiv.textContent = data.generatedText;
    } catch (error) {
        resultDiv.textContent = 'Request error';
        console.error(error);
    }
});


// selecting & quitting the Textarea field — handling
const textarea = document.getElementById('inputText');
const DEFAULT_PLACEHOLDER = 'Enter text length (<= 1000)';

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