import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

export interface ApplicantItem {
  id: number | string;
  name: string;
  course: string;
  section: string;
  registration: string;
}

interface RecruitmentApplicationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recruitmentTitle: string;
  applicants: ApplicantItem[];
  recruitmentId?: number;
}

export default function RecruitmentApplicationsModal({ open, onOpenChange, recruitmentTitle, applicants }: RecruitmentApplicationsModalProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return applicants.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.course.toLowerCase().includes(q) ||
      a.section.toLowerCase().includes(q) ||
      a.registration.toLowerCase().includes(q)
    );
  }, [applicants, query]);

  const downloadCsv = () => {
    const headers = ["Name", "Course", "Section", "Registration"];
    const rows = filtered.map(a => [a.name, a.course, a.section, a.registration]);
    const csv = [headers, ...rows]
      .map(row => row.map(cell => {
        const text = String(cell ?? "");
        if (/[",\n]/.test(text)) {
          return '"' + text.replace(/"/g, '""') + '"';
        }
        return text;
      }).join(","))
      .join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeTitle = recruitmentTitle.replace(/[^a-z0-9-_]+/gi, "_").toLowerCase();
    a.download = `${safeTitle || "recruitment"}_applicants.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Applicants — {recruitmentTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input placeholder="Search name, course, section, registration" value={query} onChange={e => setQuery(e.target.value)} />
            <Button variant="outline" onClick={downloadCsv} disabled={filtered.length === 0}>Download CSV</Button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto divide-y">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4">No applicants found.</p>
            ) : (
              filtered.map(a => (
                <div key={a.id} className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-muted-foreground">{a.course} · {a.section} · {a.registration}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


