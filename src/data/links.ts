/** All external links — single source of truth for Contact, Footer, and anywhere else.
    Mirrors https://linktr.ee/fakhrulazim */

export interface ExternalLink {
  id: string;
  label: string;
  value: string;   // short display text
  href: string;
  icon: 'file' | 'linkedin' | 'mail' | 'mail-edu' | 'whatsapp' | 'github' | 'link';
}

export const externalLinks: ExternalLink[] = [
  {
    id: 'resume',
    label: 'Résumé',
    value: 'Google Drive folder',
    href: 'https://drive.google.com/drive/folders/1TlduRnyV_1Az-YQkXaiKF-7c_lgVwuI0?usp=sharing',
    icon: 'file',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'in/fakhrulazim',
    href: 'https://www.linkedin.com/in/fakhrulazim',
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'Email (personal)',
    value: 'fakhrulazim.am@gmail.com',
    href: 'mailto:fakhrulazim.am@gmail.com',
    icon: 'mail',
  },
  {
    id: 'email-utp',
    label: 'Email (UTP)',
    value: 'fakhrul_22012087@utp.edu.my',
    href: 'mailto:fakhrul_22012087@utp.edu.my',
    icon: 'mail-edu',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+60 19-712 5300',
    href: 'https://wa.me/60197125300',
    icon: 'whatsapp',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Azimlearning',
    href: 'https://github.com/Azimlearning',
    icon: 'github',
  },
  {
    id: 'linktree',
    label: 'Linktree',
    value: 'linktr.ee/fakhrulazim',
    href: 'https://linktr.ee/fakhrulazim',
    icon: 'link',
  },
];
