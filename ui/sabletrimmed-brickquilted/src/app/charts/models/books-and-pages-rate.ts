export interface ITallyRate {
  dailyBooksReadRate: number;
  pageRate: number;
  daysPerBookRate: number;
  annualBooksRate: number;
  annualPagesRate: number;
  pagesPerBookRate: number;
}

export interface IBooksAndPagesRate {
  date: Date;
  datestring: string;
  startDate: Date;
  daysSinceStart: number;
  overallRates: ITallyRate;
  annualRates: ITallyRate;
  lastTenRates: ITallyRate;
}
