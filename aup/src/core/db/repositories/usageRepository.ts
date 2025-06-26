import { Connection } from 'mysql2/promise';
import { ActivityListRequestDto } from '../../models/dto/activityListDto';
import { ModelUsageListRequestDto } from '../../models/dto/modelUsageListDto';
import {
  ModelUsageModel,
  UsageLogModel,
  UsageModel,
} from '../../models/database/usageModel';

export async function addUsageLog(
  connection: Connection,
  params: UsageLogModel,
) {
  const { id, modelName, tokenCount, modelProvider, userId, apiKey } = params;

  const insertQuery = `
  INSERT INTO \`usage\` (
    id,
    model_name,
    token_count,
    model_provider,
    created_at,
    user_id,
    api_key
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  await connection.execute(insertQuery, [
    id,
    modelName,
    tokenCount,
    modelProvider,
    new Date(),
    userId,
    apiKey,
  ]);
}

export async function getUsageLogsByUserId(
  connection: Connection,
  userId: string,
  searchModel: ActivityListRequestDto,
): Promise<UsageModel[]> {
  const { page, pageSize } = searchModel;
  const [rows] = await connection.query(
    `
      SELECT 
        id,
        model_name,
        token_count,
        model_provider,
        created_at,
        user_id,
        api_key
      FROM \`usage\`
      WHERE user_id = ? 
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `,
    [userId, pageSize, (page - 1) * pageSize],
  );

  return rows as UsageModel[];
}

export async function getModelUsageAnalytics(
  connection: Connection,
  userId: string,
  params: ModelUsageListRequestDto,
): Promise<{
  page: number;
  pageSize: number;
  totalPages: number;
  data: ModelUsageModel[];
}> {
  const { page, pageSize } = params;

  const [countResult] = await connection.query(
    `SELECT COUNT(DISTINCT CONCAT(model_name, model_provider)) as total 
     FROM \`usage\` 
     WHERE user_id = ?`,
    [userId],
  );

  const totalCount = (countResult as any)[0].total;
  const totalPages = Math.ceil(totalCount / pageSize);

  const [totalRequestsResult] = await connection.query(
    `SELECT COUNT(*) as total_requests 
     FROM \`usage\` 
     WHERE user_id = ?`,
    [userId],
  );
  const totalRequests = (totalRequestsResult as any)[0].total_requests;

  const [rows] = await connection.query(
    `
    SELECT 
      model_name as model,
      model_provider as modelProvider,
      COUNT(*) as requestCount,
      SUM(token_count) as totalTokens,
      ROUND((COUNT(*) / ?) * 100, 2) as percentageOfTotalUsage,
      ? as userId
    FROM \`usage\`
    WHERE user_id = ?
    GROUP BY model_name, model_provider
    ORDER BY requestCount DESC
    LIMIT ? OFFSET ?
    `,
    [totalRequests || 1, userId, userId, pageSize, (page - 1) * pageSize],
  );

  return {
    page,
    pageSize,
    totalPages,
    data: rows as ModelUsageModel[],
  };
}

export const getUserTotalUsage = async (
  dbConnection: any,
  userId: string,
): Promise<{ totalRequests: number; totalTokens: number }> => {
  try {
    const query = `
      SELECT 
        COUNT(*) as totalRequests,
        SUM(token_count) as totalTokens
      FROM \`usage\`
      WHERE user_id = ?
    `;

    const [results] = await dbConnection.query(query, [userId]);

    const totalRequests = results[0]?.totalRequests || 0;
    const totalTokens = results[0]?.totalTokens || 0;

    return {
      totalRequests: Number(totalRequests),
      totalTokens: Number(totalTokens),
    };
  } catch (error) {
    console.error('Error getting user total usage:', error);
    throw error;
  }
};
export const getUserTotalUsageForApiKey = async (
  dbConnection: any,
  api_key: string,
): Promise<{ totalRequests: number; totalTokens: number }> => {
  try {
    const query = `
      SELECT 
        COUNT(*) as totalRequests,
        SUM(token_count) as totalTokens
      FROM \`usage\`
      WHERE api_key = ?
    `;

    const [results] = await dbConnection.query(query, [api_key]);

    const totalRequests = results[0]?.totalRequests || 0;
    const totalTokens = results[0]?.totalTokens || 0;

    return {
      totalRequests: Number(totalRequests),
      totalTokens: Number(totalTokens),
    };
  } catch (error) {
    console.error('Error getting user total usage:', error);
    throw error;
  }
};
