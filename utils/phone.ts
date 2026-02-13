// Formatage automatique
export function formatCanadianPhone(value: string): string {
    if (!value) return "+1 ";

    // Supprime tout sauf chiffres
    const digits = value.replace(/\D/g, "");

    // Supprime le 1 initial si tapé
    const cleaned = digits.startsWith("1") ? digits.slice(1) : digits;

    // Limite à 10 chiffres
    const limited = cleaned.slice(0, 10);

    const area = limited.slice(0, 3);
    const prefix = limited.slice(3, 6);
    const line = limited.slice(6, 10);

    let formatted = "+1 ";

    if (area) {
        formatted += `(${area}`;
    }

    if (area.length === 3) {
        formatted += ")";
    }

    if (prefix) {
        formatted += ` ${prefix}`;
    }

    if (line) {
        formatted += `-${line}`;
    }

    return formatted;
}



// Validation stricte canadienne
export function isValidCanadianPhone(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11 || (digits.length === 11 && digits.startsWith("1"));
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
}

export const allowOnlyNumbers = (event: KeyboardEvent) => {
    const char = event.key;

    // Autorise seulement chiffres + touches spéciales
    if (!/[0-9]/.test(char) && char.length === 1) {
        event.preventDefault();
    }
};

export const formatDate = (date: string | null) => {
    const dateToSplit = [date];
    const split = dateToSplit[0]?.split("-");
    const day = split?.[2]?.split("T")[0];
    const month = split?.[1];
    const year = split?.[0];

    return date ? `${day}-${month}-${year}` : null;
}

