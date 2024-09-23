export const GetAllEmployees = () => {
  return fetch("http://localhost:8088/employees?_expand=user").then((res) =>
    res.json()
  );
};

export const GetEmployeeById = (userId) => {
  return fetch(
    `http://localhost:8088/employees?userId=${userId}&_embed=employeeTickets&_expand=user`
  ).then((res) => res.json());
};
