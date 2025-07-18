import * as React from "react"
import { cn } from "../../lib/utils"

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = "Select"

const SelectOption = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <option
      className={cn("", className)}
      ref={ref}
      {...props}
    >
      {children}
    </option>
  )
})
SelectOption.displayName = "SelectOption"

export { Select, SelectOption } 