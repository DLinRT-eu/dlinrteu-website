import ExcelJS from 'exceljs';

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
  
  if (['email', 'e-mail', 'mail', 'email address', 'e-mail address', 'emailaddress'].includes(lower)) {
    return 'email';
  }
  if (['firstname', 'first name', 'first_name', 'vorname', 'name', 'given name', 'givenname'].includes(lower)) {
    return 'firstName';
  }
  if (['lastname', 'last name', 'last_name', 'nachname', 'surname', 'family name', 'familyname'].includes(lower)) {
    return 'lastName';
  }
  
  return lower;
};

const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const parseFile = async (file: File): Promise<ParseResult> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();

  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'csv') {
    // ExcelJS csv.read expects a stream; convert to ReadableStream for browser
    const text = new TextDecoder().decode(arrayBuffer);
    const rows = text.split(/\r?\n/).filter(r => r.trim());
    // Build a minimal worksheet manually
    const ws = workbook.addWorksheet('Sheet1');
    rows.forEach(row => {
      // Simple CSV split (handles basic cases)
      const cells = row.split(',').map(c => c.replace(/^"|"$/g, '').trim());
      ws.addRow(cells);
    });
  } else {
    await workbook.xlsx.load(arrayBuffer);
  }

  const worksheet = workbook.worksheets[0];
  if (!worksheet || worksheet.rowCount === 0) {
    throw new Error('The file appears to be empty');
  }

  // Build column map from header row
  const headerRow = worksheet.getRow(1);
  const columnMap: Record<number, string> = {};

  headerRow.eachCell((cell, colNumber) => {
    const normalized = normalizeColumnName(String(cell.value || ''));
    if (['email', 'firstName', 'lastName'].includes(normalized)) {
      columnMap[colNumber] = normalized;
    }
  });

  if (!Object.values(columnMap).includes('email')) {
    throw new Error('No email column found. Please ensure your file has an "Email" column.');
  }

  const subscribers: ImportedSubscriber[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    let email = '';
    let firstName = '';
    let lastName = '';

    for (const [colStr, mappedKey] of Object.entries(columnMap)) {
      const value = String(row.getCell(Number(colStr)).value || '').trim();
      if (mappedKey === 'email') email = value;
      if (mappedKey === 'firstName') firstName = value;
      if (mappedKey === 'lastName') lastName = value;
    }

    const isValidEmail = validateEmail(email);

    subscribers.push({
      email,
      firstName,
      lastName,
      isValid: isValidEmail && email.length > 0,
      error: !email ? 'Missing email' : !isValidEmail ? 'Invalid email format' : undefined
    });
  });

  const validRows = subscribers.filter(s => s.isValid).length;

  return {
    subscribers,
    totalRows: subscribers.length,
    validRows,
    invalidRows: subscribers.length - validRows
  };
};
