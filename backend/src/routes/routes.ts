import { Router } from 'express';
import { saveDBConfig } from '../controllers/controller';
import { validateSaveDBConfig } from '../validators/validation';
import catchAsync from '../utils/catchAsync';

const router = Router();

router.post('/connect', validateSaveDBConfig, catchAsync(saveDBConfig));

export default router;
