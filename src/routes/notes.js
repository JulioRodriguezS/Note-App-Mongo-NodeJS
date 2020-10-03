const router = require('express').Router()
const { response } = require('express')
const Note = require('../models/Note')
const {isAuthenticated} = require('../helpers/auth')

router.get('/notes/add',isAuthenticated, (req,res,next)=>{
    res.render('notes/new-note')
})

router.post('/notes/new-note', isAuthenticated, async (req,res,nex)=>{
    const {title, description} = req.body
    const errors = []
    if(!title){
        errors.push({text: 'Please type title'})
    }
    if(!description){
        errors.push({text: 'Please type description'})
    }
    if(errors.length>0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    }else{
        const newNote = new Note({
            title, description
        })
        newNote.user = req.user.id
        newNote.save()        
        .then(
            req.flash('success_msg', 'Note Added Successfully')
        )
        .catch(err=>{
            req.flash('error_msg', `Something went wrong: ${err.text}`)
        })

        res.redirect('/notes')
    }
})

router.get('/notes', isAuthenticated, async (req,res,next)=>{    
    const notes = await Note.find({user:req.user.id}).lean().sort({createdDate:'desc'})   
    res.render('notes/all-notes',{notes})
})

router.get('/notes/edit/:id', isAuthenticated, async (req,res)=>{
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-note', note)
})

router.put('/notes/edit-note/:id', isAuthenticated, async(req,res,next)=>{
    const{title,description} = req.body
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    .then(
        req.flash('success_msg','Note Updated')        
    )
    .catch((err)=>{
        req.flash('error_msg',`Canot be Updated: ${err}`)
    }) 
    setTimeout(()=>{res.redirect('/notes')}, 3000)   
})

router.delete('/notes/:id', isAuthenticated, async(req,res,next)=>{
    await Note.findByIdAndDelete(req.params.id)   
    .then(
        req.flash('success_msg','Note Deleted')        
    )
    .catch((err)=>{
        req.flash('error_msg',`Canot be Deleted: ${err}`)
    }) 
    setTimeout(()=>{res.redirect('/notes')}, 3000)    
})


module.exports = router

