const applyFilters = (
  selectedDepartments,
  selectedEmployees,
  selectedPriorities,
  setFilteredData,
  tasks,
) => {
  let filtered = [...tasks];

  if (selectedDepartments.length) {
    filtered = filtered.filter((task) =>
      selectedDepartments.includes(task.department?.name),
    );
  }

  if (selectedPriorities.length) {
    filtered = filtered.filter((task) =>
      selectedPriorities.includes(task.priority?.name),
    );
  }

  if (selectedEmployees.length) {
    filtered = filtered.filter((task) =>
      selectedEmployees.includes(
        `${task.employee?.name} ${task.employee?.surname}`,
      ),
    );
  }

  setFilteredData(filtered.length > 0 ? filtered : []);
};

const setQueryParams = (setSearchParams, filters, searchParams) => {
  const queryParams = new URLSearchParams(searchParams);
  Object.entries(filters).forEach(([key, value]) => {
    if (value.length) {
      if (typeof value === "string") {
        queryParams.set(key, value);
        return;
      }
      queryParams.set(key, value.join(","));
    } else {
      queryParams.delete(key);
    }
  });

  setSearchParams(queryParams);
};

export { applyFilters, setQueryParams };
