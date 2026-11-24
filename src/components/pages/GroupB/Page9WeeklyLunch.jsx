import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Check, Calendar, CheckCircle2, ShieldCheck, Utensils } from 'lucide-react';

export default function Page9WeeklyLunch() {
  const { setCurrentPage, parentSelections, updateParentMealSelection } = useApp();
  const [selectedChild, setSelectedChild] = useState('jordan'); // 'jordan' | 'maya'
  const [selectedDay, setSelectedDay] = useState('tue'); // 'mon' | 'tue' | 'wed' | 'thu' | 'fri'

  const weekTabs = [
    { key: 'mon', label: 'Mon', date: 'Nov 23' },
    { key: 'tue', label: 'Tue (Today)', date: 'Nov 24' },
    { key: 'wed', label: 'Wed', date: 'Nov 25' },
    { key: 'thu', label: 'Thu', date: 'Nov 26' },
    { key: 'fri', label: 'Fri', date: 'Nov 27' },
  ];

  const mealChoices = [
    {
      key: 'hotA',
      title: 'Hot Entrée A: Golden Chicken Strips (Halal)',
      desc: 'Crispy oven-baked halal chicken strips with roasted potato wedges and fresh fruit bowl.',
      tag: 'Halal Certified',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      key: 'coldB',
      title: 'Cold Entrée B: Cheesy Italian Flatbread',
      desc: 'Whole grain flatbread with mozzarella, marinara dip, and baby carrots with dip.',
      tag: 'Vegetarian',
      tagColor: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    {
      key: 'salad',
      title: 'Fresh Salad Bar Bowl with Roll',
      desc: 'Crisp romaine, cherry tomatoes, cucumbers, shredded cheddar, and whole grain roll.',
      tag: 'Fresh Daily',
      tagColor: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      key: 'own',
      title: 'Bringing Lunch from Home',
      desc: 'Student brings personal lunch bag. Milk and juice carton available at no charge.',
      tag: 'No Kitchen Prep',
      tagColor: 'text-slate-600 bg-slate-100 border-slate-300'
    },
    {
      key: 'notake',
      title: 'Not Taking School Meal Today (Fasting / Skipping)',
      desc: 'Student will not participate in lunchtime food service today.',
      tag: 'Dietary / Fasting',
      tagColor: 'text-red-700 bg-red-50 border-red-200'
    }
  ];

  const currentSelection = parentSelections?.[selectedChild]?.[selectedDay] || (selectedChild === 'jordan' ? 'hotA' : 'salad');

  const handleSelectMeal = (choiceKey) => {
    updateParentMealSelection(selectedChild, selectedDay, choiceKey);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2 border-b border-slateBorder pb-4">
        <button
          onClick={() => setCurrentPage(6)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Family Hub
        </button>
        <h1 className="text-xl font-bold text-textDark tracking-tight">
          Weekly Lunch Pre-Selection
        </h1>
        <p className="text-xs text-textMuted">
          Pre-select meals for the week. Choices sync directly into your teacher's morning count.
        </p>
      </div>

      {/* Top: Sibling Switcher Tab */}
      <div className="flex rounded-element p-1 bg-slate-100 border border-slateBorder gap-1">
        <button
          type="button"
          onClick={() => setSelectedChild('jordan')}
          className={`flex-1 py-2 text-xs font-bold rounded-element min-h-touch transition-all flex items-center justify-center gap-2 ${
            selectedChild === 'jordan'
              ? 'bg-white text-textDark shadow-sm'
              : 'text-textMuted hover:text-textDark'
          }`}
        >
          <img
            src="/images/students/jordan.png"
            alt="Jordan"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>Jordan (Grade 2)</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedChild('maya')}
          className={`flex-1 py-2 text-xs font-bold rounded-element min-h-touch transition-all flex items-center justify-center gap-2 ${
            selectedChild === 'maya'
              ? 'bg-white text-textDark shadow-sm'
              : 'text-textMuted hover:text-textDark'
          }`}
        >
          <img
            src="/images/students/maya.png"
            alt="Maya"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>Maya (Grade 4)</span>
        </button>
      </div>

      {/* Week Tabs */}
      <div className="grid grid-cols-5 gap-1 text-center">
        {weekTabs.map((day) => {
          const isActive = selectedDay === day.key;
          return (
            <button
              key={day.key}
              type="button"
              onClick={() => setSelectedDay(day.key)}
              className={`p-2 rounded-element border transition-all text-xs ${
                isActive
                  ? 'bg-brandTeal text-white border-brandTeal font-bold shadow-sm'
                  : 'bg-canvas-pure border-slateBorder text-textDark hover:bg-slate-50'
              }`}
            >
              <span className="block font-bold">{day.label}</span>
              <span className={`text-[10px] block ${isActive ? 'text-teal-100' : 'text-textMuted'}`}>
                {day.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* Today's 5 Meal Choices (Vertical stack of 5 clean cards) */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-textMuted uppercase tracking-wider block">
          Menu Choices for {selectedChild === 'jordan' ? 'Jordan' : 'Maya'} ({selectedDay.toUpperCase()}):
        </span>

        {mealChoices.map((choice) => {
          const isSelected = currentSelection === choice.key;
          return (
            <div
              key={choice.key}
              onClick={() => handleSelectMeal(choice.key)}
              className={`p-4 bg-canvas-pure border rounded-card cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm ${
                isSelected
                  ? 'border-brandTeal ring-2 ring-brandTeal/30 bg-teal-50/10'
                  : 'border-slateBorder hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-textDark">
                    {choice.title}
                  </span>
                </div>
                <p className="text-xs text-textMuted">
                  {choice.desc}
                </p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border inline-block ${choice.tagColor}`}>
                  {choice.tag}
                </span>
              </div>

              {/* Select Button */}
              <button
                type="button"
                className={`px-4 py-2 text-xs font-bold rounded-element transition-colors flex items-center justify-center gap-1.5 min-h-touch flex-shrink-0 ${
                  isSelected
                    ? 'bg-brandTeal text-white shadow-sm'
                    : 'bg-slate-100 text-textDark hover:bg-slate-200 border border-slateBorder'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Selected</span>
                  </>
                ) : (
                  <span>Select</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Confirmation Pill */}
      <div className="p-3 bg-emerald-50 border border-statusGreen-border rounded-element flex items-center justify-center gap-2 text-xs font-semibold text-statusGreen shadow-sm">
        <CheckCircle2 className="w-4 h-4 text-statusGreen flex-shrink-0" />
        <span>Auto-saved to Mrs. Ellis's classroom register</span>
      </div>
    </div>
  );
}
