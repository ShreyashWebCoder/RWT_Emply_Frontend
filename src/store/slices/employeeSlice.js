// import { createSlice } from "@reduxjs/toolkit"
// import { toast } from "react-toastify"
// import axios from "axios"
// const mockEmployees = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@company.com",
//     role: "employee",
//     department: "Engineering",
//     birthday: "2024-12-08",
//     avatar: "/placeholder.svg?height=40&width=40",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@company.com",
//     role: "hr",
//     department: "Human Resources",
//     birthday: "1990-03-15",
//     avatar: "/placeholder.svg?height=40&width=40",
//     status: "active",
//   },
//   {
//     id: 3,
//     name: "Admin User",
//     email: "admin@company.com",
//     role: "admin",
//     department: "Management",
//     birthday: "1985-07-22",
//     avatar: "/placeholder.svg?height=40&width=40",
//     status: "active",
//   },
// ]


// const getallEmployees = () => {
//   axios
//     .get("https://rwt-emp-backend.onrender.com/api/employees")
//     .then((response) => {
//       const employees = response.data;
//       console.log("Fetched employees:", employees);
//       // Assuming the response data is an array of employee objects
//       return mockEmployees;   
//     })

//     .catch((error) => {
//       console.error("Error fetching employees:", error);
//       toast.error("Failed to fetch employees");
//       return [];
//     });
// };
// const initialState = {
//   employees: mockEmployees,
//   birthdayEmployees: [],
//   showBirthdayModal: false,
//   loading: false,
// }

// const employeeSlice = createSlice({
//   name: "employees",
//   initialState,
//   reducers: {
//     setEmployees: (state, action) => {
//       state.employees = action.payload
//     },
//     addEmployee: (state, action) => {
//       state.employees.push(action.payload)
//     },
//     updateEmployee: (state, action) => {
//       const index = state.employees.findIndex((emp) => emp.id === action.payload.id)
//       if (index !== -1) {
//         state.employees[index] = action.payload
//       }
//     },
//     deleteEmployee: (state, action) => {
//       state.employees = state.employees.filter((emp) => emp.id !== action.payload)
//     },
//     checkBirthdays: (state) => {
//       const today = new Date().toISOString().split("T")[0]
//       const birthdayEmployees = state.employees.filter((emp) => {
//         const empBirthday = new Date(emp.birthday)
//         const todayDate = new Date(today)
//         return empBirthday.getMonth() === todayDate.getMonth() && empBirthday.getDate() === todayDate.getDate()
//       })

//       if (birthdayEmployees.length > 0) {
//         state.birthdayEmployees = birthdayEmployees
//         state.showBirthdayModal = true
//         birthdayEmployees.forEach((emp) => {
//           toast.success(`🎉 Happy Birthday ${emp.name}!`, {
//             position: "top-center",
//             autoClose: 5000,
//           })
//         })
//       }
//     },
//     closeBirthdayModal: (state) => {
//       state.showBirthdayModal = false
//     },
//   },
// })

// export const { setEmployees, addEmployee, updateEmployee, deleteEmployee, checkBirthdays, closeBirthdayModal } =
//   employeeSlice.actions
// export default employeeSlice.reducer


// store/slices/employeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// ✅ Async Thunks with Token
export const getAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await axios.get("https://rwt-emp-backend.onrender.com/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch employees");
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

export const updateEmployeeAPI = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await axios.put(`https://rwt-emp-backend.onrender.com/admin/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Employee updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update employee");
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const deleteEmployeeAPI = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await axios.delete(`https://rwt-emp-backend.onrender.com/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Employee deleted successfully");
      dispatch(deleteEmployee(id));
      return id;
    } catch (error) {
      toast.error("Failed to delete employee");
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

// ✅ Initial State
const initialState = {
  employees: [],
  birthdayEmployees: [],
  showBirthdayModal: false,
  loading: false,
};

// ✅ Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((emp) => emp._id !== action.payload);
    },
    checkBirthdays: (state) => {
      const today = new Date().toISOString().split("T")[0];
      const birthdayEmployees = state.employees.filter((emp) => {
        const empBirthday = new Date(emp.birthday);
        const todayDate = new Date(today);
        return (
          empBirthday.getMonth() === todayDate.getMonth() &&
          empBirthday.getDate() === todayDate.getDate()
        );
      });
      if (birthdayEmployees.length > 0) {
        state.birthdayEmployees = birthdayEmployees;
        state.showBirthdayModal = true;
        birthdayEmployees.forEach((emp) => {
          toast.success(`🎉 Happy Birthday ${emp.name}!`, {
            position: "top-center",
            autoClose: 5000,
          });
        });
      }
    },
    closeBirthdayModal: (state) => {
      state.showBirthdayModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateEmployeeAPI.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.employees.findIndex((emp) => emp._id === updated._id);
        if (index !== -1) {
          state.employees[index] = updated;
        }
      })
      .addCase(deleteEmployeeAPI.fulfilled, (state, action) => {
        const id = action.payload;
        state.employees = state.employees.filter((emp) => emp._id !== id);
      })
      .addCase(deleteEmployeeAPI.rejected, (state, action) => {
        toast.error(action.payload || "Failed to delete employee");
      })

  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  checkBirthdays,
  closeBirthdayModal,
} = employeeSlice.actions;
export default employeeSlice.reducer;