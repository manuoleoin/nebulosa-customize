const express = require('express'); 
const postRoutes = require('./routes/postRoutes'); 
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express(); 
const PORTA = 3000; 
 
app.use(express.json()); 
 
app.use(usuarioRoutes); 
app.use(postRoutes); 
 
app.listen(PORTA, () => { 
   console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`); 
}); 