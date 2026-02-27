import 'dotenv/config'; // loads .env
import express from 'express';
import cors from 'cors';

// @ts-ignore
import handleSupportChat from './api/chat/support.ts';
// @ts-ignore
import handleAdminChat from './api/chat/admin.ts';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/chat/support', handleSupportChat);
app.post('/api/chat/admin', handleAdminChat);

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
    console.log(`\n🤖 Bot API running at http://localhost:${port}/api`);
});
