import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const icons = {
  Gmail: { icon: faEnvelope, color: 'text-[#EA4335]' },
  LinkedIn: { icon: faLinkedin, color: 'text-[#0A66C2]' },
  GitHub: { icon: faGithub, color: 'text-slate-100' },
};

export default function BrandIcon({ name, size = 16, className = '' }) {
  const { icon, color } = icons[name];

  return (
    <FontAwesomeIcon
      icon={icon}
      aria-hidden="true"
      className={`${color} ${className}`}
      style={{ fontSize: size }}
    />
  );
}
