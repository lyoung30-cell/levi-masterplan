import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CheckSquare, Droplet, Award, User, 
  MapPin, Plus, Trash2, CheckCircle, AlertCircle, RefreshCw, 
  ChevronRight, Shield, Utensils, Upload, X, Bell
} from 'lucide-react';

const STUDENT_INFO = {
  name: "Levi Young",
  school: "De La Salle High School",
  grade: "Grade 9 (Freshman)",
  studentId: "#26508",
  lockers: [
    { title: "Room 51 Locker Room", code: "17 - 03 - 25", icon: "🏋️‍♂️" },
    { title: "Room 53 Locker Room", code: "35 - 13 - 35", icon: "⚽" },
    { title: "Personal Locker #256", code: "11 - 31 - 9", icon: "🎒" }
  ]
};

const SCHEDULE_PRESETS = {
  "A-Day": [
    { period: "Period 1", name: "Religious Studies 1", teacher: "Br. John Hoover", room: "Rm 204", start: "8:15 AM", end: "9:35 AM" },
    { period: "Break", name: "Morning Break", teacher: "", room: "Campus", start: "9:35 AM", end: "9:50 AM" },
    { period: "Period 2", name: "1st Aid/Health S1 / Study Hall S2", teacher: "Douglas Vierra / Paul Guaragna", room: "Rm 102 / 105", start: "9:55 AM", end: "11:15 AM" },
    { period: "Lunch", name: "Lunch", teacher: "", room: "Quad", start: "11:15 AM", end: "11:55 AM" },
    { period: "Period 3", name: "World History", teacher: "Kevin Fordon", room: "Rm 308", start: "12:00 PM", end: "1:20 PM" },
    { period: "Period 7", name: "Freshman STEM", teacher: "Danielle Davisson", room: "Rm 402", start: "1:25 PM", end: "2:45 PM" }
  ],
  "B-Day": [
    { period: "Period 4", name: "English 1", teacher: "Greg Brown-Davis", room: "Rm 212", start: "8:15 AM", end: "9:35 AM" },
    { period: "Break", name: "Morning Break", teacher: "", room: "Campus", start: "9:35 AM", end: "9:50 AM" },
    { period: "Period 5", name: "Spanish 1", teacher: "Gabby Galvez", room: "Rm 115", start: "9:55 AM", end: "11:15 AM" },
    { period: "Lunch", name: "Lunch", teacher: "", room: "Quad", start: "11:15 AM", end: "11:55 AM" },
    { period: "Period 6", name: "Algebra 1", teacher: "Marcus Chin", room: "Rm 301", start: "12:00 PM", end: "1:20 PM" }
  ],
  "0-7 Regular": [
    { period: "Period 1", name: "Religious Studies 1", teacher: "Br. John Hoover", room: "Rm 204", start: "8:15 AM", end: "9:05 AM" },
    { period: "Period 2", name: "1st Aid / Health S1", teacher: "Douglas Vierra", room: "Rm 102", start: "9:10 AM", end: "10:00 AM" },
    { period: "Break", name: "Morning Break", teacher: "", room: "Campus", start: "10:00 AM", end: "10:15 AM" },
    { period: "Period 3", name: "World History", teacher: "Kevin Fordon", room: "Rm 308", start: "10:20 AM", end: "11:10 AM" },
    { period: "Period 4", name: "English 1", teacher: "Greg Brown-Davis", room: "Rm 212", start: "11:15 AM", end: "12:05 PM" },
    { period: "Lunch", name: "Lunch", teacher: "", room: "Quad", start: "12:05 PM", end: "12:45 PM" },
    { period: "Period 5", name: "Spanish 1", teacher: "Gabby Galvez", room: "Rm 115", start: "12:50 PM", end: "1:40 PM" },
    { period: "Period 6", name: "Algebra 1", teacher: "Marcus Chin", room: "Rm 301", start: "1:45 PM", end: "2:35 PM" },
    { period: "Period 7", name: "Freshman STEM", teacher: "Danielle Davisson", room: "Rm 402", start: "2:40 PM", end: "3:30 PM" }
  ],
  "B-Day Late Start": [
    { period: "Period 4", name: "English 1", teacher: "Greg Brown-Davis", room: "Rm 212", start: "9:30 AM", end: "10:40 AM" },
    { period: "Break", name: "Morning Break", teacher: "", room: "Campus", start: "10:40 AM", end: "10:55 AM" },
    { period: "Period 5", name: "Spanish 1", teacher: "Gabby Galvez", room: "Rm 115", start: "11:00 AM", end: "12:10 PM" },
    { period: "Lunch", name: "Lunch", teacher: "", room: "Quad", start: "12:10 PM", end: "12:50 PM" },
    { period: "Period 6", name: "Algebra 1", teacher: "Marcus Chin", room: "Rm 301", start: "12:55 PM", end: "2:05 PM" }
  ],
  "B-Day Mass": [
    { period: "Period 4", name: "English 1", teacher: "Greg Brown-Davis", room: "Rm 212", start: "8:15 AM", end: "9:25 AM" },
    { period: "Mass", name: "Liturgy / All-School Mass", teacher: "All School", room: "Gym", start: "9:35 AM", end: "10:45 AM" },
    { period: "Break", name: "Morning Break", teacher: "", room: "Campus", start: "10:45 AM", end: "11:00 AM" },
    { period: "Period 5", name: "Spanish 1", teacher: "Gabby Galvez", room: "Rm 115", start: "11:05 AM", end: "12:15 PM" },
    { period: "Lunch", name: "Lunch", teacher: "", room: "Quad", start: "12:15 PM", end: "12:55 PM" },
    { period: "Period 6", name: "Algebra 1", teacher: "Marcus Chin", room: "Rm 301", start: "1:00 PM", end: "2:10 PM" }
  ],
  "B-Day Rally": [
    { period: "Period 4", name: "English 1", teacher: "Greg Brown-Davis", room: "Rm 212", start: "8:15 AM", end: "9:25 AM" },
    { period: "Period 5", name: "Spanish 1", teacher: "Gabby Galvez", room: "Rm 115", start: "9:35 AM", end: "10:45 AM" },
    { period: "Lunch", name: "Lunch", teacher: "", room: "Quad", start: "10:45 AM", end: "11:25 AM" },
    { period: "Period 6", name: "Algebra 1", teacher: "Marcus Chin", room: "Rm 301", start: "11:30 AM", end: "12:40 PM" },
    { period: "Rally", name: "School Spirit Rally", teacher: "All School", room: "Gym", start: "12:50 PM", end: "1:45 PM" }
  ]
};

const FOOD_MEALS_CONFIG = [
  { id: 1, title: "7:00 AM - Breakfast at Home", waterTarget: 18, options: ["Oatmeal with Berries & Honey", "3 Scrambled Eggs + Whole Wheat Toast", "Protein Smoothie with Whey & Banana"] },
  { id: 2, title: "9:35 AM - Break 1", waterTarget: 14, options: ["Greek Yogurt with Granola", "Apple + Peanut Butter", "Handful of Almonds & Dried Cranberries"] },
  { id: 3, title: "11:15 AM - Lunch", waterTarget: 18, options: ["Grilled Chicken Rice Bowl with Avocados", "Turkey & Cheese Wrap on Whole Wheat", "Pasta with Lean Ground Beef & Veggies"] },
  { id: 4, title: "1:25 PM - Break 2", waterTarget: 14, options: ["Quest Protein Bar", "Rice Cakes with Almond Butter", "Trail Mix & String Cheese"] },
  { id: 5, title: "3:30 PM - Pre-Workout", waterTarget: 18, options: ["Banana with Honey", "Rice Krispie & Electrolytes", "Bagel with Cream Cheese"] },
  { id: 6, title: "5:30 PM - Post-Workout", waterTarget: 22, options: ["Whey Protein Shake + Creatine", "Chocolate Milk & Rice Snack", "Lean Turkey Jerky & Orange"] },
  { id: 7, title: "6:45 PM - Afterschool Snack", waterTarget: 14, options: ["Cottage Cheese & Peaches", "Hummus with Whole Grain Pita", "Beef Rice Bowl Quick Bite"] },
  { id: 8, title: "8:00 PM - Dinner", waterTarget: 18, options: ["Salmon Filet with Sweet Potato & Asparagus", "Sirloin Steak with Brown Rice & Broccoli", "Chicken Breast Fajita Plate with Beans"] },
  { id: 9, title: "9:30 PM - Late Night Snack", waterTarget: 10, options: ["Casein Protein Shake", "Greek Yogurt with Peanut Butter", "Warm Milk & Handful of Walnuts"] }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedScheduleKey, setSelectedScheduleKey] = useState('A-Day');
  const [selectedSportsFilter, setSelectedSportsFilter] = useState('All');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // LocalStorage tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('goldline_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Read Chapter 4 - World History", course: "World History", dueDate: "2026-10-14", priority: "High", completed: false },
      { id: 2, title: "Algebra 1 Worksheet #7", course: "Algebra 1", dueDate: "2026-10-15", priority: "Medium", completed: false },
      { id: 3, title: "Spanish Vocabulary Flashcards", course: "Spanish 1", dueDate: "2026-10-16", priority: "Low", completed: true }
    ];
  });

  // LocalStorage sports events
  const [sportsEvents, setSportsEvents] = useState(() => {
    const saved = localStorage.getItem('goldline_sports');
    return saved ? JSON.parse(saved) : [
      { id: 1, team: "Oaks Baseball", title: "Practice @ Field 2", date: "2026-10-13", time: "4:00 PM - 6:00 PM", location: "Oaks Field" },
      { id: 2, team: "DLS Baseball", title: "Weight Room Session", date: "2026-10-14", time: "3:30 PM - 4:30 PM", location: "DLS Fitness Center" },
      { id: 3, team: "Magic Soccer", title: "Scrimmage vs Stars", date: "2026-10-16", time: "5:30 PM - 7:00 PM", location: "Central Turf" },
      { id: 4, team: "DLS Soccer", title: "Freshman Match vs Monte Vista", date: "2026-10-17", time: "10:00 AM - 11:30 AM", location: "Owen Owens Field" }
    ];
  });

  // LocalStorage food logs
  const [foodLogs, setFoodLogs] = useState(() => {
    const saved = localStorage.getItem('goldline_foodlogs');
    return saved ? JSON.parse(saved) : {};
  });

  // LocalStorage goals
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goldline_goals');
    return saved ? JSON.parse(saved) : [
      { id: 1, category: "Physically", text: "Bench press 185 lbs by end of fall term", completed: false },
      { id: 2, category: "Oaks Baseball", text: "Maintain .350+ batting average in fall league", completed: true },
      { id: 3, category: "School", text: "Maintain 4.0 GPA for Software Engineering track prerequisites", completed: false },
      { id: 4, category: "Godly", text: "Attend weekly chapel and daily reflection", completed: false },
      { id: 5, category: "DLS Soccer", text: "Start in 80%+ of freshman matches", completed: false }
    ];
  });

  useEffect(() => { localStorage.setItem('goldline_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('goldline_sports', JSON.stringify(sportsEvents)); }, [sportsEvents]);
  useEffect(() => { localStorage.setItem('goldline_foodlogs', JSON.stringify(foodLogs)); }, [foodLogs]);
  useEffect(() => { localStorage.setItem('goldline_goals', JSON.stringify(goals)); }, [goals]);

  // Modal forms
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', course: 'Algebra 1', dueDate: '', priority: 'Medium' });

  const [showSportsModal, setShowSportsModal] = useState(false);
  const [newSport, setNewSport] = useState({ team: 'DLS Baseball', title: '', date: '', time: '', location: '' });
  const [icalUrl, setIcalUrl] = useState('');

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ category: 'School', text: '' });

  // Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({ title: '', course: 'Algebra 1', dueDate: '', priority: 'Medium' });
    setShowTaskModal(false);
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddSport = (e) => {
    e.preventDefault();
    if (!newSport.title) return;
    setSportsEvents([...sportsEvents, { ...newSport, id: Date.now() }]);
    setNewSport({ team: 'DLS Baseball', title: '', date: '', time: '', location: '' });
    setShowSportsModal(false);
  };

  const deleteSport = (id) => {
    setSportsEvents(sportsEvents.filter(s => s.id !== id));
  };

  const handleSelectFoodOption = (mealId, optionIdx) => {
    setFoodLogs(prev => {
      const current = prev[mealId] || { selectedFood: null, loggedWater: false };
      const updated = { ...current, selectedFood: current.selectedFood === optionIdx ? null : optionIdx };
      return { ...prev, [mealId]: updated };
    });
  };

  const handleToggleWater = (mealId) => {
    setFoodLogs(prev => {
      const current = prev[mealId] || { selectedFood: null, loggedWater: false };
      return { ...prev, [mealId]: { ...current, loggedWater: !current.loggedWater } };
    });
  };

  const toggleGoalComplete = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.text) return;
    setGoals([...goals, { ...newGoal, id: Date.now(), completed: false }]);
    setNewGoal({ category: 'School', text: '' });
    setShowGoalModal(false);
  };

  // Water & Meal Progress Metrics
  const totalWaterOz = FOOD_MEALS_CONFIG.reduce((acc, meal) => {
    return acc + (foodLogs[meal.id]?.loggedWater ? meal.waterTarget : 0);
  }, 0);
  const totalWaterTarget = FOOD_MEALS_CONFIG.reduce((acc, meal) => acc + meal.waterTarget, 0);

  const completedMealsCount = FOOD_MEALS_CONFIG.reduce((acc, meal) => {
    return acc + (foodLogs[meal.id]?.selectedFood !== null && foodLogs[meal.id]?.selectedFood !== undefined ? 1 : 0);
  }, 0);

  // Filtered sports list
  const filteredSports = sportsEvents.filter(s => selectedSportsFilter === 'All' || s.team === selectedSportsFilter);

  return (
    <div className="bg-[#0B0C10] text-gray-100 min-h-screen font-sans pb-24 selection:bg-[#D4AF37] selection:text-black">
      
      {/* Sticky App Header */}
      <header className="sticky top-0 z-40 bg-[#1F222E]/95 backdrop-blur border-b border-[#3A331A] px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#8C7323] flex items-center justify-center font-extrabold text-black shadow-md border border-[#FFD700]/50">
              G
            </div>
            <div>
              <h1 className="font-bold text-base text-[#FFD700] tracking-wide leading-tight flex items-center gap-1.5">
                GOLDLINE HUB
              </h1>
              <p className="text-[10px] text-gray-400 font-medium">{STUDENT_INFO.name} • {STUDENT_INFO.studentId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                notificationsEnabled ? 'bg-[#3A331A] border-[#D4AF37] text-[#FFD700]' : 'bg-[#0B0C10] border-gray-700 text-gray-500'
              }`}
              title="Toggle 1-Hour Pre-Event Alerts"
            >
              <Bell className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#3A331A] text-[#FFD700] border border-[#D4AF37]/40 shadow-sm">
              {selectedScheduleKey}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 pt-4">

        {/* 1. TODAY (MERGED CHRONOLOGICAL AGENDA) */}
        {activeTab === 'today' && (
          <div className="space-y-4">
            {/* Header & Bell Switcher */}
            <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] shadow-md">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Today's Schedule</h2>
                  <p className="text-xl font-bold text-[#FFD700]">
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <select 
                  value={selectedScheduleKey}
                  onChange={(e) => setSelectedScheduleKey(e.target.value)}
                  className="bg-[#0B0C10] text-[#D4AF37] border border-[#3A331A] text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                >
                  {Object.keys(SCHEDULE_PRESETS).map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>

              {/* Notification Banner */}
              {notificationsEnabled && (
                <div className="flex items-center space-x-2 bg-[#3A331A]/40 border border-[#D4AF37]/30 p-2.5 rounded-lg text-xs text-[#FFD700]">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#D4AF37]" />
                  <span>1-Hour Pre-Event Alerts Active for Classes & Athletics</span>
                </div>
              )}
            </div>

            {/* Combined Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-wide">
                <Clock className="w-4 h-4" /> Integrated Timeline (12-Hour AM/PM)
              </h3>

              <div className="space-y-2.5">
                {/* Academic Classes */}
                {SCHEDULE_PRESETS[selectedScheduleKey].map((item, idx) => (
                  <div key={idx} className="bg-[#1F222E] p-3.5 rounded-xl border border-[#3A331A] flex justify-between items-center hover:border-[#D4AF37]/50 transition-all">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3A331A] text-[#FFD700]">
                          {item.period}
                        </span>
                        <span className="font-bold text-sm text-gray-100">{item.name}</span>
                      </div>
                      {item.teacher && (
                        <p className="text-xs text-gray-400 mt-1 pl-1">
                          {item.teacher} • <span className="text-gray-300 font-medium">{item.room}</span>
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono text-[#D4AF37] bg-[#0B0C10] px-2.5 py-1 rounded border border-[#3A331A]">
                        {item.start} - {item.end}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Today's Sports Events */}
                {sportsEvents.map((sport) => (
                  <div key={sport.id} className="bg-gradient-to-r from-[#1F222E] to-[#2A2E3D] p-3.5 rounded-xl border border-[#D4AF37]/40 flex justify-between items-center shadow-sm">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          sport.team.includes('Oaks') ? 'bg-amber-900/80 text-amber-200' :
                          sport.team.includes('Magic') ? 'bg-purple-900/80 text-purple-200' :
                          'bg-[#D4AF37] text-black'
                        }`}>
                          {sport.team}
                        </span>
                        <span className="font-bold text-sm text-white">{sport.title}</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 pl-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" /> {sport.location}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono text-[#FFD700] bg-[#0B0C10] px-2.5 py-1 rounded border border-[#3A331A]">
                        {sport.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CLASS SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {/* Header Switcher */}
            <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-[#FFD700]">De La Salle Bell Schedule</h2>
                <p className="text-xs text-gray-400">Strictly Period 1 Start (No Zero Period)</p>
              </div>
              <select 
                value={selectedScheduleKey}
                onChange={(e) => setSelectedScheduleKey(e.target.value)}
                className="bg-[#0B0C10] text-[#D4AF37] border border-[#3A331A] text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37]"
              >
                {Object.keys(SCHEDULE_PRESETS).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>

            {/* Schedule Items */}
            <div className="space-y-2.5">
              {SCHEDULE_PRESETS[selectedScheduleKey].map((item, idx) => (
                <div key={idx} className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] hover:border-[#D4AF37] transition-all">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#3A331A] text-[#FFD700] uppercase tracking-wider">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-[#D4AF37] bg-[#0B0C10] px-2.5 py-1 rounded border border-[#3A331A]">
                      {item.start} - {item.end}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-gray-100 mt-1">{item.name}</h3>
                  {item.teacher && (
                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2 pt-2 border-t border-[#3A331A]/50">
                      <span>Teacher: <strong className="text-gray-200">{item.teacher}</strong></span>
                      <span className="bg-[#0B0C10] px-2 py-0.5 rounded text-[#D4AF37] border border-[#3A331A] font-mono">{item.room}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SPORTS CALENDAR */}
        {activeTab === 'sports' && (
          <div className="space-y-4">
            {/* Header & Filter */}
            <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-[#FFD700]">Athletics Calendar</h2>
                  <p className="text-xs text-gray-400">Baseball & Soccer Schedules</p>
                </div>
                <button 
                  onClick={() => setShowSportsModal(true)}
                  className="bg-[#D4AF37] hover:bg-[#FFD700] text-black font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Event
                </button>
              </div>

              {/* Team Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1">
                {['All', 'Oaks Baseball', 'DLS Baseball', 'DLS Soccer', 'Magic Soccer'].map((team) => (
                  <button
                    key={team}
                    onClick={() => setSelectedSportsFilter(team)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedSportsFilter === team 
                        ? 'bg-[#D4AF37] text-black font-bold shadow-sm' 
                        : 'bg-[#0B0C10] text-gray-300 border border-[#3A331A] hover:border-gray-500'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>

            {/* Byga & TeamSnap Integration */}
            <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-3">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Calendar Integration (Byga & TeamSnap)
              </h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Paste webcal:// or iCal URL..." 
                  value={icalUrl} 
                  onChange={(e) => setIcalUrl(e.target.value)}
                  className="bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-200 p-2 rounded-lg flex-1 focus:outline-none focus:border-[#D4AF37]"
                />
                <button 
                  onClick={() => { if(icalUrl) alert("Synced sports calendar feed!"); setIcalUrl(''); }}
                  className="bg-[#3A331A] text-[#FFD700] hover:bg-[#D4AF37] hover:text-black font-semibold text-xs px-3 rounded-lg transition-colors"
                >
                  Sync
                </button>
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px] text-gray-400">
                <span>Supports .ics calendar upload simulator</span>
                <label className="cursor-pointer text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold">
                  <Upload className="w-3 h-3" /> Upload File
                  <input type="file" className="hidden" onChange={() => alert("Simulated .ics file import success!")} />
                </label>
              </div>
            </div>

            {/* Sports Events List */}
            <div className="space-y-2.5">
              {filteredSports.length === 0 ? (
                <div className="bg-[#1F222E] p-6 text-center text-gray-400 rounded-xl border border-[#3A331A]">
                  No sports events found for {selectedSportsFilter}.
                </div>
              ) : (
                filteredSports.map((sport) => (
                  <div key={sport.id} className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          sport.team.includes('Oaks') ? 'bg-amber-900/60 text-amber-200 border border-amber-600' :
                          sport.team.includes('Magic') ? 'bg-purple-900/60 text-purple-200 border border-purple-600' :
                          'bg-[#3A331A] text-[#FFD700] border border-[#D4AF37]/50'
                        }`}>
                          {sport.team}
                        </span>
                        <span className="text-xs text-gray-400">{sport.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-100">{sport.title}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" /> {sport.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs font-mono text-[#D4AF37] bg-[#0B0C10] px-2.5 py-1 rounded border border-[#3A331A]">
                        {sport.time}
                      </span>
                      <button 
                        onClick={() => deleteSport(sport.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 4. TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#1F222E] p-4 rounded-xl border border-[#3A331A]">
              <div>
                <h2 className="text-base font-bold text-[#FFD700]">Assignments & Homework</h2>
                <p className="text-xs text-gray-400">Schoology & PowerSchool Sync</p>
              </div>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="bg-[#D4AF37] hover:bg-[#FFD700] text-black font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Task
              </button>
            </div>

            {/* Task List with Checkoff and Explicit Trash Deletion */}
            <div className="space-y-2.5">
              {tasks.length === 0 ? (
                <div className="bg-[#1F222E] p-6 text-center text-gray-400 rounded-xl border border-[#3A331A]">
                  No active assignments.
                </div>
              ) : (
                tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-[#1F222E] p-4 rounded-xl border transition-all flex items-center justify-between ${
                      task.completed ? 'border-gray-800 opacity-60' : 'border-[#3A331A] hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <button 
                        onClick={() => toggleTaskComplete(task.id)}
                        className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          task.completed ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-gray-500 hover:border-[#D4AF37]'
                        }`}
                      >
                        {task.completed && <CheckCircle className="w-4 h-4 stroke-[3]" />}
                      </button>
                      <div>
                        <h4 className={`font-semibold text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-100'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B0C10] text-[#D4AF37] border border-[#3A331A]">
                            {task.course}
                          </span>
                          <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            task.priority === 'High' ? 'bg-red-950 text-red-300' :
                            task.priority === 'Medium' ? 'bg-amber-950 text-amber-300' : 'bg-blue-950 text-blue-300'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="ml-3 p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                      title="Delete assignment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 5. FOOD & HYDRATION */}
        {activeTab === 'food' && (
          <div className="space-y-4">
            {/* Header & Water Metric */}
            <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-[#FFD700]">Nutrition & Hydration Tracker</h2>
                  <p className="text-xs text-gray-400">9 Daily Interval Slots</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-[#D4AF37]">{totalWaterOz}</span>
                  <span className="text-xs text-gray-400"> / {totalWaterTarget} oz</span>
                </div>
              </div>

              {/* Water Progress Bar */}
              <div className="w-full bg-[#0B0C10] h-2.5 rounded-full overflow-hidden border border-[#3A331A]">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-[#D4AF37] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalWaterOz / totalWaterTarget) * 100)}%` }}
                />
              </div>

              {/* Food Choice Metric Counter */}
              <div className="flex justify-between items-center text-xs text-gray-300 pt-1 border-t border-[#3A331A]/60">
                <span>Food Selections Logged:</span>
                <span className="font-bold text-[#FFD700]">{completedMealsCount} of 9 Daily Intervals</span>
              </div>
            </div>

            {/* 9 Meals/Slots */}
            <div className="space-y-3">
              {FOOD_MEALS_CONFIG.map((meal) => {
                const mealLog = foodLogs[meal.id] || { selectedFood: null, loggedWater: false };

                return (
                  <div key={meal.id} className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Utensils className="w-4 h-4 text-[#D4AF37]" />
                        <h3 className="font-bold text-sm text-gray-100">{meal.title}</h3>
                      </div>

                      {/* Water Logging Button */}
                      <button 
                        onClick={() => handleToggleWater(meal.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                          mealLog.loggedWater 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'bg-[#0B0C10] text-gray-400 border border-[#3A331A] hover:border-blue-500'
                        }`}
                      >
                        <Droplet className="w-3.5 h-3.5" />
                        <span>+{meal.waterTarget} oz</span>
                      </button>
                    </div>

                    {/* Food Selection Checkboxes (Choose at least 1) */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] text-gray-400 font-medium">Select meal item eaten:</p>
                      {meal.options.map((option, idx) => {
                        const isSelected = mealLog.selectedFood === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectFoodOption(meal.id, idx)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                              isSelected 
                                ? 'bg-[#3A331A] border border-[#D4AF37] text-[#FFD700] font-semibold' 
                                : 'bg-[#0B0C10] border border-[#3A331A]/60 text-gray-300 hover:border-gray-500'
                            }`}
                          >
                            <span>{option}</span>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-gray-600'
                            }`}>
                              {isSelected && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. SCHOOL PLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-4">
            <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A]">
              <h2 className="text-base font-bold text-[#FFD700]">Software Engineering Track Roadmap</h2>
              <p className="text-xs text-gray-400">Course Sequence: "If you get an A in [Subject] -&gt; Unlocks [Next Level]"</p>
            </div>

            {/* Pathways Sequence List */}
            <div className="space-y-4">

              {/* STEM / Computer Science */}
              <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-3">
                <h3 className="font-bold text-sm text-[#D4AF37] flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> STEM & Computer Science Pathway
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>Freshman STEM (Grade 9)</span>
                    <span className="text-green-400 font-bold">Grade A (Unlocked Next)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 mx-auto text-[#D4AF37]" />
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>AP Computer Science Principles</span>
                    <span className="text-[#D4AF37]">If A in Freshman STEM</span>
                  </div>
                  <ChevronRight className="w-4 h-4 mx-auto text-gray-500" />
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>AP Computer Science A (Java)</span>
                    <span className="text-gray-400">If A in AP CS Principles</span>
                  </div>
                </div>
              </div>

              {/* Math Sequence */}
              <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-3">
                <h3 className="font-bold text-sm text-[#D4AF37]">Mathematics Pathway</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>Algebra 1</span>
                    <span className="text-green-400 font-bold">Grade A (Current)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 mx-auto text-[#D4AF37]" />
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>Honors Geometry</span>
                    <span className="text-[#D4AF37]">If A in Algebra 1</span>
                  </div>
                  <ChevronRight className="w-4 h-4 mx-auto text-gray-500" />
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>Honors Algebra 2 / Trig</span>
                    <span className="text-gray-400">If A in Honors Geometry</span>
                  </div>
                  <ChevronRight className="w-4 h-4 mx-auto text-gray-500" />
                  <div className="p-2.5 rounded bg-[#0B0C10] border border-[#3A331A] flex justify-between items-center">
                    <span>AP Calculus BC</span>
                    <span className="text-gray-400">If A in Honors Alg 2/Trig</span>
                  </div>
                </div>
              </div>

              {/* All Other Subjects Requirements */}
              <div className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] space-y-2 text-xs">
                <h3 className="font-bold text-sm text-[#D4AF37] mb-2">Subject Sequences</h3>
                <p>• <strong>Science:</strong> Get an A in Biology -&gt; Unlocks Honors Chemistry -&gt; Unlocks AP Physics C</p>
                <p>• <strong>World Language:</strong> Get an A in Spanish 1 -&gt; Unlocks Spanish 2 Honors -&gt; Unlocks AP Spanish Language</p>
                <p>• <strong>English:</strong> Get an A in English 1 -&gt; Unlocks English 2 Honors -&gt; Unlocks AP English Language</p>
                <p>• <strong>Social Studies:</strong> Get an A in World History -&gt; Unlocks AP US History -&gt; Unlocks AP Government</p>
                <p>• <strong>Theology:</strong> Get an A in Religion 1 -&gt; Unlocks Religion 2 -&gt; Unlocks Religion 3/4 Honors</p>
                <p className="pt-2 text-amber-300 font-semibold border-t border-[#3A331A]">
                  • <strong>Fine Arts:</strong> Complete 10th Grade Full-Year Visual/Performing Arts requirement.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 7. GOALS */}
        {activeTab === 'goals' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#1F222E] p-4 rounded-xl border border-[#3A331A]">
              <div>
                <h2 className="text-base font-bold text-[#FFD700]">Personal & Athletic Goals</h2>
                <p className="text-xs text-gray-400">Categorized Target Tracking</p>
              </div>
              <button 
                onClick={() => setShowGoalModal(true)}
                className="bg-[#D4AF37] hover:bg-[#FFD700] text-black font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Goal
              </button>
            </div>

            {/* Goals List */}
            <div className="space-y-2.5">
              {goals.map((goal) => (
                <div 
                  key={goal.id} 
                  className={`bg-[#1F222E] p-4 rounded-xl border transition-all flex items-center justify-between ${
                    goal.completed ? 'border-gray-800 opacity-60' : 'border-[#3A331A] hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <button 
                      onClick={() => toggleGoalComplete(goal.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        goal.completed ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-gray-500 hover:border-[#D4AF37]'
                      }`}
                    >
                      {goal.completed && <CheckCircle className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B0C10] text-[#D4AF37] border border-[#3A331A]">
                        {goal.category}
                      </span>
                      <p className={`text-sm mt-1 font-medium ${goal.completed ? 'line-through text-gray-400' : 'text-gray-100'}`}>
                        {goal.text}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. MY INFO & LOCKERS */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            {/* Student ID Card */}
            <div className="bg-[#1F222E] p-5 rounded-2xl border-2 border-[#D4AF37]/60 shadow-xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">De La Salle Student ID</span>
                  <h2 className="text-xl font-extrabold text-white">{STUDENT_INFO.name}</h2>
                  <p className="text-xs text-gray-300">{STUDENT_INFO.grade}</p>
                </div>
                <div className="px-3 py-1 bg-[#D4AF37] text-black font-extrabold rounded-lg text-xs shadow">
                  {STUDENT_INFO.studentId}
                </div>
              </div>

              <div className="border-t border-[#3A331A] pt-3 text-xs text-gray-400 space-y-1">
                <p>School: <strong className="text-gray-200">{STUDENT_INFO.school}</strong></p>
                <p>Track: <strong className="text-[#FFD700]">Software Engineering Sequence</strong></p>
              </div>
            </div>

            {/* Locker Combinations */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Locker Combinations</h3>
              {STUDENT_INFO.lockers.map((locker, idx) => (
                <div key={idx} className="bg-[#1F222E] p-4 rounded-xl border border-[#3A331A] flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{locker.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-gray-100">{locker.title}</h4>
                      <p className="text-xs text-gray-400">Combination Code</p>
                    </div>
                  </div>
                  <span className="font-mono text-base font-bold text-[#FFD700] bg-[#0B0C10] px-3 py-1.5 rounded-lg border border-[#3A331A]">
                    {locker.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODALS */}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddTask} className="bg-[#1F222E] border border-[#D4AF37] rounded-xl p-5 w-full max-w-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#FFD700]">Add Assignment</h3>
              <button type="button" onClick={() => setShowTaskModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <input 
              type="text" 
              placeholder="Task Title" 
              required
              value={newTask.title} 
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <select 
              value={newTask.course}
              onChange={(e) => setNewTask({...newTask, course: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Religious Studies 1">Religious Studies 1</option>
              <option value="1st Aid/Health S1">1st Aid/Health S1</option>
              <option value="World History">World History</option>
              <option value="Freshman STEM">Freshman STEM</option>
              <option value="English 1">English 1</option>
              <option value="Spanish 1">Spanish 1</option>
              <option value="Algebra 1">Algebra 1</option>
            </select>
            <input 
              type="date" 
              required
              value={newTask.dueDate} 
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowTaskModal(false)} className="px-3 py-1.5 text-xs text-gray-400">Cancel</button>
              <button type="submit" className="bg-[#D4AF37] text-black font-bold text-xs px-4 py-1.5 rounded-lg">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Sports Modal */}
      {showSportsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddSport} className="bg-[#1F222E] border border-[#D4AF37] rounded-xl p-5 w-full max-w-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#FFD700]">Add Sports Event</h3>
              <button type="button" onClick={() => setShowSportsModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <select 
              value={newSport.team}
              onChange={(e) => setNewSport({...newSport, team: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Oaks Baseball">Oaks Baseball</option>
              <option value="DLS Baseball">DLS Baseball</option>
              <option value="DLS Soccer">DLS Soccer</option>
              <option value="Magic Soccer">Magic Soccer</option>
            </select>
            <input 
              type="text" 
              placeholder="Event Title (e.g. Practice, Game)" 
              required
              value={newSport.title} 
              onChange={(e) => setNewSport({...newSport, title: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <input 
              type="date" 
              required
              value={newSport.date} 
              onChange={(e) => setNewSport({...newSport, date: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <input 
              type="text" 
              placeholder="Time in 12-hr AM/PM (e.g. 3:30 PM - 5:00 PM)" 
              required
              value={newSport.time} 
              onChange={(e) => setNewSport({...newSport, time: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <input 
              type="text" 
              placeholder="Location" 
              required
              value={newSport.location} 
              onChange={(e) => setNewSport({...newSport, location: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowSportsModal(false)} className="px-3 py-1.5 text-xs text-gray-400">Cancel</button>
              <button type="submit" className="bg-[#D4AF37] text-black font-bold text-xs px-4 py-1.5 rounded-lg">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddGoal} className="bg-[#1F222E] border border-[#D4AF37] rounded-xl p-5 w-full max-w-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#FFD700]">Add Goal</h3>
              <button type="button" onClick={() => setShowGoalModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <select 
              value={newGoal.category}
              onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="School">School</option>
              <option value="Mentally">Mentally</option>
              <option value="Godly">Godly</option>
              <option value="Physically">Physically</option>
              <option value="Oaks Baseball">Oaks Baseball</option>
              <option value="DLS Baseball">DLS Baseball</option>
              <option value="DLS Soccer">DLS Soccer</option>
              <option value="Magic Soccer">Magic Soccer</option>
            </select>
            <textarea 
              placeholder="Goal Description" 
              required
              rows={3}
              value={newGoal.text} 
              onChange={(e) => setNewGoal({...newGoal, text: e.target.value})}
              className="w-full bg-[#0B0C10] border border-[#3A331A] text-xs text-gray-100 p-2.5 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowGoalModal(false)} className="px-3 py-1.5 text-xs text-gray-400">Cancel</button>
              <button type="submit" className="bg-[#D4AF37] text-black font-bold text-xs px-4 py-1.5 rounded-lg">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* FIXED BOTTOM MOBILE NAVIGATION BAR (8 Tabs) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1F222E]/98 backdrop-blur border-t border-[#3A331A] py-1.5 z-40">
        <div className="max-w-md mx-auto grid grid-cols-8 gap-0.5 px-1">
          {[
            { id: 'today', label: 'Today', icon: Clock },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'sports', label: 'Sports', icon: Award },
            { id: 'tasks', label: 'Tasks', icon: CheckSquare },
            { id: 'food', label: 'Food', icon: Utensils },
            { id: 'plan', label: 'Plan', icon: Shield },
            { id: 'goals', label: 'Goals', icon: CheckCircle },
            { id: 'info', label: 'Info', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-1 rounded-lg transition-all ${
                  isActive ? 'text-[#FFD700] bg-[#3A331A]/60' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[9px] font-medium mt-0.5 tracking-tight scale-90">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}