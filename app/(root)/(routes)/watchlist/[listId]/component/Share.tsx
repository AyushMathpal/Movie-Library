"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from 'next/navigation';
import { Forward } from 'lucide-react';
const Share = () => {
    const [copied, setCopied] = useState(false);
    const pathname=usePathname()
    const handleClick = () => {
        setCopied(true);
        navigator.clipboard.writeText(
          `${window.location.href}`
        );
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      };
  return (
    <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="sm">
        Share<Forward className='w-5 mb-1'/>
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div className="p-2">
        <p>Share this list with your friends</p>
        <div className="flex justify-between gap-x-2">
          <Input
            type="text"
            className="w-3/4 p-2 border border-primary/10"
            id="copyinput"
            value={`${window.location.href}`}
          />
          <Button onClick={handleClick} size="sm">{copied ? 'Copied!' : 'Copy'}</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
  )
}

export default Share