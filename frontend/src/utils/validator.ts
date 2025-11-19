interface ValidationRule {
    required?: boolean;
    requiredMessage?: string;

    pattern?: RegExp;
    patternMessage?: string;

    minLength?: number;
    minLengthMessage?: string;

    custom?: (value: string) => string | null;
}



export interface ValidationSchema {
    [field: string]: ValidationRule;
}




export const validateForm = <T extends Record<string, any>>(formData: T, validationSchema: ValidationSchema) => {
    const errors: Record<string, string> = {};

    for (const key in validationSchema) {
        const value: string = (formData[key] ?? "").toString().trim();
        const rules = validationSchema[key];

        if (rules.required && !value) {
            errors[key] = rules.requiredMessage || `${key} is required`;
            continue;
        }

        if (rules.pattern && value && !rules.pattern.test(value)) {
            errors[key] = rules.patternMessage || `Invalid ${key}`;
            continue;
        }

        if (rules.minLength && value.length < rules.minLength) {
            errors[key] =
                rules.minLengthMessage ||
                `${key} must be at least ${rules.minLength} characters`;
            continue;
        }

        if (rules.custom) {
            const customMsg = rules.custom(value);
            if (customMsg) errors[key] = customMsg;
        }
    }

    return errors;
};
