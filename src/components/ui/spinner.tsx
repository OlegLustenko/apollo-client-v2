import { cn } from 'lib/utils';

export const LoadingSpinner = ({ className }: { className?: string } = {}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="h-1.5 w-full overflow-hidden bg-white">
        <div className="animate-progress origin-left-right h-full w-full bg-blue-600"></div>
      </div>
    </div>
  );
};
