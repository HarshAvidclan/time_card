# TimeSheet Pro - Professional Timesheet Management

A modern, full-featured timesheet management web application built with React, TypeScript, and Tailwind CSS. Designed for contractors and administrators to efficiently track, submit, and manage work hours.

## 🚀 Features

### For Contractors
- **Timesheet Submission**: Easy-to-use form for logging daily work hours
- **Project Selection**: Choose from predefined projects
- **Status Tracking**: View approval status (Pending, Approved, Rejected)
- **History View**: Complete history of submitted timesheets

### For Administrators  
- **Timesheet Review**: View all contractor submissions
- **Approval Workflow**: Approve, reject, or mark for review
- **Advanced Filtering**: Filter by contractor, status, or date
- **Search Functionality**: Search across contractor names, projects, and comments
- **Dashboard Analytics**: Quick overview with status counts

### Technical Features
- **Role-based Authentication**: Secure login with contractor/admin roles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional UI**: Clean, modern interface with intuitive navigation
- **Real-time Updates**: Instant feedback with toast notifications
- **Date Picker**: Calendar interface for easy date selection

## 🛠 Technologies Used

- **React 18** - Modern frontend framework with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Professional UI component library
- **Lucide React** - Beautiful icon library
- **Date-fns** - Date manipulation and formatting

## 📋 Getting Started

### Prerequisites
- Node.js 16+ and npm installed

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd timesheet-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔐 Demo Credentials

The application includes demo authentication for testing:

### Contractor Access
- **Username**: `john` (or any username)
- **Password**: `password` (or any password)
- **Role**: Select "Contractor"

### Admin Access
- **Username**: `admin` (or any username)  
- **Password**: `password` (or any password)
- **Role**: Select "Admin"

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   ├── Layout.tsx       # Main application layout
│   ├── ProtectedRoute.tsx # Route protection
│   └── StatusBadge.tsx  # Status indicator component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── data/                # Mock data
│   └── mockData.ts      # Sample timesheet data
├── hooks/               # Custom React hooks
│   └── use-toast.ts     # Toast notification hook
├── pages/               # Main application pages
│   ├── Login.tsx        # Authentication page
│   ├── ContractorDashboard.tsx # Contractor interface
│   └── AdminDashboard.tsx      # Admin interface
├── types/               # TypeScript type definitions
│   └── timesheet.ts     # Timesheet data types
├── lib/                 # Utility functions
│   └── utils.ts         # Helper functions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and design system
```

## 🎨 Design System

The application uses a professional design system with:

- **Color Palette**: Professional blue tones with semantic color tokens
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent spacing, shadows, and interactions
- **Status Colors**: 
  - 🟡 **Pending** - Yellow/amber
  - 🟢 **Approved** - Green
  - 🔴 **Rejected** - Red

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablet screens
- **Desktop Enhanced**: Full-featured desktop experience

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

This is a frontend-only application that can be deployed to:

- **Vercel** - Automatic deployment from Git
- **Netlify** - Drag & drop or Git integration
- **GitHub Pages** - Free hosting for static sites
- **Any static hosting service**

## 📝 Usage Guide

### For Contractors
1. **Login** with contractor credentials
2. **Submit Timesheets** using the "New Timesheet" button
3. **Fill Details**: Select date, project, hours, and add comments
4. **Track Status**: View submission status in the table

### For Administrators
1. **Login** with admin credentials
2. **Review Submissions** in the main dashboard
3. **Use Filters** to narrow down timesheets
4. **Take Actions** using the approve/reject buttons
5. **Monitor Analytics** via the status count cards

## 🔮 Future Enhancements

Potential features for future versions:
- Backend API integration
- Email notifications
- Time tracking timer
- Reporting and analytics
- File attachments
- Calendar integration
- Multi-tenant support

## 📄 License

This project is provided as-is for demonstration purposes.

---

**TimeSheet Pro** - Professional timesheet management made simple.