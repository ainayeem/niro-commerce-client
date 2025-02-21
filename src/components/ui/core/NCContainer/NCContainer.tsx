import { ReactNode } from "react";

interface NMContainerProps {
  children: ReactNode;
  className?: string;
}

const NCContainer = ({ children, className = "" }: NMContainerProps) => {
  return <div className={`container mx-auto px-5 ${className}`}>{children}</div>;
};

export default NCContainer;
