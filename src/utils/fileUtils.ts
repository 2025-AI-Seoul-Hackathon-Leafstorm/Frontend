export const extractTextFromPDF = async (): Promise<string> => {
    // Actual implementation to be added after API integration
    return 'Example text extracted from PDF.';
  };

  // Function to check valid file types
  export const isValidFileType = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };

  // Function to upload file to AI tutor API
  export const uploadFileToAITutor = async (file: File, folderName: string): Promise<Response> => {
    try {
      // Convert file to Base64
      const base64Content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64Content = base64String.split(',')[1];
          resolve(base64Content);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Prepare the request payload
      const payload = {
        folder_name: folderName,
        filename: file.name,
        file_content: base64Content
      };

      // Send the request to our proxy API route
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error: Error | unknown) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to upload file: ${errorMessage}`);
    }
  };
