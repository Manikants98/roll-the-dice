import React, { useEffect, useState } from "react";
import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
  FiMail,
  FiPlus,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

// Type definitions based on your OpenAPI schema
interface Employee {
  employee_id: number;
  name: string;
  email: string;
  department: string;
  job_title: string;
  joining_date: string;
  created_at: string;
  updated_at: string;
}

interface CreateEmployeeRequest {
  prompt: string;
}

interface CreateEmployeeResponse {
  message: string;
  employee_id: number;
  employee_data: Employee;
}

interface EmployeeListResponse {
  employees: Employee[];
  total_count: number;
  timestamp: string;
}

interface StatisticsResponse {
  total_employees: number;
  departments: Record<string, number>;
  recent_hires: number;
  timestamp: string;
}

interface ApiError {
  error: string;
  message?: string;
  details?: string[];
}

interface ValidationError extends ApiError {
  details: string[];
  extracted_data?: Record<string, any>;
}

const EmployeeManagementApp: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState<string>("");

  // API base URL - you can change this to your actual API endpoint
  const API_BASE: string = "https://api-hrms-ai.onrender.com/api/v1";

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
    fetchStatistics();
  }, []);

  const fetchEmployees = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/employees`);
      if (response.ok) {
        const data: EmployeeListResponse = await response.json();
        setEmployees(data.employees || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchStatistics = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      if (response.ok) {
        const data: StatisticsResponse = await response.json();
        setStatistics(data);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const createEmployee = async (): Promise<void> => {
    if (!prompt.trim()) {
      setError("Please enter employee information");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const requestBody: CreateEmployeeRequest = { prompt };

      const response = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data: CreateEmployeeResponse = await response.json();
        setEmployees((prev) => [...prev, data.employee_data]);
        setPrompt("");
        setIsDialogOpen(false);
        fetchStatistics(); // Refresh stats
      } else {
        const errorData: ApiError | ValidationError = await response.json();
        if ("details" in errorData && errorData.details) {
          setError(errorData.details.join(", "));
        } else {
          setError(errorData.message || "Failed to create employee");
        }
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees: Employee[] = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(filter.toLowerCase()) ||
      emp.department.toLowerCase().includes(filter.toLowerCase()) ||
      emp.job_title.toLowerCase().includes(filter.toLowerCase())
  );

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDepartmentColor = (department: string): string => {
    const colors: Record<string, string> = {
      Engineering: "bg-blue-100 text-blue-800",
      Marketing: "bg-green-100 text-green-800",
      Sales: "bg-purple-100 text-purple-800",
      HR: "bg-pink-100 text-pink-800",
      Finance: "bg-yellow-100 text-yellow-800",
      Operations: "bg-indigo-100 text-indigo-800",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  const handleDialogClose = (): void => {
    setIsDialogOpen(false);
    setError("");
    setPrompt("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
              <p className="mt-1 text-gray-600">
                AI-powered employee data extraction and management
              </p>
            </div>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg shadow-sm transition-colors hover:bg-blue-700"
              type="button"
            >
              <FiPlus className="mr-2" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics?.total_employees || employees.length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent Hires</p>
                <p className="text-2xl font-bold text-gray-900">{statistics?.recent_hires || 0}</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiActivity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics?.departments ? Object.keys(statistics.departments).length : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search employees by name, department, or job title..."
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
            className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee: Employee) => (
            <div
              key={employee.employee_id}
              className="bg-white rounded-xl border shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                      <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(
                          employee.department
                        )}`}
                      >
                        {employee.department}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FiBriefcase className="flex-shrink-0 mr-2 w-4 h-4" />
                    <span className="text-sm">{employee.job_title}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMail className="flex-shrink-0 mr-2 w-4 h-4" />
                    <span className="text-sm truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="flex-shrink-0 mr-2 w-4 h-4" />
                    <span className="text-sm">Joined {formatDate(employee.joining_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="py-12 text-center">
            <FiUsers className="mx-auto mb-4 w-12 h-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No employees found</h3>
            <p className="text-gray-600">
              {employees.length === 0
                ? "Get started by adding your first employee."
                : "Try adjusting your search criteria."}
            </p>
          </div>
        )}
      </div>

      {/* Create Employee Dialog */}
      {isDialogOpen && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
              <button
                onClick={handleDialogClose}
                className="text-gray-400 transition-colors hover:text-gray-600"
                type="button"
                aria-label="Close dialog"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label
                  htmlFor="employee-prompt"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Employee Information
                </label>
                <textarea
                  id="employee-prompt"
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPrompt(e.target.value)
                  }
                  placeholder="Describe the employee... e.g., 'John Smith, Software Engineer in Engineering Department, email: john.smith@company.com, joined on 2024-01-15'"
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div className="p-4 mb-4 bg-blue-50 rounded-lg">
                <h4 className="mb-2 font-medium text-blue-900">AI will extract:</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Employee name</li>
                  <li>• Email address</li>
                  <li>• Department</li>
                  <li>• Job title</li>
                  <li>• Joining date (or current date if not specified)</li>
                </ul>
              </div>

              {error && (
                <div className="p-3 mb-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleDialogClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200"
                  disabled={loading}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={createEmployee}
                  disabled={loading || !prompt.trim()}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  {loading ? "Creating..." : "Create Employee"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagementApp;
