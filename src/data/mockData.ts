export interface Member {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  planType: 'Defined Benefit' | 'Defined Contribution';
  status: 'Active' | 'Inactive' | 'Retired';
  joinDate: string;
  employer: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  yearsOfService: number;
  bank: { name: string; accountMasked: string; routing: string };
  contributions: ContributionYear[];
  applications: Application[];
}

export interface ContributionYear {
  year: number;
  employee: number;
  employer: number;
  ytdBalance: number;
}

export interface Application {
  id: string;
  type: 'Refund' | 'Retirement' | 'Service Purchase';
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Review';
}

export interface Employer {
  id: string;
  name: string;
  status: 'Current' | 'Error' | 'Pending';
  lastUpload: string;
  errorCount: number;
  contactName: string;
}

export interface UploadRecord {
  id: string;
  employerId: string;
  employerName: string;
  fileName: string;
  uploadDate: string;
  period: string;
  totalAmount: number;
  status: 'Success' | 'Error' | 'Processing' | 'Pending Review';
  errorDetails?: string;
  rowNumber?: number;
}

export interface WorkTask {
  id: string;
  requestType: 'Refund' | 'Retirement' | 'Contribution Upload' | 'Service Purchase' | 'Benefit Estimate';
  memberName: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Escalated';
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  submittedDate: string;
}

export const members: Member[] = [
  {
    id: 'M001',
    name: 'Patricia Marie Alvarez',
    firstName: 'Patricia',
    lastName: 'Alvarez',
    planType: 'Defined Benefit',
    status: 'Active',
    joinDate: '2008-03-15',
    employer: 'City Finance Department',
    dob: '1975-06-22',
    ssn: '***-**-4521',
    address: '1428 Elmwood Drive',
    city: 'Sacramento',
    state: 'CA',
    zip: '95814',
    phone: '(916) 555-0142',
    email: 'p.alvarez@cityfinance.gov',
    yearsOfService: 16,
    bank: { name: 'Wells Fargo Bank', accountMasked: '****6823', routing: '121042882' },
    contributions: [
      { year: 2021, employee: 6200, employer: 9800, ytdBalance: 142300 },
      { year: 2022, employee: 6500, employer: 10200, ytdBalance: 159000 },
      { year: 2023, employee: 6800, employer: 10600, ytdBalance: 176400 },
      { year: 2024, employee: 7100, employer: 11000, ytdBalance: 194500 },
    ],
    applications: [
      { id: 'APP-2024-001', type: 'Benefit Estimate', submittedDate: '2024-02-10', status: 'Approved' },
      { id: 'APP-2024-089', type: 'Service Purchase', submittedDate: '2024-08-15', status: 'In Review' },
    ],
  },
  {
    id: 'M002',
    name: 'John Robert Smith',
    firstName: 'John',
    lastName: 'Smith',
    planType: 'Defined Benefit',
    status: 'Retired',
    joinDate: '1995-07-01',
    employer: 'State Education Board',
    dob: '1958-11-03',
    ssn: '***-**-7834',
    address: '3300 Oak Street',
    city: 'Oakland',
    state: 'CA',
    zip: '94602',
    phone: '(510) 555-0298',
    email: 'jsmith.retired@gmail.com',
    yearsOfService: 28,
    bank: { name: 'Bank of America', accountMasked: '****1290', routing: '026009593' },
    contributions: [
      { year: 2020, employee: 7400, employer: 11200, ytdBalance: 312000 },
      { year: 2021, employee: 7600, employer: 11500, ytdBalance: 330100 },
      { year: 2022, employee: 0, employer: 0, ytdBalance: 330100 },
      { year: 2023, employee: 0, employer: 0, ytdBalance: 330100 },
    ],
    applications: [
      { id: 'APP-2022-310', type: 'Retirement', submittedDate: '2022-04-01', status: 'Approved' },
    ],
  },
  {
    id: 'M003',
    name: 'Maria Elena Garcia',
    firstName: 'Maria',
    lastName: 'Garcia',
    planType: 'Defined Contribution',
    status: 'Active',
    joinDate: '2015-09-22',
    employer: 'Metro Health Services',
    dob: '1985-03-14',
    ssn: '***-**-2267',
    address: '872 Maple Court',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90012',
    phone: '(213) 555-0371',
    email: 'm.garcia@metrohealth.org',
    yearsOfService: 9,
    bank: { name: 'Chase Bank', accountMasked: '****5541', routing: '021000021' },
    contributions: [
      { year: 2021, employee: 4800, employer: 4800, ytdBalance: 72000 },
      { year: 2022, employee: 5200, employer: 5200, ytdBalance: 82400 },
      { year: 2023, employee: 5600, employer: 5600, ytdBalance: 93600 },
      { year: 2024, employee: 5800, employer: 5800, ytdBalance: 105200 },
    ],
    applications: [
      { id: 'APP-2024-044', type: 'Refund', submittedDate: '2024-05-20', status: 'Pending' },
    ],
  },
  {
    id: 'M004',
    name: 'Robert James Johnson',
    firstName: 'Robert',
    lastName: 'Johnson',
    planType: 'Defined Benefit',
    status: 'Active',
    joinDate: '2002-01-10',
    employer: 'City Finance Department',
    dob: '1970-09-08',
    ssn: '***-**-9912',
    address: '5401 Pine Avenue',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    phone: '(415) 555-0422',
    email: 'r.johnson@cityfinance.gov',
    yearsOfService: 22,
    bank: { name: 'US Bank', accountMasked: '****3387', routing: '091000022' },
    contributions: [
      { year: 2021, employee: 8200, employer: 12400, ytdBalance: 287000 },
      { year: 2022, employee: 8600, employer: 13000, ytdBalance: 308600 },
      { year: 2023, employee: 9000, employer: 13600, ytdBalance: 331200 },
      { year: 2024, employee: 9200, employer: 14000, ytdBalance: 354400 },
    ],
    applications: [
      { id: 'APP-2023-201', type: 'Benefit Estimate', submittedDate: '2023-11-05', status: 'Approved' },
      { id: 'APP-2024-112', type: 'Retirement', submittedDate: '2024-09-15', status: 'In Review' },
    ],
  },
  {
    id: 'M005',
    name: 'Lisa Wei Chen',
    firstName: 'Lisa',
    lastName: 'Chen',
    planType: 'Defined Contribution',
    status: 'Active',
    joinDate: '2019-06-03',
    employer: 'State Education Board',
    dob: '1992-01-17',
    ssn: '***-**-6603',
    address: '219 Birch Lane',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
    phone: '(619) 555-0567',
    email: 'l.chen@stateedu.gov',
    yearsOfService: 5,
    bank: { name: 'Citibank', accountMasked: '****8812', routing: '021000089' },
    contributions: [
      { year: 2021, employee: 3600, employer: 3600, ytdBalance: 28000 },
      { year: 2022, employee: 4000, employer: 4000, ytdBalance: 36000 },
      { year: 2023, employee: 4400, employer: 4400, ytdBalance: 44800 },
      { year: 2024, employee: 4800, employer: 4800, ytdBalance: 54400 },
    ],
    applications: [],
  },
  {
    id: 'M006',
    name: 'David Marcus Williams',
    firstName: 'David',
    lastName: 'Williams',
    planType: 'Defined Benefit',
    status: 'Inactive',
    joinDate: '2010-04-18',
    employer: 'Metro Health Services',
    dob: '1968-07-25',
    ssn: '***-**-3344',
    address: '660 Cedar Road',
    city: 'Fresno',
    state: 'CA',
    zip: '93701',
    phone: '(559) 555-0680',
    email: 'd.williams@gmail.com',
    yearsOfService: 12,
    bank: { name: 'Wells Fargo Bank', accountMasked: '****7729', routing: '121042882' },
    contributions: [
      { year: 2021, employee: 5400, employer: 8200, ytdBalance: 168000 },
      { year: 2022, employee: 0, employer: 0, ytdBalance: 168000 },
      { year: 2023, employee: 0, employer: 0, ytdBalance: 168000 },
      { year: 2024, employee: 0, employer: 0, ytdBalance: 168000 },
    ],
    applications: [
      { id: 'APP-2022-088', type: 'Refund', submittedDate: '2022-07-12', status: 'Approved' },
    ],
  },
  {
    id: 'M007',
    name: 'Angela Rose Thompson',
    firstName: 'Angela',
    lastName: 'Thompson',
    planType: 'Defined Benefit',
    status: 'Retired',
    joinDate: '1998-02-28',
    employer: 'City Finance Department',
    dob: '1960-04-12',
    ssn: '***-**-5591',
    address: '1100 Walnut Street',
    city: 'Long Beach',
    state: 'CA',
    zip: '90802',
    phone: '(562) 555-0741',
    email: 'angela.thompson@gmail.com',
    yearsOfService: 25,
    bank: { name: 'Bank of America', accountMasked: '****4456', routing: '026009593' },
    contributions: [
      { year: 2021, employee: 0, employer: 0, ytdBalance: 445000 },
      { year: 2022, employee: 0, employer: 0, ytdBalance: 445000 },
    ],
    applications: [
      { id: 'APP-2021-441', type: 'Retirement', submittedDate: '2021-01-15', status: 'Approved' },
    ],
  },
  {
    id: 'M008',
    name: 'Michael Sean Davis',
    firstName: 'Michael',
    lastName: 'Davis',
    planType: 'Defined Contribution',
    status: 'Active',
    joinDate: '2017-11-07',
    employer: 'Metro Health Services',
    dob: '1988-08-30',
    ssn: '***-**-8873',
    address: '3420 Spruce Blvd',
    city: 'Anaheim',
    state: 'CA',
    zip: '92801',
    phone: '(714) 555-0824',
    email: 'm.davis@metrohealth.org',
    yearsOfService: 7,
    bank: { name: 'Chase Bank', accountMasked: '****2234', routing: '021000021' },
    contributions: [
      { year: 2021, employee: 4200, employer: 4200, ytdBalance: 58000 },
      { year: 2022, employee: 4600, employer: 4600, ytdBalance: 67200 },
      { year: 2023, employee: 5000, employer: 5000, ytdBalance: 77200 },
      { year: 2024, employee: 5400, employer: 5400, ytdBalance: 88000 },
    ],
    applications: [
      { id: 'APP-2024-076', type: 'Service Purchase', submittedDate: '2024-06-30', status: 'Pending' },
    ],
  },
];

export const employers: Employer[] = [
  { id: 'E001', name: 'City Finance Department', status: 'Current', lastUpload: '2024-10-01', errorCount: 0, contactName: 'Sandra Lee' },
  { id: 'E002', name: 'State Education Board', status: 'Error', lastUpload: '2024-09-28', errorCount: 3, contactName: 'Brian Torres' },
  { id: 'E003', name: 'Metro Health Services', status: 'Pending', lastUpload: '2024-09-15', errorCount: 0, contactName: 'Karen Nguyen' },
  { id: 'E004', name: 'County Parks Authority', status: 'Current', lastUpload: '2024-10-02', errorCount: 0, contactName: 'Mark Robinson' },
  { id: 'E005', name: 'Transit Authority', status: 'Error', lastUpload: '2024-09-20', errorCount: 2, contactName: 'Diana Fox' },
];

export const uploadRecords: UploadRecord[] = [
  { id: 'UPL-001', employerId: 'E001', employerName: 'City Finance Department', fileName: 'CFD_OCT2024.csv', uploadDate: '2024-10-01', period: 'Oct 2024', totalAmount: 284500, status: 'Success' },
  { id: 'UPL-002', employerId: 'E002', employerName: 'State Education Board', fileName: 'SEB_SEP2024.csv', uploadDate: '2024-09-28', period: 'Sep 2024', totalAmount: 198200, status: 'Error', errorDetails: 'Invalid SSN format', rowNumber: 14 },
  { id: 'UPL-003', employerId: 'E002', employerName: 'State Education Board', fileName: 'SEB_SEP2024_ROW22.csv', uploadDate: '2024-09-28', period: 'Sep 2024', totalAmount: 0, status: 'Error', errorDetails: 'Missing employer contribution amount', rowNumber: 22 },
  { id: 'UPL-004', employerId: 'E002', employerName: 'State Education Board', fileName: 'SEB_SEP2024_ROW37.csv', uploadDate: '2024-09-28', period: 'Sep 2024', totalAmount: 0, status: 'Error', errorDetails: 'Duplicate member ID detected', rowNumber: 37 },
  { id: 'UPL-005', employerId: 'E003', employerName: 'Metro Health Services', fileName: 'MHS_SEP2024.csv', uploadDate: '2024-09-15', period: 'Sep 2024', totalAmount: 156800, status: 'Processing' },
  { id: 'UPL-006', employerId: 'E004', employerName: 'County Parks Authority', fileName: 'CPA_OCT2024.csv', uploadDate: '2024-10-02', period: 'Oct 2024', totalAmount: 92400, status: 'Success' },
  { id: 'UPL-007', employerId: 'E005', employerName: 'Transit Authority', fileName: 'TA_SEP2024.csv', uploadDate: '2024-09-20', period: 'Sep 2024', totalAmount: 312000, status: 'Error', errorDetails: 'Plan code not recognized', rowNumber: 8 },
  { id: 'UPL-008', employerId: 'E005', employerName: 'Transit Authority', fileName: 'TA_SEP2024_ROW19.csv', uploadDate: '2024-09-20', period: 'Sep 2024', totalAmount: 0, status: 'Error', errorDetails: 'Employee end date before start date', rowNumber: 19 },
];

export const workTasks: WorkTask[] = [
  { id: 'TSK-1041', requestType: 'Refund', memberName: 'Maria Elena Garcia', status: 'Open', assignedTo: 'Unassigned', priority: 'High', dueDate: '2024-10-10', submittedDate: '2024-10-01' },
  { id: 'TSK-1042', requestType: 'Retirement', memberName: 'Robert James Johnson', status: 'In Progress', assignedTo: 'Sarah Collins', priority: 'High', dueDate: '2024-10-15', submittedDate: '2024-09-15' },
  { id: 'TSK-1043', requestType: 'Contribution Upload', memberName: 'State Education Board', status: 'Open', assignedTo: 'Mike Chen', priority: 'Medium', dueDate: '2024-10-08', submittedDate: '2024-09-28' },
  { id: 'TSK-1044', requestType: 'Service Purchase', memberName: 'Michael Sean Davis', status: 'In Progress', assignedTo: 'Sarah Collins', priority: 'Medium', dueDate: '2024-10-20', submittedDate: '2024-06-30' },
  { id: 'TSK-1045', requestType: 'Contribution Upload', memberName: 'Transit Authority', status: 'Escalated', assignedTo: 'Jake Rivera', priority: 'High', dueDate: '2024-10-05', submittedDate: '2024-09-20' },
  { id: 'TSK-1046', requestType: 'Benefit Estimate', memberName: 'Patricia Marie Alvarez', status: 'Resolved', assignedTo: 'Amy Park', priority: 'Low', dueDate: '2024-09-30', submittedDate: '2024-09-10' },
  { id: 'TSK-1047', requestType: 'Refund', memberName: 'David Marcus Williams', status: 'Resolved', assignedTo: 'Amy Park', priority: 'Low', dueDate: '2024-09-25', submittedDate: '2024-09-01' },
  { id: 'TSK-1048', requestType: 'Service Purchase', memberName: 'Patricia Marie Alvarez', status: 'In Progress', assignedTo: 'Jake Rivera', priority: 'Medium', dueDate: '2024-10-18', submittedDate: '2024-08-15' },
  { id: 'TSK-1049', requestType: 'Retirement', memberName: 'Angela Rose Thompson', status: 'Resolved', assignedTo: 'Sarah Collins', priority: 'High', dueDate: '2024-01-30', submittedDate: '2024-01-15' },
  { id: 'TSK-1050', requestType: 'Contribution Upload', memberName: 'Metro Health Services', status: 'Open', assignedTo: 'Unassigned', priority: 'Low', dueDate: '2024-10-22', submittedDate: '2024-09-15' },
];

export const recentActivity = [
  { memberName: 'Maria Elena Garcia', type: 'Refund', date: '2024-10-01', status: 'Pending', memberId: 'M003' },
  { memberName: 'Robert James Johnson', type: 'Retirement', date: '2024-09-15', status: 'In Review', memberId: 'M004' },
  { memberName: 'State Education Board', type: 'Contribution Upload', date: '2024-09-28', status: 'Error', memberId: 'E002' },
  { memberName: 'Michael Sean Davis', type: 'Service Purchase', date: '2024-06-30', status: 'Pending', memberId: 'M008' },
  { memberName: 'Transit Authority', type: 'Contribution Upload', date: '2024-09-20', status: 'Error', memberId: 'E005' },
  { memberName: 'Patricia Marie Alvarez', type: 'Service Purchase', date: '2024-08-15', status: 'In Review', memberId: 'M001' },
  { memberName: 'City Finance Department', type: 'Contribution Upload', date: '2024-10-01', status: 'Approved', memberId: 'E001' },
];

export const monthlyContributions = [
  { month: 'Jan', employee: 68200, employer: 104500 },
  { month: 'Feb', employee: 67800, employer: 103200 },
  { month: 'Mar', employee: 72400, employer: 108600 },
  { month: 'Apr', employee: 71100, employer: 107300 },
  { month: 'May', employee: 73600, employer: 110800 },
  { month: 'Jun', employee: 74200, employer: 111400 },
  { month: 'Jul', employee: 70800, employer: 106200 },
  { month: 'Aug', employee: 75400, employer: 113100 },
  { month: 'Sep', employee: 76200, employer: 114400 },
  { month: 'Oct', employee: 68900, employer: 103400 },
  { month: 'Nov', employee: 0, employer: 0 },
  { month: 'Dec', employee: 0, employer: 0 },
];

export const retirementTrends = [
  { month: 'Jan', applications: 3, approved: 2 },
  { month: 'Feb', applications: 4, approved: 3 },
  { month: 'Mar', applications: 2, approved: 2 },
  { month: 'Apr', applications: 5, approved: 4 },
  { month: 'May', applications: 3, approved: 3 },
  { month: 'Jun', applications: 6, approved: 4 },
  { month: 'Jul', applications: 4, approved: 4 },
  { month: 'Aug', applications: 7, approved: 5 },
  { month: 'Sep', applications: 5, approved: 3 },
  { month: 'Oct', applications: 3, approved: 2 },
];

export const errorRates = [
  { month: 'Jan', rate: 1.2 },
  { month: 'Feb', rate: 0.8 },
  { month: 'Mar', rate: 2.1 },
  { month: 'Apr', rate: 1.5 },
  { month: 'May', rate: 0.6 },
  { month: 'Jun', rate: 3.2 },
  { month: 'Jul', rate: 1.8 },
  { month: 'Aug', rate: 0.9 },
  { month: 'Sep', rate: 2.4 },
  { month: 'Oct', rate: 1.1 },
];
