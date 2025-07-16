// useValidators.ts
export function useValidators() {

  const isOnlyLetters = (message = "Only letters and spaces are allowed.") => (value: string) => {
    const regex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
    return regex.test(value) || message;
  };

  const isValidPhone = (message = "Only Numbers are allowed.") => (value: string) => {
    const regex = /^[0-9۰-۹]*$/
    return regex.test(value) || message;
  };

  const isRequired = (message = "This field is required.") => (value: string) => {
    return !!value || message;
  };

  const isValidFile = (maxSizeMB = 2,allowedTypes: string[] = ["application/pdf", "image/jpeg", "image/png"], message?: string  ) => (files: FileList) => {
    const file = files?.[0];
    if (!file) return message || "No file selected.";

    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File must be smaller than ${maxSizeMB} MB.`;
    }

    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed: ${allowedTypes.join(", ")}`;
    }

    return true;
  };


  return {
    isOnlyLetters,
    isValidPhone,
    isRequired,
    isValidFile
  };
}
