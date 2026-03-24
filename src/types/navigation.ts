export type NavPage =
  | 'dashboard'
  | 'members'
  | 'retirement-benefits'
  | 'employers'
  | 'work-queue'
  | 'reports'
  | 'member-profile'
  | 'refund-flow'
  | 'retirement-flow';

export type NavigateFn = (page: NavPage, memberId?: string) => void;
