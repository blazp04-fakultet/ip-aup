import { Connection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { ApiKey, CreateApiKeyParams } from '../../models/database/apiKeyModel';

export async function addApiKey(
  connection: Connection,
  params: CreateApiKeyParams,
): Promise<ApiKey> {
  const { id, key, name, role = 'user', user_id } = params;

  const insertQuery = `
    INSERT INTO api_keys (
      id,
      \`key\`,
      name,
      role,
      user_id
    ) VALUES (?, ?, ?, ?, ?)
  `;

  await connection.execute(insertQuery, [id, key, name, role, user_id]);

  const [rows] = await connection.query<RowDataPacket[]>(
    `SELECT id, \`key\`, role, user_id, created_at, updated_at, deleted_at 
    FROM api_keys WHERE id = ?`,
    [id],
  );

  if (!rows || rows.length === 0) {
    throw new Error('Failed to create API key');
  }

  return rows[0] as ApiKey;
}

export async function deleteApiKey(
  connection: Connection,
  id: string,
): Promise<boolean> {
  console.log(id);
  const deleteQuery = `
    UPDATE api_keys 
    SET deleted_at = CURRENT_TIMESTAMP() 
    WHERE id = ? AND deleted_at IS NULL
  `;

  const [result] = await connection.execute<ResultSetHeader>(deleteQuery, [id]);

  return result.affectedRows > 0;
}

export async function validateApiKey(
  connection: Connection,
  key: string,
  id?: string,
): Promise<ApiKey | null> {
  let query = `
    SELECT 
      id,
      \`key\`,
      name,
      role,
      user_id,
      created_at,
      updated_at,
      deleted_at
    FROM api_keys
    WHERE \`key\` = ? 
      AND deleted_at IS NULL
  `;

  const params: any[] = [key];

  if (id) {
    query += ' AND id = ?';
    params.push(id);
  }

  const [rows] = await connection.query<RowDataPacket[]>(query, params);

  return rows.length > 0 ? (rows[0] as ApiKey) : null;
}

export async function getApiKeyById(
  connection: Connection,
  id: string,
): Promise<ApiKey | null> {
  const [rows] = await connection.query<RowDataPacket[]>(
    `
      SELECT 
        id,
        \`key\`,
        name,
        role,
        user_id,
        created_at,
        updated_at,
        deleted_at
      FROM api_keys
      WHERE id = ? 
        AND deleted_at IS NULL
    `,
    [id],
  );

  return rows.length > 0 ? (rows[0] as ApiKey) : null;
}

export async function getApiKeysByUserId(
  connection: Connection,
  userId: string,
): Promise<ApiKey[]> {
  const [rows] = await connection.query<RowDataPacket[]>(
    `
      SELECT 
        id,
        \`key\`,
        name,
        role,
        user_id,
        created_at,
        updated_at,
        deleted_at
      FROM api_keys
      WHERE user_id = ? 
        AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
    [userId],
  );

  return rows as ApiKey[];
}

export async function updateApiKey(
  connection: Connection,
  id: string,
  updates: Partial<Pick<ApiKey, 'role'>>,
): Promise<ApiKey | null> {
  const setClause = Object.keys(updates)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');

  if (!setClause) {
    throw new Error('No fields to update');
  }

  const updateQuery = `
    UPDATE api_keys 
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP()
    WHERE id = ? AND deleted_at IS NULL
  `;

  const values = [...Object.values(updates), id];

  const [result] = await connection.execute<ResultSetHeader>(
    updateQuery,
    values,
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getApiKeyById(connection, id);
}
export const getApiKeyCount = async (
  connection: Connection,
  id: string,
): Promise<number> => {
  try {
    const query = `
      SELECT 
        COUNT(*) as count
      FROM api_keys
      WHERE user_id = ? 
        AND deleted_at IS NULL
    `;

    const [results] = await connection.query<RowDataPacket[]>(query, [id]);

    const count: number = results?.[0]?.count || 0;

    return Number(count);
  } catch (error) {
    console.error('Error getting API key count:', error);
    throw error;
  }
};
