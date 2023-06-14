import { useState } from "react";
import "../styles/Calculator.css";

interface Age {
  day: number;
  month: number;
  year: number;
}

export default function Calculator() {
  const changeAge = () => {
    setError(false);
    setDateError("");
    setMonthError("");
    setYearError("");
    const dayElement = document.getElementById("day") as HTMLInputElement;
    const monthElement = document.getElementById("month") as HTMLInputElement;
    const yearElement = document.getElementById("year") as HTMLInputElement;
    if (
      dayElement.value === "" ||
      monthElement.value === "" ||
      yearElement.value === ""
    ) {
      setError(true);
      setDateError("This field is required");
      setMonthError("This field is required");
      setYearError("This field is required");
      return;
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
      setError(true);
      setDateError("Must be a valid date");
      return;
    }
    const currentDate = new Date();
    const timeDiff = (currentDate.getTime() - birthdate.getTime());
    if(timeDiff < 0) {
      setError(true);
      setDateError("Must be a valid date");
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
    const age: Age = {
      day: remainingDays,
      month: remainingMonths,
      year: remainingYears,
    };
    setAge(age);
  };

  const disableErrors = () => {
    setError(false);
    setDateError("");
    setMonthError("");
    setYearError("");
  }
  const [age, setAge] = useState<Age>({ day: -1, month: -1, year: -1 });
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  console.log(error);
  return (
    <div className="calculator">
      <div className="__card">
        <div className="__inputs">
          <div className="__inputs_container">
            <label htmlFor="day"><p className={error ? "error_label" : ""}>Day</p></label>
            <input
              type="number"
              inputMode="numeric"
              name="day"
              id="day"
              min={1}
              max={31}
              placeholder="DD"
              className={error ? "error_input" : ""}
              onChange={() => disableErrors()}
            />
            <div className="__error">{dateError}</div>
          </div>
          <div className="__inputs_container">
            <label htmlFor="month"><p className={error ? "error_label" : ""}>Month</p></label>
            <input
              type="number"
              inputMode="numeric"
              name="month"
              id="month"
              min={1}
              max={12}
              placeholder="MM"
              className={error ? "error_input" : ""}
              onChange={() => disableErrors()}
            />
            <div className="__error">{monthError}</div>
          </div>
          <div className="__inputs_container">
            <label htmlFor="year"><p className={error ? "error_label" : ""}>Year</p></label>
            <input
              type="number"
              inputMode="numeric"
              name="year"
              id="year"
              min={1}
              placeholder="YYYY"
              className={error ? "error_input" : ""}
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
