import { Router } from 'express';
import { saveDBConfig } from '../controllers/controller';
import { validateSaveDBConfig } from '../validators/validation';

const router = Router();

router.post('/connect', validateSaveDBConfig, saveDBConfig);

export default router;
