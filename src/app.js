const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const levelRoutes = require('./routes/levelRoutes');
app.use('/', levelRoutes);

app.get('/', (req, res) => {
    res.redirect('/level1');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at http://localhost:${PORT}`);
});
