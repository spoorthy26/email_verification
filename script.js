// public/script.js
document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const result = document.getElementById('result');
    result.innerText = "Checking...";

    try {
        const response = await fetch('/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();

        if (data.valid) {
            result.innerText = data.message;
        } else {
            result.innerText = data.message;
        }
    } catch (error) {
        result.innerText = 'An error occurred. Please try again.';
    }
});
