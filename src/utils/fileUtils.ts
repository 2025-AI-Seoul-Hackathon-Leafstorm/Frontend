export const extractTextFromPDF = async (file: File): Promise<string> => {
    // Actual implementation to be added after API integration
    return 'Example text extracted from PDF.';
  };

  // Function to check valid file types
  export const isValidFileType = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };