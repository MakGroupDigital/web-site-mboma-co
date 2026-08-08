import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { createMailer } from './mailer.js';

const config = loadConfig();
const mailer = createMailer(config);
const app = createApp(config, mailer);

app.listen(config.PORT, config.HOST, async () => {
  console.log(`MboMa notification service listening on ${config.HOST}:${config.PORT}`);
  try {
    await mailer.verify();
    console.log('LWS SMTP connection verified.');
  } catch (error) {
    console.error('LWS SMTP verification failed. Check the VM environment variables.', error);
  }
});
