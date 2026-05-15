export const formatDate = (date: string): string =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char: string, index: number) => 127397 + char.charCodeAt(index));
    return String.fromCodePoint(...codePoints);
}
