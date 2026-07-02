import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export default function Container({ as = 'div', children, className }: ContainerProps) {
  const Tag = as as 'div';
  return <Tag className={cn('container', className)}>{children}</Tag>;
}
