require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.post('/send-email', async (req, res) => {
    const { items } = req.body; 
  
    const itemListString = items.map(item => 
      `Item Name: ${item.itemName}, Quantity: ${item.quantity}`
    ).join('\n');
  
    const msg = {
      to: 'info@dolcevitasewell.com', 
      from: 'dcorso@dolcevitasewell.com', 
      subject: 'Inventory Replacement Request',
      text: `The following items need replacement:\n${itemListString}`,
    };

  try {
    await sgMail.send(msg);
    res.json({ message: 'Notification sent successfully!' });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
    res.status(500).send('Failed to send notification.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//exports.api = functions.https.onRequest(app);