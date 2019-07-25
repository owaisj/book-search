const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/bookSearchDb';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
