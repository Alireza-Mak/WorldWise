export const formatDate = (date: string): string =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export function formatDateInput(date: Date) {
    return new Date(date.toString().split("GMT")[0] + " UTC")
        .toISOString()
        .split(".")[0];
}
