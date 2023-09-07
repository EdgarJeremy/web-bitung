import { v4 as uuidv4 } from 'uuid';

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class UploadsService {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }
  async create(data, params) {
    const file = params.file;
    const storagePath = path.resolve('./storage/');
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];

    const savedFile = `${uuidv4()}.${ext}`;

    fs.writeFileSync(`${storagePath}/${savedFile}`, file.buffer, 'binary');

    return savedFile;
  }
}

export const getOptions = (app) => {
  return { app }
}
