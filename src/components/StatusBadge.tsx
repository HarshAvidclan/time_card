import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          variant: 'default' as const,
          icon: CheckCircle,
          text: 'Approved',
          className: 'bg-success text-success-foreground hover:bg-success/90',
        };
      case 'rejected':
        return {
          variant: 'destructive' as const,
          icon: XCircle,
          text: 'Rejected',
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        };
      case 'pending':
      default:
        return {
          variant: 'secondary' as const,
          icon: Clock,
          text: 'Pending',
          className: 'bg-warning text-warning-foreground hover:bg-warning/90',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={`inline-flex items-center space-x-1 ${config.className} ${className}`}
    >
      <Icon className="h-3 w-3" />
      <span>{config.text}</span>
    </Badge>
  );
};

export default StatusBadge;