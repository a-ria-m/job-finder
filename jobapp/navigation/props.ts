import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  SavedJobs: { savedJobs: any[] };
  ApplicationForm: { job: any };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type ApplicationFormRouteProps = RouteProp<RootStackParamList, 'ApplicationForm'>;
export type SavedJobsRouteProps = RouteProp<RootStackParamList, 'SavedJobs'>;
