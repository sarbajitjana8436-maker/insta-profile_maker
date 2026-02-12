const express = require('express');
const app = express();
const port = 3000;
const Path = require('path');
const {v4: uuidv4} = require('uuid');
const methodOverride = require('method-override');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Serve static files from the 'public' directory
app.use(express.static(Path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views'));


// data
let users = [
    {
        id: uuidv4(),    
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: uuidv4(),    
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
];
// Define routes

// Interface route
app.get('/profile_interface', (req, res) => {
    res.render('index.ejs');
});

// Create route
app.get('/profile_interface/create', (req, res) => {
    res.render('create.ejs');
});

// Profile list route
app.get('/profile_interface/li_profiles', (req, res) => {
    res.render('profiles.ejs', { users });
});

app.post('/profile_interface/li_profiles', (req, res) => {
    let { name, email, bio } = req.body;
    let newUser = {
        id: uuidv4(),
        name,
        email,
        bio
    };
    users.push(newUser);
    res.render('profiles.ejs', { users }); 
});

app.get('/profile_interface/li_profiles/:id', (req, res) => {
    let { id } = req.params;
    let user = users.find((u)=> u.id === id);
    res.render('edit_bio.ejs', { user });
    
});

// edit route
app.get('/profile_interface/li_profiles/:id/edit', (req, res) => {  
    let { id } = req.params;
    let user = users.find((u)=> u.id === id);
    res.render('edit_bio.ejs', { user });
});


// update and delete routes
app.patch('/profile_interface/li_profiles/:id', (req, res) => {
    let { id } = req.params;
    let { bio } = req.body;
    let user = users.find((u)=> u.id === id);
    user.bio = bio;
    res.redirect('/profile_interface/li_profiles');
});

app.delete('/profile_interface/li_profiles/:id', (req, res) => {
    let { id } = req.params;
    users = users.filter((u)=> u.id !== id);
    res.redirect('/profile_interface/li_profiles');
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});