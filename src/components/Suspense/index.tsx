import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
  isLoading: boolean;
}

function Suspense({ children, fallback, isLoading }: Props) {
  return (
    <>
      {!isLoading && children}
      <div style={{ visibility: isLoading ? "visible" : "hidden" }}>
        {fallback}
      </div>
    </>
  );
}

export default Suspense;
