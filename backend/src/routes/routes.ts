import { Router } from 'express';
import { saveDBConfig } from '../controllers/controller';
import { validateSaveDBConfig } from '../validators/validation';
import catchAsync from '../utils/catchAsync';
import { validation } from '../middleware/globalErrorHandler';

const router = Router();

router.post(
  '/connect',
  validation(validateSaveDBConfig),
  catchAsync(saveDBConfig),
);

export default router;
