import axios from 'axios';

const API_BASE_URL = 'https://3438ywb1da.execute-api.us-east-1.amazonaws.com';

export interface Folder {
  name: string;
  documentCount: number;
}

export interface FoldersResponse {
  folders: Folder[];
  count: number;
}

/**
 * Creates a new folder with the given name
 * @param name The name of the folder to create
 * @returns The created folder
 */
export const createFolder = async (name: string): Promise<Folder> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/folders`, { name });
    return response.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

/**
 * Fetches all folders
 * @returns The folders response
 */
export const getFolders = async (): Promise<FoldersResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/folders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }
}; 