import { toast } from 'react-toastify';

export function copyTextToClip(str: string) {
  navigator.clipboard.writeText(str);
  toast('Copied!');
}
