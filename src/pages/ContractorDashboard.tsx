import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, CalendarIcon, Plus, FileText } from 'lucide-react';
import { mockTimesheets, mockProjects } from '../data/mockData';
import { Timesheet, TimesheetFormData } from '../types/timesheet';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ContractorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState<TimesheetFormData>({
    id: 0,
    contractorId: 0,
    contractorName: '',
    date: '',
    project: '',
    hoursWorked: 0,
    comments: '',
  });

  // Filter timesheets for current user
  const existingData = localStorage.getItem("timesheets");
  const timesheets: Timesheet[] = existingData ? JSON.parse(existingData) : [];
  const userTimesheets = timesheets.filter(
    (ts) => ts.contractorId === user?.id || ts.contractorName === user?.username
  );

  const handleInputChange = (field: keyof TimesheetFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    debugger;
    e.preventDefault();

    if (!formData.date || !formData.project || formData.hoursWorked <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Load existing entries from localStorage
    const existingData = localStorage.getItem("timesheets");
    const timesheets: Timesheet[] = existingData ? JSON.parse(existingData) : [];

    // Generate auto-increment ID
    const newId = timesheets.length > 0
      ? Math.max(...timesheets.map((ts:any) => ts.id)) + 1
      : 1;

    // Build new entry
    const newEntry: Timesheet = {
      id: newId.toString(),
      contractorId: user?.id,            // better: use real logged-in user id
      contractorName: user?.username || "",   // better: use real name
      date: formData.date,
      project: formData.project,
      hoursWorked: formData.hoursWorked,
      comments: formData.comments,
      status: "pending",
      submittedAt: new Date().toISOString(),
      reviewedAt: undefined,
      reviewedBy: undefined,
    };

    // Add new entry
    timesheets.push(newEntry);

    // Save back to localStorage
    localStorage.setItem("timesheets", JSON.stringify(timesheets));

    // In a real app, this would call an API
    toast({
      title: "Timesheet Submitted",
      description: `Successfully submitted ${formData.hoursWorked} hours for ${formData.project}`,
    });

    // Reset form
    setFormData({
      id: 0,
      contractorId: 0,
      contractorName: '',
      date: '',
      project: '',
      hoursWorked: 0,
      comments: '',
    });
    setDate(undefined);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Timesheets</h1>
          <p className="text-muted-foreground mt-1">
            Submit and track your timesheet entries
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Timesheet</span>
        </Button>
      </div>

      {/* Timesheet Submission Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Submit Timesheet</span>
            </CardTitle>
            <CardDescription>
              Enter your hours worked for the selected date and project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          if (selectedDate) {
                            handleInputChange('date', format(selectedDate, 'yyyy-MM-dd'));
                          }
                        }}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select value={formData.project} onValueChange={(value) => handleInputChange('project', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects.map((project) => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Worked *</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0.5"
                    max="24"
                    step="0.5"
                    placeholder="8.0"
                    value={formData.hoursWorked || ''}
                    onChange={(e) => handleInputChange('hoursWorked', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Describe the work completed..."
                  value={formData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit">Submit Timesheet</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Timesheets Table */}
      <Card>
        <CardHeader>
          <CardTitle>My Submitted Timesheets</CardTitle>
          <CardDescription>
            View all your submitted timesheet entries and their approval status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userTimesheets.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No timesheets yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by submitting your first timesheet entry
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Submit Timesheet
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTimesheets.map((timesheet) => (
                    <TableRow key={timesheet.id}>
                      <TableCell className="font-medium">
                        {formatDate(timesheet.date)}
                      </TableCell>
                      <TableCell>{timesheet.project}</TableCell>
                      <TableCell>{timesheet.hoursWorked}h</TableCell>
                      <TableCell>
                        <StatusBadge status={timesheet.status} />
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {timesheet.comments || 'No comments'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(timesheet.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorDashboard;