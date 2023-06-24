import { Router } from 'express';
import { chat, getChat, saveDBConfig } from '../controllers/controller';
import { validateChat, validateSaveDBConfig } from '../validators/validation';
import catchAsync from '../utils/catchAsync';
import { validation } from '../middleware/globalErrorHandler';

const router = Router();

router.post(
  '/connect',
  validation(validateSaveDBConfig),
  catchAsync(saveDBConfig),
);

router.post("/chat", validation(validateChat), chat)

router.get('/chat', getChat)

export default router;
