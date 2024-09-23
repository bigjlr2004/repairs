export const GetNonStaff = () => {
  return fetch("http://localhost:8088/users?isStaff=false").then((res) =>
    res.json()
  );
};

export const GetStaff = () => {
  return fetch("http://localhost:8088/users?isStaff=true").then((res) => {
    return res.json();
  });
};
