import { useEffect, useState } from "react";
import "./Form.css";
import {
  GetEmployeeById,
  updateEmployee,
} from "../../services/EmployeeService.jsx";
import { useNavigate } from "react-router-dom";

export const EmployeeForm = ({ currentUser }) => {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    GetEmployeeById(currentUser.id).then((data) => {
      const employeeObj = data[0];
      setEmployee(employeeObj);
    });
  }, [currentUser]);
  const handleSaved = () => {
    event.preventDefault();
    const editedEmployee = {
      id: employee.id,
      specialty: employee.specialty,
      rate: employee.rate,
      userId: employee.userId,
    };
    updateEmployee(editedEmployee).then(() => {
      navigate(`/employees/${currentUser.id}`);
    });
  };
  const handleInputChange = (event) => {
    const stateCopy = { ...employee };
    stateCopy[event.target.name] = event.target.value;
    setEmployee(stateCopy);
  };

  return (
    <form className="profile">
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Specialty:</label>
          <input
            name="specialty"
            type="text"
            required
            className="form-control"
            value={employee.specialty ? employee.specialty : ""}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Hourly Rate:</label>
          <input
            name="rate"
            type="text"
            required
            className="form-control"
            value={employee.rate ? employee.rate : 0}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSaved}>
            Save Profile
          </button>
        </div>
      </fieldset>
    </form>
  );
};
