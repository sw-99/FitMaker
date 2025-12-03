import * as React from "react";
import { cn } from "@/lib/cn";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-white text-black shadow-sm",
            className
        )}
        {...props}
    />
));

Card.displayName = "Card";

const CardHeader = ({
                        className,
                        ...props
                    }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("p-4 border-b bg-gray-50 rounded-t-lg", className)}
        {...props}
    />
);

const CardContent = ({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-4", className)} {...props} />
);

const CardFooter = ({
                        className,
                        ...props
                    }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("p-4 border-t bg-gray-50 rounded-b-lg", className)}
        {...props}
    />
);

export { Card, CardHeader, CardContent, CardFooter };
