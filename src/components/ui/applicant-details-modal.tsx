import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ApplicantDetails {
  id: number | string;
  name: string;
  position: string;
  course: string;
  section: string;
  registration: string;
  email?: string;
  phone?: string;
  answers?: { question: string; answer: string | string[] }[];
}

interface ApplicantDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details?: ApplicantDetails | null;
}

export default function ApplicantDetailsModal({ open, onOpenChange, details }: ApplicantDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
        </DialogHeader>

        {!details ? (
          <p className="text-sm text-muted-foreground">No details available.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <div className="text-xl font-semibold">{details.name}</div>
              <div className="text-sm text-muted-foreground">Applied for {details.position}</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Course:</span> {details.course}</div>
              <div><span className="text-muted-foreground">Section:</span> {details.section}</div>
              <div><span className="text-muted-foreground">Registration:</span> {details.registration}</div>
              {details.email && <div><span className="text-muted-foreground">Email:</span> {details.email}</div>}
              {details.phone && <div><span className="text-muted-foreground">Phone:</span> {details.phone}</div>}
            </div>

            {details.answers && details.answers.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium">Application Answers</div>
                <div className="space-y-3">
                  {details.answers.map((a, idx) => (
                    <div key={idx} className="rounded-md border p-3">
                      <div className="text-sm font-medium">{a.question}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {Array.isArray(a.answer) ? a.answer.join(", ") : a.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


