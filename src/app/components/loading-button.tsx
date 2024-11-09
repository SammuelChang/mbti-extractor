import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
}

const LoadingButton = ({
  type = "button",
  disabled = false,
  isLoading,
  loadingText,
  children,
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      variant="default"
      className="w-48 mt-8 relative"
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
