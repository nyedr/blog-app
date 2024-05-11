import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const containerVariants = cva("max-w-[1080px] mx-auto w-full py-3", {
  variants: {
    layout: {
      grid: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
      grid2: "grid grid-cols-1 gap-4 md:grid-cols-2",
      grid4: "grid grid-cols-1 gap-4 md:grid-cols-4",
      responsive: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
      flex: "flex flex-col items-center gap-4",
    },
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, layout, ...props }, ref) => {
    return (
      <div
        className={containerVariants({ layout, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export default Container;
