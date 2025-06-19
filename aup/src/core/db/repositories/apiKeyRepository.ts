// apiKeys.ts
import { Connection, RowDataPacket } from 'mysql2/promise';
import { ApiKey } from '../../models/dto/apiKeyDto';

export interface CreateApiKeyParams {
  id: string;
  key: string;
  role?: string;
}

export async function addApiKey(
  connection: Connection,
  params: CreateApiKeyParams,
): Promise<ApiKey> {
  const { id, key, role = 'user' } = params;

  const insertQuery = `
    INSERT INTO api_keys (
      id,
      api_key,
      role
    ) VALUES (?, ?, ?)
  `;

  await connection.execute(insertQuery, [id, key, role]);

  const [rows] = await connection.query<RowDataPacket[]>(
    `SELECT id, api_key, role, created_at, updated_at, deleted_at 
    FROM api_keys WHERE id = ?`,
    [id],
  );

  if (!rows || rows.length === 0) {
    throw new Error('Failed to create API key');
  }

  return rows[0] as ApiKey;
}

export function deleteApiKey() {
  throw new Error('Method not implemented.');
}

export async function validateApiKey(
  connection: Connection,
  key: string,
  id: string,
): Promise<ApiKey | null> {
  const [rows] = await connection.query<RowDataPacket[]>(
    `
      SELECT 
        id,
        api_key,
        role,
        created_at,
        updated_at,
        deleted_at
      FROM api_keys
      WHERE api_key = ? 
        AND id = ?
        AND deleted_at IS NULL
    `,
    [key, id],
  );

  return rows.length > 0 ? (rows[0] as ApiKey) : null;
}
