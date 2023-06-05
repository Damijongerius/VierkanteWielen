import bcrypt from "bcrypt";

export async function EncryptPasswordASync(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function comparePassword(
  password: string | Buffer,
  hash: string,
  callback: Function
) {
  callback(await bcrypt.compare(password, hash));
}
