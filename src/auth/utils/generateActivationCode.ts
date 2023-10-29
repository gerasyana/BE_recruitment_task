import * as crypto from 'crypto';

export const generateActivationCode = () =>
  crypto.randomBytes(20).toString('hex');
