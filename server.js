const express = require('express')
const sequelize = require("./models/index.js");
const Contact = require("./models/contact.js")
const app = express()
const port = 3000

sequelize.authenticate()
.then(() =>
    console.log('Database * Table Created!'))
.catch((err)=>
    console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Read All Contacts
app.get('/contacts',async (req, res) => {
    try {
        const contacts = await Contact.findAll()
        res.json(contacts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Read Single Contacts
app.get('/contacts/:id',async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id)
        if(!contact) return res.status(404).json({ error: "Contact not found"})
        res.json(contact)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Create Contacts
app.post('/contacts',async (req, res) => {
    try {
        const contact = await Contact.create(req.body)
        res.json(contact)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Update Contacts
app.put('/contacts/:id',async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id)
        if(!contact) return res.status(404).json({ error: "Contact not  found"})

            await Contact.update(req.body, { where : { id: req.params.id}})
            const updated_contact = await Contact.findByPk(req.params.id)
        res.json(updated_contact)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Delete Contacts
app.delete('/contacts/:id',async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id)
        if(!contact) return res.status(404).json({ error: "Contact not  found"})

            await contact.destroy()
        res.json({message: "Contact deleted"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:3000`)
})