export * from './images';
export const convertByteUnit = (bytes: number, digits?: number): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let unitIndex = 0;
    while (bytes >= 1024 && unitIndex < units.length - 1) {
        bytes /= 1024;
        unitIndex++;
    }
    return `${bytes.toFixed(digits || 2)} ${units[unitIndex]}`;
};
