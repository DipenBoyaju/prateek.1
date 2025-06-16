// utils/groupTeamsByDepartment.js
export const groupTeamsByDepartment = (teamList) =>
  teamList.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {});
