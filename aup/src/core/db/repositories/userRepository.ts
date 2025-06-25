import { Connection } from 'mysql2/promise';
import { UserModel } from '../../models/database/userModel';
import { randomUUID } from 'crypto';

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
