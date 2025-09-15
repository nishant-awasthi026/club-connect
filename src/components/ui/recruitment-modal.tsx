import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export type QuestionType = "text" | "textarea" | "radio" | "checkbox";

export interface RecruitmentQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

export interface RecruitmentConfig {
  title: string;
  deadline: string; // ISO date
  posts: string[];
  questions: RecruitmentQuestion[];
  whatsappLink?: string;
}

interface RecruitmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: (config: RecruitmentConfig) => void;
}

const DEFAULT_POSTS = [
  "Public Relations (PR) & Outreach",
  "Marketing & Communications",
  "Tech & Development",
  "Management & Operations",
  "Content & Creative Writing",
  "Design & Art",
  "Finance & Sponsorship",
  "Human Resources (HR)",
  "Community Engagement",
  "Research & Development",
  "Sports & Wellness",
  "Cultural & Arts",
  "Environment & Sustainability",
  "Leadership & Strategy",
  "Data & Analytics",
  "Training & Skill Development",
];

export function RecruitmentModal({ open, onOpenChange, onPublish }: RecruitmentModalProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [questions, setQuestions] = useState<RecruitmentQuestion[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const canPublish = useMemo(() => {
    return title.trim().length > 0 && deadline.trim().length > 0 && selectedPosts.length > 0;
  }, [title, deadline, selectedPosts]);

  const addQuestion = () => {
    const newQ: RecruitmentQuestion = {
      id: crypto.randomUUID(),
      prompt: "",
      type: "text",
      required: false,
      options: [],
    };
    setQuestions(prev => [...prev, newQ]);
  };

  const updateQuestion = (id: string, updates: Partial<RecruitmentQuestion>) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, ...updates, options: updates.type && (updates.type === "radio" || updates.type === "checkbox") ? (q.options ?? []) : (updates.type ? [] : updates.options ?? q.options) } : q)));
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const addOptionTo = (id: string) => {
    if (!newOption.trim()) return;
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, options: [...(q.options ?? []), newOption.trim()] } : q)));
    setNewOption("");
  };

  const removeOptionFrom = (id: string, option: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, options: (q.options ?? []).filter(o => o !== option) } : q)));
  };

  const togglePost = (post: string, checked: boolean | string) => {
    const isChecked = Boolean(checked);
    setSelectedPosts(prev => (isChecked ? [...prev, post] : prev.filter(p => p !== post)));
  };

  const reset = () => {
    setTitle("");
    setDeadline("");
    setSelectedPosts([]);
    setQuestions([]);
    setNewOption("");
    setWhatsappLink("");
  };

  const handlePublish = () => {
    if (!canPublish) return;
    onPublish({ title, deadline, posts: selectedPosts, questions, whatsappLink: whatsappLink.trim() || undefined });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>New Recruitment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rec-title">Title</Label>
              <Input id="rec-title" placeholder="e.g., Fall 2025 Intake" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rec-deadline">Application Deadline</Label>
              <Input id="rec-deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Open Posts</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {DEFAULT_POSTS.map(post => (
                <label key={post} className="flex items-center gap-3 rounded-md border p-3">
                  <Checkbox checked={selectedPosts.includes(post)} onCheckedChange={checked => togglePost(post, checked as boolean)} />
                  <span className="text-sm">{post}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rec-whatsapp">WhatsApp Group Invite Link (optional)</Label>
            <Input
              id="rec-whatsapp"
              placeholder="https://chat.whatsapp.com/your-invite"
              value={whatsappLink}
              onChange={e => setWhatsappLink(e.target.value)}
              inputMode="url"
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Custom Questions</Label>
              <Button size="sm" onClick={addQuestion}>Add question</Button>
            </div>

            {questions.length === 0 && (
              <p className="text-sm text-muted-foreground">No questions added yet.</p>
            )}

            <div className="space-y-6">
              {questions.map(q => (
                <div key={q.id} className="rounded-md border p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Prompt</Label>
                      <Textarea value={q.prompt} onChange={e => updateQuestion(q.id, { prompt: e.target.value })} placeholder="Ask something relevant to this recruitment..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={q.type} onValueChange={(val: QuestionType) => updateQuestion(q.id, { type: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Short text</SelectItem>
                          <SelectItem value="textarea">Long text</SelectItem>
                          <SelectItem value="radio">Single choice</SelectItem>
                          <SelectItem value="checkbox">Multiple choice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={q.required} onCheckedChange={c => updateQuestion(q.id, { required: Boolean(c) })} />
                    <span className="text-sm">Required</span>
                    <Button variant="outline" size="sm" className="ml-auto" onClick={() => removeQuestion(q.id)}>Remove</Button>
                  </div>

                  {(q.type === "radio" || q.type === "checkbox") && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Add option" value={newOption} onChange={e => setNewOption(e.target.value)} onKeyDown={e => {
                          if (e.key === "Enter") { e.preventDefault(); addOptionTo(q.id); }
                        }} />
                        <Button type="button" variant="secondary" onClick={() => addOptionTo(q.id)}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(q.options ?? []).map(opt => (
                          <span key={opt} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                            {opt}
                            <button className="text-muted-foreground hover:text-foreground" onClick={() => removeOptionFrom(q.id, opt)} type="button">×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!canPublish} onClick={handlePublish}>Publish</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RecruitmentModal;


