document.getElementById('checkBtn').addEventListener('click', async () => {
    const inputElement = document.getElementById('inputText');
    const resultDiv1 = document.getElementById('result1');
    const resultDiv2 = document.getElementById('result2');

    const cleanedText = inputElement.value.replace(/\s+/g, '');

    const isEnglish = str => /^[A-Za-z]+$/.test(str);

    if (!isEnglish(cleanedText)) {
        resultDiv1.textContent = 'Please enter correct text (English alphabet only)';
        resultDiv2.textContent = '';
        return;
    }

    const keyLength = cleanedText.length;

    try {
        const response = await fetch('http://kaciaryna-pastnova.runasp.net/api/vernam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                plaintext: cleanedText, 
                keyLength: keyLength 
            })
        });

        if (!response.ok) {
            throw new Error('Error on server side');
        }

        const data = await response.json();
        
        resultDiv1.textContent = data.ciphertext;
        resultDiv2.textContent = "Key: " + data.usedKey;
    } catch (error) {
        resultDiv1.textContent = 'Request error';
        resultDiv2.textContent = 'Request error';
        console.error(error);
    }
});

const textarea = document.getElementById('inputText');
const DEFAULT_PLACEHOLDER = 'Enter text using English alphabet';

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
