const ContactLink = ({
  href,
  icon,
  content,
}: {
  href: string;
  icon: React.ReactNode;
  content: string;
}) => {
  return (
    <a href={href}>
      <span className="flex items-center gap-1">
        {icon}
        <span className="text-black font-bold text-[14px] leading-4">
          {content}
        </span>
      </span>
    </a>
  );
};

export default ContactLink;
