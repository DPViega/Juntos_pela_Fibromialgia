import 'dotenv/config'; // loads .env
import app from './api/index';

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
    console.log(`\n🤖 Bot API running at http://localhost:${port}/api`);
});
