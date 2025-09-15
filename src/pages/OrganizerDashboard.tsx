import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Calendar, BarChart3, Bell } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import RecruitmentModal, { RecruitmentConfig } from "@/components/ui/recruitment-modal";
import RecruitmentApplicationsModal, { ApplicantItem } from "@/components/ui/recruitment-applications-modal";
import ManageRecruitmentModal from "@/components/ui/manage-recruitment-modal";
import ApplicantDetailsModal, { ApplicantDetails } from "@/components/ui/applicant-details-modal";
import { api } from "@/lib/api";

// Mock data for demonstration
const recruitments = [
  {
    id: 1,
    position: "Vice President",
    applications: 12,
    deadline: "2024-02-15",
    status: "active",
  },
  {
    id: 2,
    position: "Marketing Coordinator",
    applications: 8,
    deadline: "2024-02-10",
    status: "active",
  },
  {
    id: 3,
    position: "Event Manager",
    applications: 15,
    deadline: "2024-01-30",
    status: "closed",
  },
];

const recentApplications = [
  {
    id: 1,
    applicantName: "Sarah Johnson",
    position: "Vice President",
    appliedDate: "2024-01-18",
    status: "new",
  },
  {
    id: 2,
    applicantName: "Michael Chen",
    position: "Marketing Coordinator",
    appliedDate: "2024-01-17",
    status: "reviewed",
  },
  {
    id: 3,
    applicantName: "Emma Davis",
    position: "Vice President",
    appliedDate: "2024-01-16",
    status: "interview",
  },
];

export default function OrganizerDashboard() {
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
  const [dynamicRecruitments, setDynamicRecruitments] = useState(recruitments);
  const [appsOpen, setAppsOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantDetails | null>(null);

  useEffect(() => {
    api.recruitments.list().then((list: any[]) => {
      const mapped = list.map((r) => ({
        id: r.id,
        position: r.title,
        applications: 0,
        deadline: new Date(r.deadline).toISOString().slice(0,10),
        status: r.status.toLowerCase(),
      }));
      setDynamicRecruitments(prev => mapped.length ? mapped : prev);
    }).catch(() => {});
  }, []);

  const handlePublishRecruitment = async (config: RecruitmentConfig) => {
    try {
      const payload = {
        title: config.title,
        deadline: config.deadline,
        posts: config.posts,
        questions: config.questions,
        whatsappLink: config.whatsappLink,
        organizationId: 1,
      };
      const rec = await api.recruitments.create(payload);
      const newItems = config.posts.map((post, idx) => ({
        id: rec.id || (Date.now() + idx),
        position: post,
        applications: 0,
        deadline: config.deadline,
        status: "active",
      }));
      setDynamicRecruitments(prev => [...newItems, ...prev]);
    } catch (e) {
      const newItems = config.posts.map((post, idx) => ({
        id: Date.now() + idx,
        position: post,
        applications: 0,
        deadline: config.deadline,
        status: "active",
      }));
      setDynamicRecruitments(prev => [...newItems, ...prev]);
    }
  };

  const selectedRecruitment = useMemo(() => dynamicRecruitments.find(r => r.id === selectedRecruitmentId) || null, [dynamicRecruitments, selectedRecruitmentId]);

  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);

  const openApplications = (id: number) => {
    setSelectedRecruitmentId(id);
    api.applications.listByRecruitment(id).then((rows: any[]) => {
      setApplicants(rows.map(r => ({ id: r.id, name: r.name, course: r.course || "", section: r.section || "", registration: r.registration || "" })));
      setAppsOpen(true);
    }).catch(() => {
      setApplicants([]);
      setAppsOpen(true);
    });
  };

  const openManage = (id: number) => {
    setSelectedRecruitmentId(id);
    setManageOpen(true);
  };

  const pauseSelected = async () => {
    if (!selectedRecruitment) return;
    try { await api.recruitments.setStatus(selectedRecruitment.id as number, "PAUSED"); } catch {}
    setDynamicRecruitments(prev => prev.map(r => r.id === selectedRecruitment.id ? { ...r, status: "paused" } : r));
    setManageOpen(false);
  };

  const resumeSelected = async () => {
    if (!selectedRecruitment) return;
    try { await api.recruitments.setStatus(selectedRecruitment.id as number, "ACTIVE"); } catch {}
    setDynamicRecruitments(prev => prev.map(r => r.id === selectedRecruitment.id ? { ...r, status: "active" } : r));
    setManageOpen(false);
  };

  const terminateSelected = async () => {
    if (!selectedRecruitment) return;
    try { await api.recruitments.setStatus(selectedRecruitment.id as number, "CLOSED"); } catch {}
    setDynamicRecruitments(prev => prev.map(r => r.id === selectedRecruitment.id ? { ...r, status: "closed" } : r));
    setManageOpen(false);
  };

  const openApplicantDetails = (app: typeof recentApplications[number]) => {
    const details: ApplicantDetails = {
      id: app.id,
      name: app.applicantName,
      position: app.position,
      course: app.applicantName === "Sarah Johnson" ? "B.Tech CSE" : app.applicantName === "Michael Chen" ? "B.Tech IT" : "BBA",
      section: app.applicantName === "Sarah Johnson" ? "A" : app.applicantName === "Michael Chen" ? "B" : "C",
      registration: app.applicantName === "Sarah Johnson" ? "CS24-001" : app.applicantName === "Michael Chen" ? "IT24-014" : "BBA24-022",
      email: `${app.applicantName.split(" ")[0].toLowerCase()}@example.com`,
      phone: "+1-555-0101",
      answers: [
        { question: "Why do you want this role?", answer: "I am passionate about contributing to the club." },
        { question: "Relevant experience", answer: "Organized multiple campus events and led a small team." },
      ],
    };
    setSelectedApplicant(details);
    setDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Computer Science Society</h1>
            <p className="text-muted-foreground">Manage your recruitment processes and review candidates</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={() => setIsRecruitmentOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Recruitment
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Recruitments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">35</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">12</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Interviews Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">5</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Recruitments */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Active Recruitments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dynamicRecruitments.filter(r => r.status !== 'closed').map((recruitment) => (
                <div key={recruitment.id} className={`p-4 bg-background rounded-lg border border-border ${recruitment.status === 'paused' ? 'opacity-60' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{recruitment.position}</h3>
                      <p className="text-muted-foreground">{recruitment.applications} applications</p>
                    </div>
                    {recruitment.status === 'paused' ? (
                      <Badge variant="secondary" className="bg-warning/10 text-warning">
                        Paused
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Deadline: {recruitment.deadline}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openApplications(recruitment.id)}>
                        View Applications
                      </Button>
                      <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={() => openManage(recruitment.id)}>
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{application.applicantName}</h3>
                      <p className="text-muted-foreground">{application.position}</p>
                    </div>
                    <Badge variant={
                      application.status === 'new' ? 'default' :
                      application.status === 'reviewed' ? 'secondary' : 'outline'
                    }>
                      {application.status === 'new' ? 'New' :
                       application.status === 'reviewed' ? 'Reviewed' : 'Interview'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Applied: {application.appliedDate}</span>
                    <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={() => openApplicantDetails(application)}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <RecruitmentModal
        open={isRecruitmentOpen}
        onOpenChange={setIsRecruitmentOpen}
        onPublish={handlePublishRecruitment}
      />
      <RecruitmentApplicationsModal
        open={appsOpen}
        onOpenChange={setAppsOpen}
        recruitmentTitle={selectedRecruitment?.position || ""}
        applicants={applicants}
      />
      <ManageRecruitmentModal
        open={manageOpen}
        onOpenChange={setManageOpen}
        title={selectedRecruitment?.position || ""}
        status={(selectedRecruitment?.status as any) || "active"}
        onPause={pauseSelected}
        onResume={resumeSelected}
        onTerminate={terminateSelected}
      />
      <ApplicantDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} details={selectedApplicant} />
    </div>
  );
}