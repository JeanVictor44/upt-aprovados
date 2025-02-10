"use client"

import {ReloadIcon} from '@radix-ui/react-icons';

import {Button} from '@/components/ui/button';

interface ButtonLoadingProps {
  children?: React.ReactNode;
}

export function ButtonLoading({children}: ButtonLoadingProps) {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
