import { Router } from 'express';
import {
  chat,
  getChat,
  saveDBConfig,
  sendMail,
} from '../controllers/controller';
import { validateChat, validateSaveDBConfig } from '../validators/validation';
import catchAsync from '../utils/catchAsync';
import { validation } from '../middleware/globalErrorHandler';

const router = Router();

router.post(
  '/connect',
  validation(validateSaveDBConfig),
  catchAsync(saveDBConfig),
);

router.post('/chat', validation(validateChat), chat);

router.get('/chat', getChat);
router.post('/send-main', catchAsync(sendMail));

export default router;
