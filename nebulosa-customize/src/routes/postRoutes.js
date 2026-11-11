const express = require('express'); 
const router = express.Router(); 
const postController = require('../controllers/postController'); 

router.post('/posts', postController.criarPost); 
router.get('/posts', postController.listarPosts); 
router.get('/posts/:id', postController.buscarPostPorId); 
router.put('/posts/:id', postController.atualizarPost); 
router.delete('/posts/:id', postController.apagarPost); 
 
module.exports = router; 
