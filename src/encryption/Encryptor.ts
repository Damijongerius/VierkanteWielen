import bcrypt from "bcrypt";

export async function EncryptPasswordASync(password) {
  const hash = await bcrypt.hash(password, 12);
  return hash;
}

export async function comparePassword(
  password: string | Buffer,
  hash: string,
): Promise<Boolean> {
  const result = await bcrypt.compare(password, hash);
  return result;
}
