"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils";

const switchVariantRoot = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-primary",
        secondary: "data-[state=checked]:bg-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const switchVariantThumb = cva(
  "pointer-events-none block h-5 w-5 flex justify-center items-center rounded-full bg-background shadow-lg ring-0 transition-transform ltr:data-[state=checked]:translate-x-5 ltr:data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:-translate-x-5 rtl:data-[state=unchecked]:-translate-x-0",
  {
    variants: {
      variant: {
        default: "",
        secondary: "data-[state=checked]:bg-[#313A56] data-[state=checked]:text-[#fff] data-[state=unchecked]:text-[#313A56] data-[state=unchecked]:border-solid data-[state=unchecked]:border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, VariantProps<typeof switchVariantRoot> {
  icon?: React.ReactNode;
}
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, icon, variant, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariantRoot({variant}))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={`${cn(switchVariantThumb({variant}))}`}
    >
      {icon ? icon : null}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
