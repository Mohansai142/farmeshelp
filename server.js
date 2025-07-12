const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect('mongodb+srv://dhanu:dhanu123456789@cluster0.mnih86n.mongodb.net/dairy?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const farmerSchema = new mongoose.Schema({
  firstname: String,
  ph: String,
  vid: String,
  milk_type: String,
  min_litre: Number,
  animalID: String,
});

const Farmer = mongoose.model('Farmer', farmerSchema);

// Route to add farmer
app.post('/api/farmer', async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.json({ message: 'Farmer added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving farmer', error: err });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Farmer Help API is Running!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

