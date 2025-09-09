"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return (<TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />);
}

function Tooltip({
  ...props
}) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-emerald-500 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 font-semibold text-sm text-balance text-white",
          className
        )}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow
          className="bg-emerald-500 fill-emerald-500 z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
const StatusTag = ({ status }) => {
  let text = '';
  let classes = '';

  switch (status) {
    case 'Open':
      text = 'Open →';
      classes = 'bg-green-50 border-green-200 text-green-700';
      break;
    case 'Closed':
      text = 'Closed';
      classes = 'bg-red-50 border-red-200 text-red-700';
      break;
    case 'Yet to Open':
      text = 'Not open yet';
      classes = 'bg-gray-100 border-gray-200 text-gray-700';
      break;
    default:
      return null;
  }

  return (
    <div className={`inline-flex items-center border font-semibold text-xs px-2 py-1 rounded-sm ${classes}`}>
      {text}
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider ,StatusTag }
