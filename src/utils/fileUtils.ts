// PDF 파일에서 텍스트 추출 함수
export const extractTextFromPDF = async (file: File): Promise<string> => {
    // 실제 구현은 API 연동 후 작성
    return 'PDF에서 추출된 텍스트 예시입니다.';
  };
  
  // 파일 유형 확인 함수
  export const isValidFileType = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };