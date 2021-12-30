import { 
    Dashboard as DashboardIcon, 
    CloudUpload as CloudUploadIcon, 
    StackedBarChart as StackedBarChartIcon, 
    Functions as FunctionsIcon,
} from '@mui/icons-material';



export const drawerWidth = 240;

export const routes = [
    {
      name: 'Dashboard',
      url: '/',
      icon: DashboardIcon
    },
    {
      name: 'Problemas',
      url: '/problems',
      icon: FunctionsIcon
    },
    {
      name: 'Submissões',
      url: '/submissions',
      icon: CloudUploadIcon
    },
    {
      name: 'Ranks',
      url: '/ranks',
      icon: StackedBarChartIcon
    },
];

export const gridStyles = {
	headRow: {
		style: {
			border: 'none',
		},
	},

	headCells: {
		style: {
			color: '#202124',
			fontSize: '20px',
		},
	},

	rows: {
		highlightOnHoverStyle: {
			backgroundColor: 'rgb(230, 244, 244)',
			borderBottomColor: '#FFFFFF',
			borderRadius: '25px',
			outline: '1px solid #FFFFFF',
		},
    
    center: true,

    style: {
			fontSize: '16px',
		},
	},

	pagination: {
		style: {
			border: 'none',
		},
	},
};

interface Input {
  id: string,
  value: string,
  output: string,
  isExample: boolean,
  problem_id: string
}

interface Category {
  id: string,
  description: string
}

export interface Submission {
  id: number,
  status: string,
  response: string,
  user_id: string,
  problem_id: string,
  source_code: string,
  time: number,
  memory: number,
  problem: Problem,
  created_at: Date
}

export interface Problem {
  id: string,
  title: string,
  description: string,
  source_code: string,
  input_description: string,
  output_description: string,
  response: string,
  level: number,
  category: Category,
  submissions: Submission[],
  inputs: Input[]
}

export interface Ranking {
  id: string;
  name: string;
  points: number;
  average_time: number;
  average_memory: number;
}

export interface User {
  id: string,
  name: string,
  email: string
}

export interface Parms {
  token: string;
  uid: string;
}

