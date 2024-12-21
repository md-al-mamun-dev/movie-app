export function formatFinancialValue(value) {
    if (value < 1000) {
        return `$${value}`;
    }    
    const units = ["", "K", "M", "B", "T"]; // Thousand, Million, Billion, Trillion
    const unitIndex = Math.floor(Math.log10(value) / 3); // Determine the unit index
    const shortValue = (value / Math.pow(1000, unitIndex)).toFixed(1); // Convert value to short form
    return `$${shortValue}${units[unitIndex]}`;
}