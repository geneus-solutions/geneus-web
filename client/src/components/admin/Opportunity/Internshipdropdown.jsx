import React, { useMemo } from "react";
import { FaSpinner } from "react-icons/fa";
import { useGetprivateopportunitiesQuery } from "../../../features/careers/opportunitySlice";

const InternshipDropdown = ({
  value,
  onChange,
  name,
  label = "Internship ID",
  disabled = false,
}) => {
  const {
    data: opportunitiesData,
    isLoading: isLoadingOpportunities,
    isError: isErrorOpportunities,
    error: opportunitiesError
  } = useGetprivateopportunitiesQuery();

  const internships = useMemo(() => {
    if (!opportunitiesData) return [];

     const dataArray = Array.isArray(opportunitiesData) 
      ? opportunitiesData 
      : opportunitiesData.opportunities || [];

    return dataArray
      .filter(opp => opp && opp.type === "internship")
      .map(opp => ({
        _id: opp._id,
        title: opp.title,
        type: opp.type,
        department: opp.department
      }));
  }, [opportunitiesData]);

return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={disabled || isLoadingOpportunities}
        >
          <option value="">Select an internship</option>
          {isLoadingOpportunities ? (
            <option value="" disabled>
              Loading internships...
            </option>
          ) : isErrorOpportunities ? (
            <option value="" disabled>
              Error loading internships
            </option>
          ) : !internships || internships.length === 0 ? (
            <option value="" disabled>
              No internships available
            </option>
          ) : (
            internships.map((internship) => (
              <option key={internship._id} value={internship._id}>
                {internship.title} {internship.department ? `- ${internship.department}` : ''}
              </option>
            ))
          )}
        </select>
        
        {isLoadingOpportunities && (
          <FaSpinner className="absolute right-3 top-3 w-4 h-4 text-gray-400 animate-spin" />
        )}
      </div>
      
      {value && (
        <div className="mt-2 text-sm">
          <p className="text-gray-500">
            Selected internship ID: <span className="font-medium">{value}</span>
          </p>
          {internships && internships.find(intern => intern._id === value) && (
            <p className="text-gray-500 mt-1">
              Title: <span className="font-medium">
                {internships.find(intern => intern._id === value)?.title}
              </span>
            </p>
          )}
        </div>
      )}
      
      {isErrorOpportunities && (
        <p className="mt-1 text-sm text-red-500">
          Error: {opportunitiesError?.data?.message || opportunitiesError?.message || "Failed to load internships"}
        </p>
      )}
    </div>
  );
};

export default InternshipDropdown;
