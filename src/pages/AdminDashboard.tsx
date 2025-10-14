import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
// import { mockTimesheets } from '../data/mockData';
import { Timesheet } from '../types/timesheet';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contractorFilter, setContractorFilter] = useState<string>('all');

  // Get unique contractors for filter
  const existingData = localStorage.getItem("timesheets");
  const mockTimesheets: Timesheet[] = existingData ? JSON.parse(existingData) : [];
  const contractors = Array.from(new Set(mockTimesheets.map(ts => ts.contractorName)));

  // Filter timesheets based on search and filters
  const filteredTimesheets = mockTimesheets.filter(timesheet => {
    const matchesSearch =
      timesheet.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.comments.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || timesheet.status === statusFilter;
    const matchesContractor = contractorFilter === 'all' || timesheet.contractorName === contractorFilter;

    return matchesSearch && matchesStatus && matchesContractor;
  });

  const handleAction = (timesheetId: string, action: 'approve' | 'reject' | 'review') => {
    const timesheet = mockTimesheets.find(ts => ts.id === timesheetId);
    if (!timesheet) return;


const updatedTimesheets = mockTimesheets.map(ts => {
    if (ts.id === timesheetId) {
      let newStatus: Timesheet["status"] = ts.status;

      switch (action) {
        case "approve":
          newStatus = "approved";
          break;
        case "reject":
          newStatus = "rejected";
          break;
        case "review":
          newStatus = "pending"; // or keep "pending" depending on your logic
          break;
      }

      return {
        ...ts,
        status: newStatus,
        reviewedAt: new Date().toISOString(),
        reviewedBy: "Admin User", // you can make this dynamic later
      };
    }
    return ts;
  });

  localStorage.setItem("timesheets", JSON.stringify(updatedTimesheets));

    let message = '';
    switch (action) {
      case 'approve':
        message = `Approved timesheet for ${timesheet.contractorName} (${timesheet.hoursWorked}h on ${timesheet.project})`;
        break;
      case 'reject':
        message = `Rejected timesheet for ${timesheet.contractorName} (${timesheet.hoursWorked}h on ${timesheet.project})`;
        break;
      case 'review':
        message = `Timesheet for ${timesheet.contractorName} marked for review`;
        break;
    }

    toast({
      title: "Action Completed",
      description: message,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusCounts = () => {
    const pending = mockTimesheets.filter(ts => ts.status === 'pending').length;
    const approved = mockTimesheets.filter(ts => ts.status === 'approved').length;
    const rejected = mockTimesheets.filter(ts => ts.status === 'rejected').length;
    return { pending, approved, rejected };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Timesheet Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage contractor timesheet submissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Timesheets</p>
                <p className="text-2xl font-bold">{mockTimesheets.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-warning">{statusCounts.pending}</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">
                {statusCounts.pending}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{statusCounts.approved}</p>
              </div>
              <Badge className="bg-success text-success-foreground">
                {statusCounts.approved}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-destructive">{statusCounts.rejected}</p>
              </div>
              <Badge className="bg-destructive text-destructive-foreground">
                {statusCounts.rejected}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contractor, project, or comments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contractor</label>
              <Select value={contractorFilter} onValueChange={setContractorFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contractors</SelectItem>
                  {contractors.map((contractor) => (
                    <SelectItem key={contractor} value={contractor}>
                      {contractor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Timesheet Submissions</CardTitle>
          <CardDescription>
            {filteredTimesheets.length} of {mockTimesheets.length} timesheets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contractor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimesheets.map((timesheet) => (
                  <TableRow key={timesheet.id}>
                    <TableCell className="font-medium">
                      {timesheet.contractorName}
                    </TableCell>
                    <TableCell>{formatDate(timesheet.date)}</TableCell>
                    <TableCell>{timesheet.project}</TableCell>
                    <TableCell>{timesheet.hoursWorked}h</TableCell>
                    <TableCell>
                      <StatusBadge status={timesheet.status} />
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {timesheet.comments || 'No comments'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {timesheet.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(timesheet.id, 'approve')}
                              className="text-success hover:bg-success hover:text-success-foreground"
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(timesheet.id, 'reject')}
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(timesheet.id, 'review')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;