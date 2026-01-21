import { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const today = new Date();
  const todayDate = today.getDate();

  const [markedDays, setMarkedDays] = useState([]);

  const toggleDay = (day) => {
    // prevent marking future days
    if (day > todayDate) return;

    setMarkedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const markToday = () => {
    toggleDay(todayDate);
  };

  return (
    <div className="calendar-container">
      <h3>Study Calendar 📅</h3>
      <button onClick={markToday}>Mark Today</button>

      <div className="calendar-grid">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const isToday = day === todayDate;

          return (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              className={`calendar-day
                ${markedDays.includes(day) ? "marked" : ""}
                ${isToday ? "today" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
