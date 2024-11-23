
export function toCamelCase(item: string) {
    return item[0].toLocaleUpperCase() + item.substring(1, item.length)
}