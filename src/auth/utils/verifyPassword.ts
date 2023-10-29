import * as bcrypt from 'bcryptjs';

export const verifyPassword = (
  passwordToVerify: string,
  encryptedPassword: string,
) => bcrypt.compare(passwordToVerify, encryptedPassword);
