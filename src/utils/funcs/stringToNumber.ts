export default function stringToNumber(value: string): number {
    if (value === "") {
        return 0;
    }

    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
        throw new Error("Value is not a number");
    }

    return parsedValue;
}
