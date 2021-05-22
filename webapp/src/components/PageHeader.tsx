type PageHeaderProps = {
  readonly title: string;
  readonly subtitle: string;
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-xl font-medium">{props.title}</h1>
        <p className="text-xs text-gray-500">{props.subtitle}</p>
      </div>
      <div className="ml-4">{props.children}</div>
    </div>
  );
};

export default PageHeader;
