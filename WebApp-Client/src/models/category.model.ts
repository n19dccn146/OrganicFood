import { MONGOOSE_MODEL } from './mongoose.model';

export interface CATEGORY_MODEL extends MONGOOSE_MODEL {
  name: string;
  image_url: string;
  icon_url: string;
  products_length: number;
  subCate?: Array<CATEGORY_MODEL>;
}
