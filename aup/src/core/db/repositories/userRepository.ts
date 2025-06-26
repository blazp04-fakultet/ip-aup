import { Connection } from 'mysql2/promise';
import { UserModel } from '../../models/database/userModel';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { LoginParams, LoginResult } from './loginModel';

export async function createUser(
  connection: Connection,
  params: UserModel,
): Promise<void> {
  const { id, firstName, lastName, email, password } = params;
  const insertQuery = `
    INSERT INTO user (
      id,
      first_name,
      last_name,
      email,
      password,
      created_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?
    )
  `;
  await connection.execute(insertQuery, [
    id,
    firstName,
    lastName,
    email,
    password,
    new Date(),
  ]);
}

export async function loginUser(
  connection: Connection,
  params: LoginParams,
): Promise<LoginResult> {
  const { email, password } = params;

  const selectQuery = `
    SELECT id, email, password 
    FROM user 
    WHERE email = ?
  `;

  const [rows] = await connection.execute(selectQuery, [email]);
  const users = rows as any[];

  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  return {
    id: user.id,
    email: user.email,
  };
}
