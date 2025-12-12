import * as XLSX from 'xlsx';

export interface ImportedSubscriber {
  email: string;
  firstName: string;
  lastName: string;
  isValid: boolean;
  error?: string;
}

export interface ParseResult {
  subscribers: ImportedSubscriber[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeColumnName = (name: string): string => {
  const lower = name.toLowerCase().trim();
  
  // Email variations
  if (['email', 'e-mail', 'mail', 'email address', 'e-mail address', 'emailaddress'].includes(lower)) {
    return 'email';
  }
  
  // First name variations
  if (['firstname', 'first name', 'first_name', 'vorname', 'name', 'given name', 'givenname'].includes(lower)) {
    return 'firstName';
  }
  
  // Last name variations
  if (['lastname', 'last name', 'last_name', 'nachname', 'surname', 'family name', 'familyname'].includes(lower)) {
    return 'lastName';
  }
  
  return lower;
};

const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const parseFile = async (file: File): Promise<ParseResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
        
        if (jsonData.length === 0) {
          reject(new Error('The file appears to be empty'));
          return;
        }
        
        // Get column mappings from first row
        const firstRow = jsonData[0];
        const columnMap: Record<string, string> = {};
        
        Object.keys(firstRow).forEach(key => {
          const normalized = normalizeColumnName(key);
          if (['email', 'firstName', 'lastName'].includes(normalized)) {
            columnMap[key] = normalized;
          }
        });
        
        if (!Object.values(columnMap).includes('email')) {
          reject(new Error('No email column found. Please ensure your file has an "Email" column.'));
          return;
        }
        
        const subscribers: ImportedSubscriber[] = jsonData.map(row => {
          let email = '';
          let firstName = '';
          let lastName = '';
          
          Object.entries(columnMap).forEach(([originalKey, mappedKey]) => {
            const value = String(row[originalKey] || '').trim();
            if (mappedKey === 'email') email = value;
            if (mappedKey === 'firstName') firstName = value;
            if (mappedKey === 'lastName') lastName = value;
          });
          
          const isValidEmail = validateEmail(email);
          
          return {
            email,
            firstName,
            lastName,
            isValid: isValidEmail && email.length > 0,
            error: !email ? 'Missing email' : !isValidEmail ? 'Invalid email format' : undefined
          };
        });
        
        const validRows = subscribers.filter(s => s.isValid).length;
        
        resolve({
          subscribers,
          totalRows: subscribers.length,
          validRows,
          invalidRows: subscribers.length - validRows
        });
      } catch (error) {
        reject(new Error('Failed to parse file. Please ensure it is a valid CSV or Excel file.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsBinaryString(file);
  });
};
