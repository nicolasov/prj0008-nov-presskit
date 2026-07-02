import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export default function Container({ as: Tag = 'div', children, className }: ContainerProps) {
  return <Tag className={cn('container', className)}>{children}</Tag>;
}
