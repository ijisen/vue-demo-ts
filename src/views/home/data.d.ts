import { TableListItem as HotSearchTableListItem } from './_component/HotSearchCard/data.d';
import { TableListItem as HotTagsTableListItem } from './_component/HotTagsCard/data.d';
import { TableListItem as ArticleHitTableListItem } from './_component/ArticleHitCard/data.d';
import { TableListItem as WorksHitTableListItem } from './_component/WorksHitCard/data.d';

export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface ArticleChartDataType {
  total: number;
  num: number;
  week: number;
  day: number;
}

export interface WorksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface TopicsChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface LinksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}

export interface TableListQueryParams {
  page: number;
  per: number;
  sort?: number;
}

export interface PaginationConfig {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
}

export interface HotSearchDataType {
  list: HotSearchTableListItem[];
  pagination: PaginationConfig;
}

export interface HotTagsDataType {
  list: HotTagsTableListItem[];
  pagination: PaginationConfig;
}

export interface ArticleHitDataType {
  list: ArticleHitTableListItem[];
  pagination: PaginationConfig;
}

export interface WorksHitDataType {
  list: WorksHitTableListItem[];
  pagination: PaginationConfig;
}
