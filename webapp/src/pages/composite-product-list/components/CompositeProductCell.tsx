import React from "react";

interface CompositeProductCellProps {
  readonly id: string;
  readonly name: string;
  readonly directComponentCount: number;
};

const CompositeProductCell: React.FC<CompositeProductCellProps> = (props) => {
  return (
    <div className="block hover:bg-gray-50 px-4 py-4 sm:px-6">
      <div className="text-sm font-medium text-indigo-600 truncate">
        {props.name}
      </div>
      <div className="mt-1.5 flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <div className="mr-6 flex items-center text-xs text-gray-500">
          {
            props.directComponentCount > 0
              ? `${props.directComponentCount} direct components`
              : 'No components'
          }
        </div>
      </div>
    </div>
  );
}

export default CompositeProductCell;
