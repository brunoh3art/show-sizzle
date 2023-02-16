import { ContentDTO } from './content';
import { VideoDTOS } from './video';

export class MovieDTO extends ContentDTO {
  video: VideoDTOS;
}
