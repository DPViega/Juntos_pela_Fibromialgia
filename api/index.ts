import express from 'express';
import cors from 'cors';
import { handleSupportChat } from './botSupport';
import { handleAdminChat } from './botAdmin';

// A lógica dos bots foi quebrada em arquivos separados: botSupport.ts e botAdmin.ts
// Esse arquivo apenas gerencia o express e redireciona para as importações
const app = express();

app.use(cors());
// Aumentar o limite para permitir imagens no payload do body
app.use(express.json({ limit: '10mb' }));

app.post('/api/chat/support', handleSupportChat);
app.post('/api/chat/admin', handleAdminChat);

// Exporta o app do Express para ser usado como função serverless (Ex. Vercel)
export default app;
