export default function LinkButton({ href = '', children, className = '', disabledLabel = 'Not added yet', ...props }) {
  const isExternal = /^https?:\/\//i.test(href);

  if (!href) {
    return (
      <span
        className={`btn-ghost cursor-not-allowed text-xs opacity-50 ${className}`}
        aria-disabled="true"
        title={disabledLabel}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
