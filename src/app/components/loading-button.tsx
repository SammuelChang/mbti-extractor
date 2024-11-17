import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading: boolean;
  loadingText: string;
  className?: string;
  children: React.ReactNode;
}

const LoadingButton = ({
  type = "button",
  disabled = false,
  isLoading,
  loadingText,
  className,
  children,
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      variant="default"
      className={cn("w-48 relative", className)}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
