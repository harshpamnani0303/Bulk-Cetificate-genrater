// Install dependencies: npm install express nodemailer body-parser cors
const express = require("express");


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider (e.g., "gmail", "yahoo")
  auth: {
    user: "harshPamnani0303@gmail.com", // Your email
    pass: "radhakrishn0303", // Your email password or app-specific password
  },
});

// Email route
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: "harshpamnani0303@gmail.com", // Sender's email
    to, // Recipient's email
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
