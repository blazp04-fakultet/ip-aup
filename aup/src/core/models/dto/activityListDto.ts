import { ActivityDto } from './activityDto';

export interface ActivityListDto {
  data: ActivityDto[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ActivityListRequestDto {
  page: number;
  pageSize: number;
}
