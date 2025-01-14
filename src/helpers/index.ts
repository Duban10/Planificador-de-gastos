export function formatCurrency(quantity : number){
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
    }).format(quantity)
}

export function formatDate(dateStr : string) : string {
    const dateObj = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}