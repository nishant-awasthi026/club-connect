import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Status = "active" | "paused" | "closed";

interface ManageRecruitmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  status: Status;
  onPause: () => void;
  onResume: () => void;
  onTerminate: () => void;
}

export default function ManageRecruitmentModal({ open, onOpenChange, title, status, onPause, onResume, onTerminate }: ManageRecruitmentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage — {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Current status</div>
            <Badge variant={status === "active" ? "secondary" : status === "paused" ? "outline" : "destructive"}>
              {status === "active" ? "Active" : status === "paused" ? "Paused" : "Closed"}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" disabled={status !== "active"} onClick={onPause}>Pause</Button>
            <Button variant="outline" disabled={status !== "paused"} onClick={onResume}>Resume</Button>
            <Button variant="destructive" onClick={onTerminate}>Terminate</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


