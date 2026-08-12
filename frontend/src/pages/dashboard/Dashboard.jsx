import React, { useState, useEffect } from 'react';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import {
  FileText,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Clock,
  FileTextIcon
} from 'lucide-react';
import progressService from '../../services/progressServices';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data__getDashboardData", data);
        setDashboardData(data.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!dashboardData || !dashboardData.overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <TrendingUp className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 text-sm">No dashboard data available.</p>
        </div>
      </div>
    );
  }

  // FIX 1: was `status` (undefined) — corrected to `stats`
  const stats = [
    {
      label: 'Total Documents',
      value: dashboardData.overview.totalDocuments,
      icon: FileTextIcon,
      gradient: 'from-blue-400 to-cyan-500',
      shadowColor: 'shadow-blue-500/25',
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      gradient: 'from-purple-400 to-pink-500',
      shadowColor: 'shadow-purple-500/25',
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      gradient: 'from-emerald-400 to-teal-500',
      shadowColor: 'shadow-emerald-500/25',
    },
    {
      label: 'Study Hours',
      value: dashboardData.overview.studyHours,
      icon: Clock,
      gradient: 'from-orange-400 to-amber-500',
      shadowColor: 'shadow-orange-500/25',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Track your learning progress and activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* FIX 2: was `status.localeCompare(...)` — corrected to `stats.map(...)` */}
          {/* FIX 3: was `state` — corrected to `stat` consistently */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                {/* FIX 4: was `state.lab` — corrected to `stat.label` */}
                <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                {/* FIX 5: `bg-linear-to-br` → `bg-gradient-to-br`, `item-center` → `items-center` */}
                {/* FIX 6: `strokeWidt` → `strokeWidth` */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-slate-800">Recent Activity</h3>
          </div>

          {/* FIX 7: typos `.documnets` → `.documents` and `.quizz` → `.quizzes` in condition */}
          {dashboardData.recentActivity &&
          (dashboardData.recentActivity.documents?.length > 0 ||
            dashboardData.recentActivity.quizzes?.length > 0) ? (
            <div className="space-y-3">
              {[
                ...(dashboardData.recentActivity?.documents || []).map((doc) => ({
                  id: doc._id,
                  description: doc.title,
                  timestamp: doc.lastAccessed,
                  link: `/documents/${doc._id}`,
                  type: 'document',
                })),
                ...(dashboardData.recentActivity?.quizzes || []).map((quiz) => ({
                  id: quiz._id,
                  description: quiz.title,
                  timestamp: quiz.lastAttempted,
                  link: `/quizzes/${quiz._id}`,
                  type: 'quiz',
                })),
              ]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((activity, index) => (
                  <div
                    key={activity.id || index}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {/* FIX 8: `rounded-dull` → `rounded-full`, `big-linear-to-r` → `bg-gradient-to-r` */}
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === 'document'
                            ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                            : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        }`}
                      />
                      <p className="text-sm text-slate-600">
                        {activity.type === 'document' ? 'Accessed document' : 'Attempted quiz'}:{' '}
                        <span className="font-medium text-slate-800">{activity.description}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* FIX 9: `new.Date(...)` → `new Date(...)`, `.toLocaleString` → `.toLocaleString()` */}
                      <p className="text-xs text-slate-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                      {activity.link && (
                        <a
                          href={activity.link}
                          className="text-xs font-medium text-blue-500 hover:text-blue-600"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 mb-3">
                <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-700 font-medium text-sm">No recent activity yet</p>
              <p className="text-slate-400 text-xs mt-1">Start learning to see your progress here</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;