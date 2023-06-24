import { Router } from 'express';
import { chat, chatDB, saveDBConfig } from '../controllers/controller';
import {
  validateChat,
  validateChatData,
  validateSaveDBConfig,
} from '../validators/validation';
import catchAsync from '../utils/catchAsync';
import { validation } from '../middleware/globalErrorHandler';

const router = Router();

router.post(
  '/connect',
  validation(validateSaveDBConfig),
  catchAsync(saveDBConfig),
);

router.post('/chat', validation(validateChat), catchAsync(chat));

router.post('/data', validation(validateChatData), catchAsync(chatDB));

export default router;
