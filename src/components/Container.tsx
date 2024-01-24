import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
};
const Container = ({ children }: TContainerProps) => {
  return (
    <div className="min-h-screen h-full w-full max-w-6xl mx-auto">
      {children}
    </div>
  );
};

export default Container;
