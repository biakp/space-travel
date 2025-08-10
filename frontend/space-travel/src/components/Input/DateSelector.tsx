import { type Dispatch, type SetStateAction } from "react";

interface DateSelectorProps {
  value: Date;
  onChange: Dispatch<SetStateAction<Date>>;
}

const DateSelector = ({ value, onChange }: DateSelectorProps) => {
  const formatDateForInput = (date: Date): string => {
    // Ensure we get a proper ISO date string for the input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Create date at noon to avoid timezone issues
      const newDate = new Date(dateValue + "T12:00:00.000Z");
      if (!isNaN(newDate.getTime())) {
        onChange(newDate);
      }
    }
  };

  return (
    <div className="group relative mt-4 sm:mt-6">
      <label className="mb-1.5 block text-xs font-light uppercase tracking-widest text-purple-300/80 sm:mb-2 sm:text-sm">
        Visited Date: <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
        <input
          type="date"
          value={formatDateForInput(value)}
          onChange={handleDateChange}
          className={`relative w-full rounded-2xl border bg-white/5 px-3 py-2.5 text-sm text-white backdrop-blur-md transition-all duration-300 focus:border-purple-400/30 focus:bg-white/10 focus:outline-none sm:px-4 sm:py-3 sm:text-base`}
        />
      </div>
    </div>
  );
};

export default DateSelector;
