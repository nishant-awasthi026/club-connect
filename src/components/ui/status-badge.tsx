import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, AlertCircle, Calendar } from "lucide-react";

export type ApplicationStatus = 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-muted text-muted-foreground border-muted-foreground/20',
  },
  reviewing: {
    label: 'Under Review',
    icon: AlertCircle,
    className: 'bg-warning/10 text-warning border-warning/30',
  },
  interview: {
    label: 'Interview Scheduled',
    icon: Calendar,
    className: 'bg-primary/10 text-primary border-primary/30',
  },
  accepted: {
    label: 'Accepted',
    icon: CheckCircle,
    className: 'bg-success/10 text-success border-success/30',
  },
  rejected: {
    label: 'Not Selected',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/30',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors',
      config.className,
      className
    )}>
      <Icon className="h-3 w-3 mr-1.5" />
      {config.label}
    </div>
  );
}