function addItemField() {
    const container = document.getElementById('itemFields');
    const newItemField = container.children[0].cloneNode(true);
    newItemField.querySelectorAll('input').forEach(input => input.value = '');
    container.appendChild(newItemField);
}

document.getElementById('replacementForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    const items = [];
    document.querySelectorAll('.itemField').forEach(field => {
        const itemName = field.querySelector('[name="itemName[]"]').value;
        const quantity = field.querySelector('[name="quantity[]"]').value;
        items.push({ itemName, quantity });
    });

    const emailData = { items };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email sent successfully:', data);
        alert('Replacement request has been emailed successfully.');
    })
    .catch((error) => {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email.');
    });
});

