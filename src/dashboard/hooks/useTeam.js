import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl'
import { useQuery } from '@tanstack/react-query'

const getTeamByDepartment = async (department) => {
  const res = await axios.get(`${baseUrl}/api/team/department/${department}`);
  return res.data;
}

export const useTeamByDepartment = (department) => {
  return useQuery({
    queryKey: ['team', department],
    queryFn: () => getTeamByDepartment(department),
    enabled: !!department,
  })
}