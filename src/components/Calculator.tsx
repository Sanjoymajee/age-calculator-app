import { useState } from "react";
import "../styles/Calculator.css";

interface Age {
  day: number;
  month: number;
  year: number;
}

export default function Calculator() {
  let isError = false;
  const changeAge = () => {
    setAge({ day: -1, month: -1, year: -1 });
    setDateError("");
    setMonthError("");
    setYearError("");
    setIsDateError(false);
    setIsMonthError(false);
    setIsYearError(false);
    const dayElement = document.getElementById("day") as HTMLInputElement;
    const monthElement = document.getElementById("month") as HTMLInputElement;
    const yearElement = document.getElementById("year") as HTMLInputElement;
    if (dayElement.value === "") {
      setDateError("This field is required");
      setIsDateError(true);
    }
    if (monthElement.value === "") {
      setMonthError("This field is required");
      setIsMonthError(true);
    }
    if (yearElement.value === "") {
      setYearError("This field is required");
      setIsYearError(true);
    }
    const day = parseInt(dayElement.value);
    const month = parseInt(monthElement.value);
    const year = parseInt(yearElement.value);
    const birthdate = new Date(year, month - 1, day);
    if (
      birthdate.getDate() !== day ||
      birthdate.getMonth() !== month - 1 ||
      birthdate.getFullYear() !== year
    ) {
      isError = true;
      setDateError("Must be a valid day");
      setIsDateError(true);
    }
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - birthdate.getTime();
    if (timeDiff < 0) {
      isError = true;
      setYearError("Must be in the past");
      setIsYearError(true);
    }
    if (month > 12 || month < 1) {
      isError = true;
      setMonthError("Must be a valid month");
      setIsMonthError(true);
    }
    if(day > 31 || day < 1) {
      isError = true;
      setDateError("Must be a valid day");
      setIsDateError(true);
    }
    if (isError) {
      return;
    }
    const remainingYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    const remainingMonths = Math.floor(
      (timeDiff / (1000 * 3600 * 24 * 365) - remainingYears) * 12
    );
    const remainingDays = Math.floor(
      ((timeDiff / (1000 * 3600 * 24 * 365) - remainingYears) * 12 -
        remainingMonths) *
        30
    );
    const newAge: Age = {
      day: remainingDays,
      month: remainingMonths,
      year: remainingYears,
    };
    setAge(newAge);
  };

  const disableErrors = () => {
    setDateError("");
    setMonthError("");
    setYearError("");
    setIsDateError(false);
    setIsMonthError(false);
    setIsYearError(false);
  };
  const [age, setAge] = useState<Age>({ day: -1, month: -1, year: -1 });
  const [dateError, setDateError] = useState("");
  const [isDateError, setIsDateError] = useState(false);
  const [monthError, setMonthError] = useState("");
  const [isMonthError, setIsMonthError] = useState(false);
  const [yearError, setYearError] = useState("");
  const [isYearError, setIsYearError] = useState(false);
  return (
    <div className="calculator">
      <div className="__card">
        <div className="__inputs">
          <div className="__inputs_container">
            <label htmlFor="day">
              <p className={isDateError ? "error_label" : ""}>Day</p>
            </label>
            <input
              type="number"
              inputMode="numeric"
              name="day"
              id="day"
              min={1}
              max={31}
              placeholder="DD"
              className={isDateError ? "error_input" : ""}
              onChange={() => disableErrors()}
            />
            <div className="__error">{dateError}</div>
          </div>
          <div className="__inputs_container">
            <label htmlFor="month">
              <p className={isMonthError ? "error_label" : ""}>Month</p>
            </label>
            <input
              type="number"
              inputMode="numeric"
              name="month"
              id="month"
              min={1}
              max={12}
              placeholder="MM"
              className={isMonthError ? "error_input" : ""}
              onChange={() => disableErrors()}
            />
            <div className="__error">{monthError}</div>
          </div>
          <div className="__inputs_container">
            <label htmlFor="year">
              <p className={isYearError ? "error_label" : ""}>Year</p>
            </label>
            <input
              type="number"
              inputMode="numeric"
              name="year"
              id="year"
              min={1}
              placeholder="YYYY"
              className={isYearError ? "error_input" : ""}
              onChange={() => disableErrors()}
            />
            <div className="__error">{yearError}</div>
          </div>
        </div>
        <div className="__button">
          <button onMouseUp={() => changeAge()}>
            <img src="/icon-arrow.svg" alt="arrow" />
          </button>
        </div>
        <div className="__outputs">
          <p>
            <span>{age.year === -1 ? "--" : age.year}</span> Years
          </p>
          <p>
            <span>{age.month === -1 ? "--" : age.month}</span> Months
          </p>
          <p>
            <span>{age.day === -1 ? "--" : age.day}</span> Days
          </p>
        </div>
      </div>
    </div>
  );
}
