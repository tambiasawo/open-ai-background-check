"use client";
import React, { useState } from "react";
import { ProspectInfo, BackgroundCheckResult } from "@/types";
import ResultsPanel from "./ResultsPanel";
import { Form } from "./_components/Form";
import Header from "./_components/Header";

export default function BackgroundCheck() {
  const [retries, setRetries] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [results, setResults] = useState<BackgroundCheckResult | null>(null);

  const inputFields: ProspectInfo = {
    firstName: "",
    lastName: "",
    other_names: "",
    email: "",
    city: "",
    state: "",
    dob: "",
    city2: "",
    state2: "",
    lengthOfStay: "yes",
  };
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProspectInfo, string>>
  >({});
  const toggleErrors = (name: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };
  const validateForm = (formData: ProspectInfo): boolean => {
    const newErrors: Partial<Record<keyof ProspectInfo, string>> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (
        !value &&
        key !== "city2" &&
        key !== "state2" &&
        key !== "other_names"
      ) {
        newErrors[key as keyof ProspectInfo] = "This field is required";
        isValid = false;
      }
      if (formData["lengthOfStay"] === "no") {
        if (!formData["city2"]) {
          newErrors["city2"] = "This field is required";
          isValid = false;
        }
        if (!formData["state2"]) {
          newErrors["state2"] = "This field is required";
          isValid = false;
        }
      } else if (formData["lengthOfStay"] === "yes") {
        formData["city2"] = undefined;
        formData["state2"] = undefined;
      }
    });

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = React.useCallback(async (prospectInfo: ProspectInfo) => {
    setIsLoading(true);
    setRetries((prev) => (prev <= 2 ? prev + 1 : prev));
    try {
      const response = await fetch("/api/background-check", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...prospectInfo }),
      });
      if (!response.ok)
        throw new Error("A network error occured. Please try again");
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResults(data);
    } catch (error) {
      console.error("Error performing background check:", error);
      setApiError(
        error instanceof Error ? error.message : "Something Unexpected Happened"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("retries", JSON.stringify(retries));
  }, [retries]);

  return (
    <div>
      <Header />
      <main
        className={`md:container mx-auto md:px-4 px-1 py-3 md:py-8 ${
          results ? "h-[500px]" : "max-h-[60vh]"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`bg-white rounded-lg md:shadow-md p-6 pt-0`}>
            <Form
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onValidateForm={validateForm}
              inputFields={inputFields}
              errors={errors}
              toggleErrors={toggleErrors}
              retries={retries}
            />
          </div>

          <div
            className={`bg-white rounded-lg p-1 md:p-6 md:shadow-md mt-[-10px] md:mt-0`}
          >
            <ResultsPanel
              results={results}
              isLoading={isLoading}
              error={apiError}
              retries={retries}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
