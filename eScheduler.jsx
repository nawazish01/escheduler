import { useState, useEffect, useRef } from "react";

const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700;800&display=swap');`;

const css = `
${GOOGLE_FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --primary: #1455F7;
  --primary-light: #EEF3FF;
  --primary-dark: #0E3FC0;
  --teal: #0EA5A0;
  --teal-light: #E8F9F8;
  --green: #22C55E;
  --green-light: #F0FDF4;
  --orange: #F59E0B;
  --orange-light: #FFFBEB;
  --red: #EF4444;
  --red-light: #FEF2F2;
  --bg: #F8FAFC;
  --surface: #FFFFFF;
  --border: #E8EDF5;
  --border-soft: #F1F5F9;
  --text-1: #0F172A;
  --text-2: #475569;
  --text-3: #94A3B8;
  --shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
  --shadow-md: 0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
  --shadow-lg: 0 12px 40px rgba(15,23,42,0.12), 0 4px 12px rgba(15,23,42,0.06);
  --radius: 12px;
  --radius-sm: 8px;
  --radius-lg: 16px;
  --sidebar-w: 240px;
}
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text-1); -webkit-font-smoothing: antialiased; }
button { font-family: inherit; cursor: pointer; border: none; outline: none; }
input, select, textarea { font-family: inherit; outline: none; }
.app-shell { display: flex; min-height: 100vh; }
/* Sidebar */
.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; transition: transform .3s; }
.sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid var(--border-soft); display: flex; align-items: center; gap: 10px; }
.logo-icon { width: 36px; height: 36px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.logo-text { font-family: 'Sora', sans-serif; font-size: 17px; font-weight: 700; color: var(--text-1); letter-spacing: -0.3px; }
.logo-text span { color: var(--primary); }
.sidebar-nav { flex: 1; padding: 12px 10px; overflow-y: auto; }
.nav-section-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-3); padding: 8px 10px 4px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 500; color: var(--text-2); cursor: pointer; transition: all .15s; margin-bottom: 2px; text-decoration: none; }
.nav-item:hover { background: var(--bg); color: var(--text-1); }
.nav-item.active { background: var(--primary-light); color: var(--primary); font-weight: 600; }
.nav-item .nav-icon { width: 18px; height: 18px; flex-shrink: 0; opacity: 0.7; }
.nav-item.active .nav-icon { opacity: 1; }
.nav-badge { margin-left: auto; background: var(--primary); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 20px; }
.sidebar-footer { padding: 14px 10px; border-top: 1px solid var(--border-soft); }
.sidebar-user { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: var(--radius-sm); cursor: pointer; transition: background .15s; }
.sidebar-user:hover { background: var(--bg); }
.avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.avatar-sm { width: 28px; height: 28px; font-size: 10px; }
.avatar-lg { width: 56px; height: 56px; font-size: 18px; }
.avatar-xl { width: 80px; height: 80px; font-size: 26px; }
/* Main */
.main-content { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
.topbar { height: 60px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 24px; gap: 16px; position: sticky; top: 0; z-index: 50; }
.topbar-title { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-1); flex: 1; }
.topbar-search { display: flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 7px 12px; font-size: 13px; color: var(--text-3); width: 220px; }
.page-content { padding: 24px; flex: 1; }
/* Role Switcher */
.role-switcher { display: flex; gap: 6px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px; }
.role-btn { padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; background: transparent; color: var(--text-2); transition: all .15s; }
.role-btn.active { background: var(--primary); color: #fff; }
/* Buttons */
.btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 600; transition: all .15s; cursor: pointer; border: none; }
.btn-sm { padding: 6px 12px; font-size: 12.5px; }
.btn-lg { padding: 12px 24px; font-size: 15px; }
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(20,85,247,0.3); }
.btn-secondary { background: var(--primary-light); color: var(--primary); }
.btn-secondary:hover { background: #dde8ff; }
.btn-ghost { background: transparent; color: var(--text-2); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--bg); color: var(--text-1); }
.btn-danger { background: var(--red-light); color: var(--red); }
.btn-danger:hover { background: #fecaca; }
.btn-teal { background: var(--teal); color: #fff; }
.btn-teal:hover { background: #0c9490; transform: translateY(-1px); }
.btn-green { background: var(--green-light); color: var(--green); }
/* Cards */
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow-sm); }
.card-lg { padding: 24px; }
.card:hover { box-shadow: var(--shadow-md); transition: box-shadow .2s; }
/* Stat Cards */
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 22px; display: flex; flex-direction: column; gap: 10px; box-shadow: var(--shadow-sm); }
.stat-label { font-size: 12px; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700; color: var(--text-1); letter-spacing: -1px; }
.stat-delta { font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
.delta-up { color: var(--green); }
.delta-down { color: var(--red); }
.stat-icon-wrap { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
/* Grid */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
/* Badge */
.badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
.badge-blue { background: var(--primary-light); color: var(--primary); }
.badge-teal { background: var(--teal-light); color: var(--teal); }
.badge-green { background: var(--green-light); color: var(--green); }
.badge-orange { background: var(--orange-light); color: var(--orange); }
.badge-red { background: var(--red-light); color: var(--red); }
.badge-gray { background: var(--border); color: var(--text-2); }
/* Inputs */
.input-group { display: flex; flex-direction: column; gap: 6px; }
.input-label { font-size: 12.5px; font-weight: 600; color: var(--text-2); }
.input-field { padding: 10px 13px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; color: var(--text-1); background: var(--surface); transition: border-color .15s; width: 100%; }
.input-field:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(20,85,247,0.1); }
.input-field::placeholder { color: var(--text-3); }
/* Table */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-3); border-bottom: 1px solid var(--border); background: var(--bg); }
td { padding: 12px 14px; border-bottom: 1px solid var(--border-soft); color: var(--text-1); }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--bg); }
/* Progress */
.progress-bar { height: 6px; background: var(--border); border-radius: 20px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 20px; transition: width .4s; }
/* Doctor Card */
.doctor-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; display: flex; gap: 14px; box-shadow: var(--shadow-sm); transition: all .2s; cursor: pointer; }
.doctor-card:hover { border-color: var(--primary); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.doctor-info { flex: 1; }
.doctor-name { font-size: 15px; font-weight: 700; color: var(--text-1); margin-bottom: 3px; }
.doctor-spec { font-size: 12.5px; color: var(--teal); font-weight: 600; margin-bottom: 8px; }
.doctor-meta { display: flex; gap: 14px; font-size: 12px; color: var(--text-3); }
.star-rating { display: flex; align-items: center; gap: 3px; font-size: 12px; color: var(--orange); font-weight: 700; }
/* Appointment Card */
.appt-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm); }
.appt-date-block { width: 52px; height: 60px; background: var(--primary-light); border-radius: var(--radius-sm); display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
.appt-day { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: var(--primary); line-height: 1; }
.appt-month { font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--primary); letter-spacing: 0.5px; }
/* Steps */
.steps-bar { display: flex; align-items: center; gap: 0; margin-bottom: 28px; }
.step-item { display: flex; align-items: center; flex: 1; }
.step-circle { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--text-3); background: var(--surface); flex-shrink: 0; transition: all .3s; }
.step-circle.active { border-color: var(--primary); background: var(--primary); color: #fff; }
.step-circle.done { border-color: var(--green); background: var(--green); color: #fff; }
.step-label { font-size: 11px; font-weight: 600; color: var(--text-3); margin-left: 8px; white-space: nowrap; }
.step-label.active { color: var(--primary); }
.step-line { flex: 1; height: 2px; background: var(--border); margin: 0 8px; }
.step-line.done { background: var(--green); }
/* Calendar */
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cal-day-header { text-align: center; font-size: 11px; font-weight: 700; color: var(--text-3); padding: 4px; text-transform: uppercase; }
.cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; color: var(--text-2); }
.cal-day:hover { background: var(--primary-light); color: var(--primary); }
.cal-day.today { background: var(--primary); color: #fff; font-weight: 700; }
.cal-day.selected { background: var(--primary-light); color: var(--primary); border: 2px solid var(--primary); font-weight: 700; }
.cal-day.empty { cursor: default; }
.cal-day.has-appt::after { content: ''; display: block; width: 4px; height: 4px; background: var(--teal); border-radius: 50%; position: absolute; bottom: 3px; }
.cal-day.has-appt { position: relative; }
/* Time Slots */
.time-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.time-slot { padding: 9px 6px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 12.5px; font-weight: 600; text-align: center; cursor: pointer; color: var(--text-2); transition: all .15s; background: var(--surface); }
.time-slot:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }
.time-slot.selected { border-color: var(--primary); background: var(--primary); color: #fff; }
.time-slot.booked { background: var(--bg); color: var(--text-3); cursor: not-allowed; text-decoration: line-through; }
/* Chart SVG */
.chart-container { width: 100%; overflow: hidden; }
/* Nav Pills */
.nav-pills { display: flex; gap: 4px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px; }
.pill { padding: 7px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; color: var(--text-2); cursor: pointer; transition: all .15s; }
.pill.active { background: var(--surface); color: var(--text-1); box-shadow: var(--shadow-sm); }
/* Landing */
.landing-hero { min-height: 100vh; background: linear-gradient(135deg, #0A1628 0%, #1455F7 50%, #0A1628 100%); display: flex; flex-direction: column; position: relative; overflow: hidden; }
.landing-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20,85,247,0.3) 0%, transparent 70%); }
.landing-nav { display: flex; align-items: center; padding: 20px 48px; gap: 32px; position: relative; z-index: 2; }
.landing-nav-links { display: flex; gap: 28px; flex: 1; justify-content: center; }
.landing-nav-links a { color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500; text-decoration: none; }
.landing-nav-links a:hover { color: #fff; }
.hero-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 24px; position: relative; z-index: 2; }
.hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 6px 16px; font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.85); margin-bottom: 24px; backdrop-filter: blur(10px); }
.hero-title { font-family: 'Sora', sans-serif; font-size: 58px; font-weight: 800; color: #fff; line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; }
.hero-title span { color: #7EB8FF; }
.hero-subtitle { font-size: 18px; color: rgba(255,255,255,0.65); max-width: 520px; line-height: 1.6; margin-bottom: 36px; }
.hero-ctas { display: flex; gap: 12px; }
.hero-stats { display: flex; gap: 40px; margin-top: 60px; }
.hero-stat { text-align: center; }
.hero-stat-num { font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 800; color: #fff; }
.hero-stat-label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }
.hero-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 60px 48px; background: var(--bg); }
.feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; }
.feature-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.feature-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
.feature-desc { font-size: 14px; color: var(--text-2); line-height: 1.6; }
/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; }
.modal { background: var(--surface); border-radius: var(--radius-lg); padding: 28px; width: 480px; box-shadow: var(--shadow-lg); }
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.modal-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 700; }
/* Auth */
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); }
.auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px; width: 420px; box-shadow: var(--shadow-md); }
.auth-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; justify-content: center; }
.auth-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 6px; text-align: center; }
.auth-sub { font-size: 13.5px; color: var(--text-2); text-align: center; margin-bottom: 28px; }
/* Notification Toast */
.toast { position: fixed; bottom: 24px; right: 24px; z-index: 300; display: flex; flex-direction: column; gap: 8px; }
.toast-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 18px; box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 12px; font-size: 13.5px; min-width: 280px; animation: slideIn .3s ease; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.toast-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
/* Section header */
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.section-title { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-1); }
/* Divider */
.divider { height: 1px; background: var(--border); margin: 20px 0; }
/* Search bar */
.search-bar { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 10px 14px; transition: border-color .15s; }
.search-bar:focus-within { border-color: var(--primary); }
.search-bar input { border: none; background: transparent; font-size: 14px; color: var(--text-1); flex: 1; }
.search-bar input::placeholder { color: var(--text-3); }
/* Filter chips */
.filter-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { padding: 6px 14px; border: 1.5px solid var(--border); border-radius: 20px; font-size: 12.5px; font-weight: 600; color: var(--text-2); cursor: pointer; transition: all .15s; background: var(--surface); }
.chip:hover, .chip.active { border-color: var(--primary); background: var(--primary-light); color: var(--primary); }
/* Skeleton */
.skeleton { background: linear-gradient(90deg, var(--border) 25%, var(--border-soft) 50%, var(--border) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-sm); }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
/* Tooltip */
.tooltip { position: relative; }
.tooltip-text { position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: var(--text-1); color: #fff; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity .15s; z-index: 50; }
.tooltip:hover .tooltip-text { opacity: 1; }
/* Utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: 4px; }
.gap-8 { gap: 8px; }
.gap-12 { gap: 12px; }
.gap-16 { gap: 16px; }
.gap-20 { gap: 20px; }
.mb-4 { margin-bottom: 4px; }
.mb-8 { margin-bottom: 8px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-20 { margin-bottom: 20px; }
.mb-24 { margin-bottom: 24px; }
.mt-16 { margin-top: 16px; }
.mt-20 { margin-top: 20px; }
.w-full { width: 100%; }
.text-sm { font-size: 12.5px; }
.text-xs { font-size: 11px; }
.text-primary { color: var(--primary); }
.text-teal { color: var(--teal); }
.text-muted { color: var(--text-3); }
.text-2 { color: var(--text-2); }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    calendar: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    search: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    user: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    users: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    bell: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    file: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    chart: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    dollar: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    settings: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    chevronRight: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
    chevronDown: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>,
    star: <svg width={size} height={size} fill={color} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    mapPin: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    activity: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    heart: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    phone: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
    mail: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    edit: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    logout: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    shield: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    trending: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    info: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    list: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    filter: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    video: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
    clipboard: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
    eye: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    package: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  };
  return icons[name] || null;
};

// ─── SVG CHART COMPONENTS ────────────────────────────────────────────────────
const LineChart = ({ data, color = "#1455F7", h = 120 }) => {
  const w = 100; const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 12)}`).join(" ");
  const area = `${pts} ${w},${h} 0,${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: h }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const BarChart = ({ data, labels, color = "#1455F7" }) => {
  const max = Math.max(...data.map(d => d.value));
  const h = 140; const barW = 28; const gap = 16; const total = data.length;
  const svgW = total * (barW + gap);
  return (
    <svg viewBox={`0 0 ${svgW} ${h + 24}`} style={{ width: "100%", height: h + 24 }}>
      {data.map((d, i) => {
        const barH = (d.value / max) * h;
        const x = i * (barW + gap) + gap / 2;
        return (
          <g key={i}>
            <rect x={x} y={h - barH} width={barW} height={barH} rx="4" fill={d.color || color} opacity="0.85" />
            <text x={x + barW / 2} y={h + 16} textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="DM Sans">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

const DonutChart = ({ value = 72, color = "#1455F7", size = 80 }) => {
  const r = 34; const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#E8EDF5" strokeWidth="8" />
      <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 40 40)" />
      <text x="40" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F172A" fontFamily="Sora">{value}%</text>
    </svg>
  );
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const DOCTORS = [
  { id: 1, name: "Dr. Sarah Mitchell", spec: "Cardiologist", exp: "12 years", rating: 4.9, reviews: 284, location: "Downtown Medical Center", fee: 120, avatar: "SM", color: "#1455F7", available: true, bio: "Board-certified cardiologist with extensive experience in preventive cardiology and heart failure management.", tags: ["Heart Disease", "Hypertension", "ECG"] },
  { id: 2, name: "Dr. James Okonkwo", spec: "Neurologist", exp: "9 years", rating: 4.8, reviews: 197, location: "Westside Clinic", fee: 150, avatar: "JO", color: "#0EA5A0", available: true, bio: "Specialist in headache disorders, epilepsy, and neurological rehabilitation with a patient-first approach.", tags: ["Migraines", "Epilepsy", "Stroke"] },
  { id: 3, name: "Dr. Priya Sharma", spec: "Pediatrician", exp: "7 years", rating: 4.7, reviews: 312, location: "North Health Hub", fee: 90, avatar: "PS", color: "#8B5CF6", available: true, bio: "Dedicated pediatrician focused on child development, vaccinations, and family-centered care.", tags: ["Child Care", "Vaccines", "Growth"] },
  { id: 4, name: "Dr. Marcus Chen", spec: "Orthopedic", exp: "15 years", rating: 4.9, reviews: 421, location: "Central Hospital", fee: 180, avatar: "MC", color: "#F59E0B", available: false, bio: "Sports medicine and orthopedic surgeon specializing in minimally invasive joint replacement.", tags: ["Joints", "Sports Injury", "Spine"] },
];

const APPOINTMENTS = [
  { id: 1, doctor: "Dr. Sarah Mitchell", spec: "Cardiologist", date: "Apr 15", day: 15, month: "APR", time: "10:00 AM", status: "upcoming", type: "Video Consultation", color: "#1455F7" },
  { id: 2, doctor: "Dr. James Okonkwo", spec: "Neurologist", date: "Apr 22", day: 22, month: "APR", time: "2:30 PM", status: "upcoming", type: "In-Person", color: "#0EA5A0" },
  { id: 3, doctor: "Dr. Priya Sharma", spec: "Pediatrician", date: "Mar 30", day: 30, month: "MAR", time: "11:00 AM", status: "completed", type: "In-Person", color: "#8B5CF6" },
  { id: 4, doctor: "Dr. Marcus Chen", spec: "Orthopedic", date: "Mar 10", day: 10, month: "MAR", time: "9:00 AM", status: "cancelled", type: "In-Person", color: "#F59E0B" },
];

const PATIENTS_LIST = [
  { id: 1, name: "Ahmed Al-Rashidi", age: 34, condition: "Hypertension", lastVisit: "Apr 10", status: "stable", avatar: "AA" },
  { id: 2, name: "Maria Gonzalez", age: 28, condition: "Arrhythmia", lastVisit: "Apr 8", status: "monitoring", avatar: "MG" },
  { id: 3, name: "Robert Kim", age: 52, condition: "Heart Failure", lastVisit: "Apr 5", status: "critical", avatar: "RK" },
  { id: 4, name: "Fatima Hassan", age: 41, condition: "Chest Pain", lastVisit: "Apr 3", status: "stable", avatar: "FH" },
  { id: 5, name: "Daniel Brooks", age: 67, condition: "Coronary Artery Disease", lastVisit: "Mar 28", status: "monitoring", avatar: "DB" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
const Avatar = ({ initials, color = "#1455F7", size = "md", img }) => {
  const sizes = { sm: "avatar-sm", md: "avatar", lg: "avatar-lg", xl: "avatar-xl" };
  return (
    <div className={sizes[size]} style={{ background: `${color}20`, color: color }}>
      {initials}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    upcoming: { cls: "badge-blue", label: "Upcoming" },
    completed: { cls: "badge-green", label: "Completed" },
    cancelled: { cls: "badge-red", label: "Cancelled" },
    stable: { cls: "badge-green", label: "Stable" },
    monitoring: { cls: "badge-orange", label: "Monitoring" },
    critical: { cls: "badge-red", label: "Critical" },
    active: { cls: "badge-green", label: "Active" },
    inactive: { cls: "badge-gray", label: "Inactive" },
    pending: { cls: "badge-orange", label: "Pending" },
  };
  const { cls, label } = map[status] || { cls: "badge-gray", label: status };
  return <span className={`badge ${cls}`}>{label}</span>;
};

const StatCard = ({ label, value, delta, deltaDir, icon, iconBg, iconColor, mini }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <span className="stat-label">{label}</span>
      {icon && <div className="stat-icon-wrap" style={{ background: iconBg }}><Icon name={icon} size={18} color={iconColor} /></div>}
    </div>
    <div className="stat-value">{value}</div>
    {delta && <div className={`stat-delta ${deltaDir === "up" ? "delta-up" : "delta-down"}`}>
      {deltaDir === "up" ? "↑" : "↓"} {delta} <span style={{ color: "var(--text-3)", fontWeight: 400, fontSize: 11 }}>vs last month</span>
    </div>}
  </div>
);

// ─── MINI CALENDAR ─────────────────────────────────────────────────────────
const MiniCalendar = ({ selectedDate, onSelect, month = 3, year = 2025 }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div>
      <div className="cal-grid" style={{ marginBottom: 6 }}>
        {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
      </div>
      <div className="cal-grid">
        {cells.map((day, i) => (
          <div key={i} onClick={() => day && onSelect(day)}
            className={`cal-day ${!day ? "empty" : ""} ${day === 13 ? "today" : ""} ${day === selectedDate ? "selected" : ""} ${[5, 12, 19].includes(day) && day !== selectedDate ? "has-appt" : ""}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TOAST ───────────────────────────────────────────────────────────────────
const Toast = ({ toasts }) => (
  <div className="toast">
    {toasts.map(t => (
      <div key={t.id} className="toast-item">
        <div className="toast-dot" style={{ background: t.type === "success" ? "var(--green)" : t.type === "error" ? "var(--red)" : "var(--primary)" }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
          <div style={{ color: "var(--text-2)", fontSize: 12 }}>{t.msg}</div>
        </div>
      </div>
    ))}
  </div>
);

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const LandingPage = ({ onLogin }) => (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <div className="landing-hero">
      <nav className="landing-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="logo-icon"><Icon name="activity" size={18} color="#fff" /></div>
          <span style={{ fontFamily: "Sora", fontSize: 18, fontWeight: 800, color: "#fff" }}>e<span style={{ color: "#7EB8FF" }}>Scheduler</span></span>
        </div>
        <div className="landing-nav-links">
          {["Features", "Doctors", "Pricing", "About"].map(l => <a key={l} href="#">{l}</a>)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={onLogin} style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}>Login</button>
          <button className="btn btn-primary" onClick={onLogin} style={{ background: "#fff", color: "var(--primary)" }}>Get Started</button>
        </div>
      </nav>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <Icon name="shield" size={13} color="rgba(255,255,255,0.85)" />
          HIPAA Compliant · 256-bit Encrypted
        </div>
        <h1 className="hero-title">Healthcare Scheduling,<br /><span>Reimagined</span></h1>
        <p className="hero-subtitle">Book appointments, manage consultations, and track your health journey — all in one intelligent platform.</p>
        <div className="hero-ctas">
          <button className="btn btn-primary btn-lg" onClick={onLogin} style={{ background: "#fff", color: "var(--primary)", fontSize: 15, padding: "13px 28px" }}>
            <Icon name="calendar" size={16} color="var(--primary)" /> Book Appointment
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onLogin} style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.07)", fontSize: 15, padding: "13px 28px", backdropFilter: "blur(10px)" }}>
            <Icon name="video" size={16} color="#fff" /> Watch Demo
          </button>
        </div>
        <div className="hero-stats">
          {[["50K+", "Patients"], ["1,200+", "Doctors"], ["98%", "Satisfaction"], ["4.9★", "App Rating"]].map(([num, label]) => (
            <div key={label} className="hero-stat">
              <div className="hero-stat-num">{num}</div>
              <div className="hero-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="hero-features">
      {[
        { icon: "search", color: "#1455F7", bg: "#EEF3FF", title: "Find the Right Doctor", desc: "Search by specialty, location, availability, and ratings. Compare profiles and book instantly." },
        { icon: "calendar", color: "#0EA5A0", bg: "#E8F9F8", title: "Smart Scheduling", desc: "Real-time slot availability, intelligent reminders, and seamless rescheduling — zero friction." },
        { icon: "video", color: "#8B5CF6", bg: "#F3F0FF", title: "Video Consultations", desc: "HD video calls with your doctor from anywhere. Secure, private, and recorded for your records." },
        { icon: "file", color: "#F59E0B", bg: "#FFFBEB", title: "Digital Prescriptions", desc: "Receive and manage prescriptions digitally. Share with pharmacies with a single tap." },
        { icon: "heart", color: "#EF4444", bg: "#FEF2F2", title: "Health Records", desc: "Centralized health records, lab results, and medical history accessible to your care team." },
        { icon: "shield", color: "#22C55E", bg: "#F0FDF4", title: "Privacy First", desc: "End-to-end encrypted data. HIPAA compliant infrastructure you can trust with your health." },
      ].map(f => (
        <div key={f.title} className="feature-card">
          <div className="feature-icon" style={{ background: f.bg }}>
            <Icon name={f.icon} size={22} color={f.color} />
          </div>
          <div className="feature-title">{f.title}</div>
          <div className="feature-desc">{f.desc}</div>
        </div>
      ))}
    </div>
    <div style={{ background: "var(--primary)", padding: "60px 48px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "Sora", fontSize: 34, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Start Your Health Journey Today</h2>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 28 }}>Join 50,000+ patients managing their healthcare smarter.</p>
      <button className="btn btn-lg" onClick={onLogin} style={{ background: "#fff", color: "var(--primary)", fontWeight: 700, fontSize: 15, padding: "14px 32px" }}>
        Create Free Account
      </button>
    </div>
  </div>
);

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
const AuthPage = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("patient");
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon"><Icon name="activity" size={18} color="#fff" /></div>
          <span style={{ fontFamily: "Sora", fontSize: 20, fontWeight: 800 }}>e<span style={{ color: "var(--primary)" }}>Scheduler</span></span>
        </div>
        <h2 className="auth-title">{isLogin ? "Welcome back" : "Create account"}</h2>
        <p className="auth-sub">{isLogin ? "Sign in to manage your appointments" : "Join thousands of patients & doctors"}</p>
        <div className="role-switcher" style={{ marginBottom: 20 }}>
          {[["patient", "Patient"], ["doctor", "Doctor"], ["admin", "Admin"]].map(([v, l]) => (
            <button key={v} className={`role-btn ${role === v ? "active" : ""}`} onClick={() => setRole(v)}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input className="input-field" placeholder="John Doe" />
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Email Address</label>
              <input className="input-field" type="email" placeholder="john@email.com" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input className="input-field" type="password" placeholder="••••••••" />
          </div>
          {isLogin && (
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 12.5, color: "var(--primary)", fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
            </div>
          )}
          <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 12, fontSize: 14 }} onClick={() => onAuth(role)}>
            {isLogin ? "Sign In" : "Create Account"}
          </button>
          <div style={{ textAlign: "center", fontSize: 13, color: "var(--text-2)" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={{ color: "var(--primary)", fontWeight: 600, cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SIDEBAR COMPONENT ───────────────────────────────────────────────────────
const Sidebar = ({ role, active, onNav, onLanding }) => {
  const navs = {
    patient: [
      { id: "dashboard", label: "Dashboard", icon: "home" },
      { id: "search", label: "Find Doctors", icon: "search" },
      { id: "appointments", label: "My Appointments", icon: "calendar", badge: 2 },
      { id: "prescriptions", label: "Prescriptions", icon: "file" },
      { id: "notifications", label: "Notifications", icon: "bell", badge: 3 },
    ],
    doctor: [
      { id: "dashboard", label: "Dashboard", icon: "home" },
      { id: "schedule", label: "My Schedule", icon: "calendar" },
      { id: "patients", label: "Patient List", icon: "users" },
      { id: "consultation", label: "Consultation", icon: "clipboard" },
      { id: "earnings", label: "Earnings", icon: "dollar" },
    ],
    admin: [
      { id: "dashboard", label: "Dashboard", icon: "home" },
      { id: "doctors", label: "Doctors", icon: "users" },
      { id: "patients_admin", label: "Patients", icon: "user" },
      { id: "appointments_admin", label: "Appointments", icon: "calendar" },
      { id: "analytics", label: "Analytics", icon: "chart" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  };

  const userInfo = {
    patient: { name: "John Doe", sub: "Patient", avatar: "JD", color: "#8B5CF6" },
    doctor: { name: "Dr. Sarah Mitchell", sub: "Cardiologist", avatar: "SM", color: "#1455F7" },
    admin: { name: "Admin User", sub: "Super Admin", avatar: "AU", color: "#EF4444" },
  }[role];

  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{ cursor: "pointer" }} onClick={onLanding}>
        <div className="logo-icon"><Icon name="activity" size={18} color="#fff" /></div>
        <div className="logo-text">e<span>Scheduler</span></div>
      </div>
      <div className="sidebar-nav">
        <div className="nav-section-label">Menu</div>
        {navs[role].map(n => (
          <div key={n.id} className={`nav-item ${active === n.id ? "active" : ""}`} onClick={() => onNav(n.id)}>
            <span className="nav-icon"><Icon name={n.icon} size={17} /></span>
            {n.label}
            {n.badge && <span className="nav-badge">{n.badge}</span>}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <Avatar initials={userInfo.avatar} color={userInfo.color} size="sm" />
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 600, truncate: true }}>{userInfo.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-3)" }}>{userInfo.sub}</div>
          </div>
          <Icon name="logout" size={15} color="var(--text-3)" />
        </div>
      </div>
    </div>
  );
};

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const Topbar = ({ title, role, onRoleChange, showRoleSwitcher }) => (
  <div className="topbar">
    <div className="topbar-title">{title}</div>
    <div className="topbar-search">
      <Icon name="search" size={14} color="var(--text-3)" />
      <span>Search...</span>
    </div>
    {showRoleSwitcher && (
      <div className="role-switcher">
        {[["patient", "Patient"], ["doctor", "Doctor"], ["admin", "Admin"]].map(([v, l]) => (
          <button key={v} className={`role-btn ${role === v ? "active" : ""}`} onClick={() => onRoleChange(v)}>{l}</button>
        ))}
      </div>
    )}
    <div style={{ position: "relative", cursor: "pointer" }}>
      <Icon name="bell" size={18} color="var(--text-2)" />
      <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "var(--red)", borderRadius: "50%", border: "2px solid #fff" }} />
    </div>
  </div>
);

// ─── PATIENT DASHBOARD ────────────────────────────────────────────────────────
const PatientDashboard = ({ onNavigate }) => {
  const [selDate, setSelDate] = useState(15);
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Good morning, John 👋</h2>
          <p className="text-2 text-sm">Monday, April 13, 2026</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("search")}>
          <Icon name="plus" size={15} color="#fff" /> Book Appointment
        </button>
      </div>

      <div className="grid-4 mb-20">
        <StatCard label="Total Appointments" value="24" delta="3 more" deltaDir="up" icon="calendar" iconBg="var(--primary-light)" iconColor="var(--primary)" />
        <StatCard label="Upcoming" value="2" icon="clock" iconBg="var(--teal-light)" iconColor="var(--teal)" />
        <StatCard label="Doctors Visited" value="5" icon="users" iconBg="var(--green-light)" iconColor="var(--green)" />
        <StatCard label="Prescriptions" value="8" icon="file" iconBg="var(--orange-light)" iconColor="var(--orange)" />
      </div>

      <div className="grid-2 mb-20" style={{ gridTemplateColumns: "1fr 340px" }}>
        <div className="card card-lg">
          <div className="section-header">
            <div className="section-title">Upcoming Appointments</div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("appointments")}>View all</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {APPOINTMENTS.filter(a => a.status === "upcoming").map(a => (
              <div key={a.id} className="appt-card">
                <div className="appt-date-block">
                  <span className="appt-day">{a.day}</span>
                  <span className="appt-month">{a.month}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{a.doctor}</div>
                  <div style={{ fontSize: 12, color: "var(--teal)", fontWeight: 600, marginBottom: 6 }}>{a.spec}</div>
                  <div className="flex gap-12" style={{ flexWrap: "wrap" }}>
                    <span className="flex gap-4 items-center text-sm text-muted"><Icon name="clock" size={12} />{a.time}</span>
                    <span className="flex gap-4 items-center text-sm text-muted"><Icon name="video" size={12} />{a.type}</span>
                  </div>
                </div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost btn-sm">Reschedule</button>
                  <button className="btn btn-primary btn-sm">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-lg">
          <div className="section-header mb-12">
            <div className="section-title">April 2026</div>
            <div className="flex gap-4">
              <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><Icon name="chevronLeft" size={14} /></button>
              <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><Icon name="chevronRight" size={14} /></button>
            </div>
          </div>
          <MiniCalendar selectedDate={selDate} onSelect={setSelDate} month={3} year={2026} />
          <div className="divider" />
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)", marginBottom: 10 }}>Apr {selDate} — No appointments</div>
          <button className="btn btn-secondary btn-sm w-full" style={{ justifyContent: "center" }} onClick={() => onNavigate("search")}>
            <Icon name="plus" size={13} color="var(--primary)" /> Schedule for this day
          </button>
        </div>
      </div>

      <div className="card card-lg">
        <div className="section-header">
          <div className="section-title">Recent Doctors</div>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("search")}>Browse all</button>
        </div>
        <div className="grid-2" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {DOCTORS.map(d => (
            <div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "14px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer", transition: "all .2s" }}
              onClick={() => onNavigate("search")}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
              <Avatar initials={d.avatar} color={d.color} size="lg" />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--teal)", fontWeight: 600 }}>{d.spec}</div>
                <div className="star-rating" style={{ justifyContent: "center", marginTop: 4 }}>
                  <Icon name="star" size={11} color="var(--orange)" /> {d.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SEARCH DOCTORS ──────────────────────────────────────────────────────────
const SearchDoctors = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");
  const specs = ["All", "Cardiologist", "Neurologist", "Pediatrician", "Orthopedic", "Dermatologist", "Psychiatrist"];

  const filtered = DOCTORS.filter(d =>
    (activeSpec === "All" || d.spec === activeSpec) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-content">
      <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Find a Doctor</h2>
      <p className="text-2 text-sm mb-20">Search from 1,200+ verified specialists</p>

      <div className="card card-lg mb-16" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="search-bar" style={{ flex: 1 }}>
          <Icon name="search" size={16} color="var(--text-3)" />
          <input placeholder="Search doctor name or specialization..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="search-bar" style={{ width: 180 }}>
          <Icon name="mapPin" size={14} color="var(--text-3)" />
          <input placeholder="City or area..." />
        </div>
        <button className="btn btn-primary"><Icon name="filter" size={15} color="#fff" /> Filter</button>
      </div>

      <div className="flex gap-8 mb-20" style={{ flexWrap: "wrap" }}>
        {specs.map(s => (
          <button key={s} className={`chip ${activeSpec === s ? "active" : ""}`} onClick={() => setActiveSpec(s)}>{s}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(d => (
          <div key={d.id} className="doctor-card" onClick={() => onSelect(d)}>
            <Avatar initials={d.avatar} color={d.color} size="lg" />
            <div className="doctor-info">
              <div className="flex items-center gap-8 mb-4">
                <div className="doctor-name">{d.name}</div>
                {d.available ? <span className="badge badge-green">Available Today</span> : <span className="badge badge-gray">Next Week</span>}
              </div>
              <div className="doctor-spec">{d.spec}</div>
              <div className="doctor-meta">
                <span className="flex gap-4 items-center"><Icon name="clock" size={12} />{d.exp} experience</span>
                <span className="flex gap-4 items-center"><Icon name="mapPin" size={12} />{d.location}</span>
              </div>
              <div className="flex gap-8 mt-16" style={{ flexWrap: "wrap" }}>
                {d.tags.map(t => <span key={t} className="badge badge-gray">{t}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
              <div className="star-rating"><Icon name="star" size={13} color="var(--orange)" /> {d.rating} <span style={{ color: "var(--text-3)", fontWeight: 400 }}>({d.reviews})</span></div>
              <div style={{ fontFamily: "Sora", fontSize: 18, fontWeight: 800, color: "var(--text-1)" }}>${d.fee}<span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-3)" }}>/visit</span></div>
              <button className="btn btn-primary btn-sm">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── BOOKING FLOW ──────────────────────────────────────────────────────────────
const BookingFlow = ({ doctor, onBack, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selDate, setSelDate] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [form, setForm] = useState({ reason: "", notes: "", type: "video" });

  const slots = [
    { t: "9:00 AM", booked: false }, { t: "9:30 AM", booked: true },
    { t: "10:00 AM", booked: false }, { t: "10:30 AM", booked: false },
    { t: "11:00 AM", booked: true }, { t: "11:30 AM", booked: false },
    { t: "2:00 PM", booked: false }, { t: "2:30 PM", booked: false },
    { t: "3:00 PM", booked: true }, { t: "3:30 PM", booked: false },
    { t: "4:00 PM", booked: false }, { t: "4:30 PM", booked: false },
  ];

  const d = doctor || DOCTORS[0];

  return (
    <div className="page-content" style={{ maxWidth: 700, margin: "0 auto" }}>
      <button className="btn btn-ghost btn-sm mb-20" onClick={onBack}>
        <Icon name="chevronLeft" size={14} /> Back to Results
      </button>

      <div className="steps-bar mb-24" style={{ marginBottom: 28 }}>
        {[{ n: 1, l: "Doctor" }, { n: 2, l: "Date" }, { n: 3, l: "Time Slot" }, { n: 4, l: "Details" }, { n: 5, l: "Confirm" }].map((s, i, arr) => (
          <div key={s.n} className="step-item">
            <div className={`step-circle ${step === s.n ? "active" : step > s.n ? "done" : ""}`}>
              {step > s.n ? <Icon name="check" size={14} color="#fff" /> : s.n}
            </div>
            <span className={`step-label ${step === s.n ? "active" : ""}`}>{s.l}</span>
            {i < arr.length - 1 && <div className={`step-line ${step > s.n ? "done" : ""}`} />}
          </div>
        ))}
      </div>

      <div className="card card-lg">
        {step === 1 && (
          <div>
            <div className="section-title mb-16">Confirm Doctor</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
              <Avatar initials={d.avatar} color={d.color} size="lg" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{d.name}</div>
                <div style={{ color: "var(--teal)", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{d.spec}</div>
                <div className="flex gap-12 text-sm text-muted">
                  <span className="flex gap-4 items-center"><Icon name="clock" size={12} />{d.exp}</span>
                  <span className="flex gap-4 items-center"><Icon name="mapPin" size={12} />{d.location}</span>
                  <span className="flex gap-4 items-center"><Icon name="star" size={12} color="var(--orange)" />{d.rating}</span>
                </div>
              </div>
              <div style={{ marginLeft: "auto", fontFamily: "Sora", fontSize: 22, fontWeight: 800 }}>${d.fee}</div>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <button className={`btn w-full ${form.type === "video" ? "btn-primary" : "btn-ghost"}`} onClick={() => setForm({ ...form, type: "video" })} style={{ justifyContent: "center" }}>
                <Icon name="video" size={15} color={form.type === "video" ? "#fff" : "var(--text-2)"} /> Video Consultation
              </button>
              <button className={`btn w-full ${form.type === "inperson" ? "btn-primary" : "btn-ghost"}`} onClick={() => setForm({ ...form, type: "inperson" })} style={{ justifyContent: "center" }}>
                <Icon name="users" size={15} color={form.type === "inperson" ? "#fff" : "var(--text-2)"} /> In-Person Visit
              </button>
            </div>
            <button className="btn btn-primary w-full mt-16" style={{ justifyContent: "center", padding: 13 }} onClick={() => setStep(2)}>
              Continue <Icon name="chevronRight" size={15} color="#fff" />
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="section-title mb-16">Select Date</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontWeight: 700 }}>April 2026</span>
              <div className="flex gap-4">
                <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><Icon name="chevronLeft" size={14} /></button>
                <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><Icon name="chevronRight" size={14} /></button>
              </div>
            </div>
            <MiniCalendar selectedDate={selDate} onSelect={setSelDate} month={3} year={2026} />
            <div className="divider" />
            <div className="flex gap-12 text-sm" style={{ marginBottom: 16 }}>
              <div className="flex gap-4 items-center"><div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--teal)" }} /> Has slots</div>
              <div className="flex gap-4 items-center"><div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--primary)" }} /> Today</div>
            </div>
            <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 13 }} onClick={() => selDate && setStep(3)} disabled={!selDate}>
              Continue to Time Slots <Icon name="chevronRight" size={15} color="#fff" />
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="section-title mb-4">Select Time Slot</div>
            <p className="text-sm text-muted mb-16">April {selDate}, 2026 — {d.location}</p>
            <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 12.5, color: "var(--text-2)" }}>Morning</div>
            <div className="time-slots mb-16">
              {slots.slice(0, 6).map(s => (
                <div key={s.t} className={`time-slot ${s.booked ? "booked" : ""} ${selSlot === s.t ? "selected" : ""}`}
                  onClick={() => !s.booked && setSelSlot(s.t)}>{s.t}</div>
              ))}
            </div>
            <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 12.5, color: "var(--text-2)" }}>Afternoon</div>
            <div className="time-slots">
              {slots.slice(6).map(s => (
                <div key={s.t} className={`time-slot ${s.booked ? "booked" : ""} ${selSlot === s.t ? "selected" : ""}`}
                  onClick={() => !s.booked && setSelSlot(s.t)}>{s.t}</div>
              ))}
            </div>
            <div className="divider" />
            <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 13 }} onClick={() => selSlot && setStep(4)} disabled={!selSlot}>
              Continue <Icon name="chevronRight" size={15} color="#fff" />
            </button>
          </div>
        )}
        {step === 4 && (
          <div>
            <div className="section-title mb-16">Appointment Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="input-group">
                <label className="input-label">Reason for Visit *</label>
                <input className="input-field" placeholder="e.g., Chest pain, follow-up, general checkup" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
              </div>
              <div className="input-group">
                <label className="input-label">Additional Notes</label>
                <textarea className="input-field" rows={3} placeholder="Describe your symptoms or any relevant medical history..." style={{ resize: "vertical" }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="input-group">
                <label className="input-label">Insurance Provider (Optional)</label>
                <input className="input-field" placeholder="e.g., Blue Cross, Aetna, Cigna" />
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 13 }} onClick={() => setStep(5)}>
              Review Booking <Icon name="chevronRight" size={15} color="#fff" />
            </button>
          </div>
        )}
        {step === 5 && (
          <div>
            <div className="section-title mb-16">Confirm Booking</div>
            <div style={{ background: "var(--bg)", borderRadius: "var(--radius)", padding: 20, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: "var(--text-1)" }}>Booking Summary</div>
              {[
                ["Doctor", d.name],
                ["Specialization", d.spec],
                ["Date", `April ${selDate}, 2026`],
                ["Time", selSlot || "10:00 AM"],
                ["Type", form.type === "video" ? "Video Consultation" : "In-Person Visit"],
                ["Reason", form.reason || "General checkup"],
                ["Consultation Fee", `$${d.fee}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between" style={{ marginBottom: 10, fontSize: 13.5 }}>
                  <span style={{ color: "var(--text-2)" }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div className="divider" />
              <div className="flex justify-between" style={{ fontWeight: 800, fontSize: 16 }}>
                <span>Total</span>
                <span style={{ color: "var(--primary)" }}>${d.fee}.00</span>
              </div>
            </div>
            <div style={{ padding: "12px 16px", background: "var(--teal-light)", borderRadius: "var(--radius-sm)", fontSize: 12.5, color: "var(--teal)", fontWeight: 500, marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name="info" size={15} color="var(--teal)" />
              Free cancellation up to 24 hours before your appointment. A confirmation email will be sent to your registered address.
            </div>
            <button className="btn btn-teal w-full btn-lg" style={{ justifyContent: "center" }} onClick={onConfirm}>
              <Icon name="check" size={16} color="#fff" /> Confirm & Pay ${d.fee}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MY APPOINTMENTS ──────────────────────────────────────────────────────────
const MyAppointments = () => {
  const [tab, setTab] = useState("upcoming");
  const filtered = APPOINTMENTS.filter(a => tab === "all" || a.status === tab);

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>My Appointments</h2>
          <p className="text-2 text-sm">Manage all your healthcare visits</p>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={15} color="#fff" /> New Booking</button>
      </div>

      <div className="nav-pills mb-20">
        {[["upcoming", "Upcoming"], ["completed", "Completed"], ["cancelled", "Cancelled"], ["all", "All"]].map(([v, l]) => (
          <div key={v} className={`pill ${tab === v ? "active" : ""}`} onClick={() => setTab(v)}>{l}</div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "60px 24px" }}>
            <Icon name="calendar" size={40} color="var(--border)" />
            <div style={{ fontWeight: 700, fontSize: 16, marginTop: 16, marginBottom: 8 }}>No {tab} appointments</div>
            <p className="text-sm text-muted">Book a new appointment to get started</p>
          </div>
        )}
        {filtered.map(a => (
          <div key={a.id} className="card" style={{ padding: "18px 22px" }}>
            <div className="flex items-center gap-16">
              <div className="appt-date-block" style={{ background: `${a.color}15` }}>
                <span className="appt-day" style={{ color: a.color }}>{a.day}</span>
                <span className="appt-month" style={{ color: a.color }}>{a.month}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-8 mb-4">
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{a.doctor}</span>
                  <StatusBadge status={a.status} />
                </div>
                <div style={{ color: "var(--teal)", fontWeight: 600, fontSize: 12.5, marginBottom: 8 }}>{a.spec}</div>
                <div className="flex gap-16 text-sm text-muted">
                  <span className="flex gap-4 items-center"><Icon name="clock" size={12} />{a.time}</span>
                  <span className="flex gap-4 items-center"><Icon name={a.type.includes("Video") ? "video" : "mapPin"} size={12} />{a.type}</span>
                </div>
              </div>
              <div className="flex gap-8">
                {a.status === "upcoming" && <>
                  <button className="btn btn-ghost btn-sm">Reschedule</button>
                  <button className="btn btn-danger btn-sm">Cancel</button>
                  <button className="btn btn-primary btn-sm"><Icon name="video" size={13} color="#fff" /> Join</button>
                </>}
                {a.status === "completed" && <>
                  <button className="btn btn-ghost btn-sm"><Icon name="file" size={13} /> View Report</button>
                  <button className="btn btn-secondary btn-sm">Book Again</button>
                </>}
                {a.status === "cancelled" && <button className="btn btn-secondary btn-sm">Rebook</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PRESCRIPTIONS ────────────────────────────────────────────────────────────
const Prescriptions = () => {
  const rxs = [
    { id: 1, med: "Atorvastatin 20mg", dose: "Once daily at bedtime", dur: "90 days", doctor: "Dr. Sarah Mitchell", date: "Apr 10, 2026", refills: 2 },
    { id: 2, med: "Metoprolol 25mg", dose: "Twice daily", dur: "30 days", doctor: "Dr. Sarah Mitchell", date: "Mar 28, 2026", refills: 1 },
    { id: 3, med: "Amoxicillin 500mg", dose: "3 times daily", dur: "7 days", doctor: "Dr. Priya Sharma", date: "Mar 10, 2026", refills: 0 },
  ];
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Prescriptions & Reports</h2>
          <p className="text-2 text-sm">All your medical records in one place</p>
        </div>
        <button className="btn btn-ghost"><Icon name="filter" size={14} /> Filter</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {rxs.map(r => (
          <div key={r.id} className="card" style={{ padding: "18px 22px" }}>
            <div className="flex items-center gap-16">
              <div style={{ width: 44, height: 44, background: "var(--primary-light)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="package" size={20} color="var(--primary)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{r.med}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-2)", marginBottom: 6 }}>{r.dose} · {r.dur}</div>
                <div className="flex gap-12 text-sm text-muted">
                  <span>{r.doctor}</span>
                  <span>·</span>
                  <span>{r.date}</span>
                  {r.refills > 0 && <span className="badge badge-teal">{r.refills} refills left</span>}
                </div>
              </div>
              <div className="flex gap-8">
                <button className="btn btn-ghost btn-sm"><Icon name="eye" size={13} /> View</button>
                <button className="btn btn-secondary btn-sm">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── DOCTOR DASHBOARD ─────────────────────────────────────────────────────────
const DoctorDashboard = () => {
  const todayAppts = [
    { time: "9:00 AM", name: "Ahmed Al-Rashidi", condition: "Hypertension follow-up", type: "In-Person", status: "completed" },
    { time: "10:00 AM", name: "Maria Gonzalez", condition: "Arrhythmia checkup", type: "Video", status: "upcoming" },
    { time: "11:30 AM", name: "Robert Kim", condition: "Heart failure monitoring", type: "In-Person", status: "upcoming" },
    { time: "2:00 PM", name: "Fatima Hassan", condition: "Chest pain evaluation", type: "Video", status: "upcoming" },
  ];

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Good morning, Dr. Mitchell 👋</h2>
          <p className="text-2 text-sm">You have 4 appointments today</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-ghost"><Icon name="calendar" size={14} /> Manage Schedule</button>
          <button className="btn btn-teal"><Icon name="video" size={14} color="#fff" /> Start Consultation</button>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <StatCard label="Today's Appointments" value="4" icon="calendar" iconBg="var(--primary-light)" iconColor="var(--primary)" />
        <StatCard label="Total Patients" value="284" delta="12 new" deltaDir="up" icon="users" iconBg="var(--teal-light)" iconColor="var(--teal)" />
        <StatCard label="Monthly Revenue" value="$8,420" delta="8%" deltaDir="up" icon="dollar" iconBg="var(--green-light)" iconColor="var(--green)" />
        <StatCard label="Avg. Rating" value="4.9★" icon="star" iconBg="var(--orange-light)" iconColor="var(--orange)" />
      </div>

      <div className="grid-2 mb-20" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div className="card card-lg">
          <div className="section-header">
            <div className="section-title">Today's Schedule</div>
            <span className="badge badge-blue">April 13</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {todayAppts.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 14, paddingTop: i > 0 ? 14 : 0, borderTop: i > 0 ? "1px solid var(--border-soft)" : "none" }}>
                <div style={{ width: 60, fontSize: 12, fontWeight: 700, color: "var(--text-3)", paddingTop: 2 }}>{a.time}</div>
                <div style={{ width: 3, background: a.status === "completed" ? "var(--green)" : "var(--primary)", borderRadius: 4, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 2 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 6 }}>{a.condition}</div>
                  <div className="flex gap-8">
                    <span className="badge badge-gray" style={{ fontSize: 11 }}>{a.type}</span>
                    <StatusBadge status={a.status} />
                  </div>
                </div>
                {a.status === "upcoming" && <button className="btn btn-secondary btn-sm" style={{ alignSelf: "center" }}>Start</button>}
                {a.status === "completed" && <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, alignSelf: "center" }}>✓ Done</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card card-lg">
            <div className="section-title mb-16">Weekly Performance</div>
            <div className="grid-2" style={{ gap: 12 }}>
              {[["Bookings", "28", "var(--primary)"], ["Completed", "24", "var(--green)"], ["Cancelled", "2", "var(--red)"], ["Pending", "2", "var(--orange)"]].map(([l, v, c]) => (
                <div key={l} style={{ background: "var(--bg)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, marginBottom: 4 }}>{l}</div>
                  <div style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-lg">
            <div className="section-title mb-12">Patient Satisfaction</div>
            <div className="flex items-center gap-16">
              <DonutChart value={96} color="var(--green)" size={90} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Excellent rating</div>
                <div className="text-sm text-muted">Based on 284 reviews</div>
                <div className="flex gap-4 items-center mt-16">
                  {[5, 4, 3].map(s => <><Icon key={s} name="star" size={13} color="var(--orange)" /></>)}
                  <span style={{ fontSize: 12, color: "var(--text-2)", marginLeft: 4 }}>4.9 / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── DOCTOR SCHEDULE ───────────────────────────────────────────────────────────
const DoctorSchedule = () => {
  const [selDate, setSelDate] = useState(13);
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Schedule Management</h2>
          <p className="text-2 text-sm">Control your availability and appointment slots</p>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={15} color="#fff" /> Add Slots</button>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "340px 1fr", gap: 20 }}>
        <div className="card card-lg">
          <div className="flex items-center justify-between mb-12">
            <span style={{ fontWeight: 700 }}>April 2026</span>
            <div className="flex gap-4">
              <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><Icon name="chevronLeft" size={14} /></button>
              <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><Icon name="chevronRight" size={14} /></button>
            </div>
          </div>
          <MiniCalendar selectedDate={selDate} onSelect={setSelDate} month={3} year={2026} />
          <div className="divider" />
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Working Hours</div>
          {[["Monday - Friday", "9:00 AM - 5:00 PM"], ["Saturday", "10:00 AM - 2:00 PM"], ["Sunday", "Off"]].map(([d, h]) => (
            <div key={d} className="flex justify-between" style={{ fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: "var(--text-2)" }}>{d}</span>
              <span style={{ fontWeight: 600, color: h === "Off" ? "var(--text-3)" : "var(--text-1)" }}>{h}</span>
            </div>
          ))}
        </div>

        <div className="card card-lg">
          <div className="section-header">
            <div className="section-title">April {selDate}, 2026 — Slots</div>
            <div className="flex gap-8">
              <span className="badge badge-blue">4 Booked</span>
              <span className="badge badge-green">6 Available</span>
              <span className="badge badge-gray">2 Blocked</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              { t: "9:00 AM", s: "booked", p: "Ahmed A." }, { t: "9:30 AM", s: "available" }, { t: "10:00 AM", s: "booked", p: "Maria G." },
              { t: "10:30 AM", s: "available" }, { t: "11:00 AM", s: "booked", p: "Robert K." }, { t: "11:30 AM", s: "blocked" },
              { t: "12:00 PM", s: "blocked" }, { t: "2:00 PM", s: "booked", p: "Fatima H." }, { t: "2:30 PM", s: "available" },
              { t: "3:00 PM", s: "available" }, { t: "3:30 PM", s: "available" }, { t: "4:00 PM", s: "available" },
            ].map((slot, i) => (
              <div key={i} style={{
                padding: "12px 14px", borderRadius: "var(--radius-sm)", border: `1.5px solid ${slot.s === "booked" ? "var(--primary)" : slot.s === "blocked" ? "var(--border)" : "var(--teal)"}`,
                background: slot.s === "booked" ? "var(--primary-light)" : slot.s === "blocked" ? "var(--bg)" : "var(--teal-light)",
                cursor: "pointer",
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: slot.s === "booked" ? "var(--primary)" : slot.s === "blocked" ? "var(--text-3)" : "var(--teal)", marginBottom: 4 }}>{slot.t}</div>
                <div style={{ fontSize: 11, color: "var(--text-2)" }}>{slot.p || (slot.s === "blocked" ? "Blocked" : "Available")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── DOCTOR PATIENT LIST ──────────────────────────────────────────────────────
const PatientList = () => (
  <div className="page-content">
    <div className="flex items-center justify-between mb-20">
      <div>
        <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Patient List</h2>
        <p className="text-2 text-sm">Manage and review your patient records</p>
      </div>
      <div className="flex gap-10">
        <div className="search-bar" style={{ width: 240 }}>
          <Icon name="search" size={14} color="var(--text-3)" />
          <input placeholder="Search patients..." />
        </div>
        <button className="btn btn-ghost"><Icon name="filter" size={14} /> Filter</button>
      </div>
    </div>

    <div className="card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age</th>
              <th>Condition</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {PATIENTS_LIST.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-10">
                    <Avatar initials={p.avatar} color="#1455F7" size="sm" />
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ color: "var(--text-2)" }}>{p.age} yrs</td>
                <td style={{ color: "var(--text-2)" }}>{p.condition}</td>
                <td style={{ color: "var(--text-2)" }}>{p.lastVisit}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>
                  <div className="flex gap-6">
                    <button className="btn btn-ghost btn-sm"><Icon name="eye" size={13} /></button>
                    <button className="btn btn-secondary btn-sm">Notes</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── CONSULTATION VIEW ────────────────────────────────────────────────────────
const ConsultationView = () => {
  const [notes, setNotes] = useState("Patient presents with intermittent chest pain radiating to left arm. Blood pressure elevated at 150/95. ECG shows normal sinus rhythm with no ST changes.");
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Consultation</h2>
          <p className="text-2 text-sm">Maria Gonzalez · 10:00 AM · Video Call</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-ghost"><Icon name="phone" size={14} /> End Call</button>
          <button className="btn btn-teal"><Icon name="video" size={14} color="#fff" /> Join Video</button>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card card-lg">
            <div className="section-title mb-16">Patient Overview</div>
            <div className="flex items-center gap-14 mb-16" style={{ padding: 16, background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
              <Avatar initials="MG" color="#0EA5A0" size="lg" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Maria Gonzalez</div>
                <div style={{ fontSize: 12.5, color: "var(--text-2)", marginBottom: 6 }}>28 years • Female • Blood Type: O+</div>
                <div className="flex gap-8">
                  <span className="badge badge-orange">Arrhythmia</span>
                  <span className="badge badge-gray">Allergic: Penicillin</span>
                </div>
              </div>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              {[["Last BP", "138/88 mmHg"], ["Heart Rate", "82 bpm"], ["Weight", "62 kg"], ["BMI", "23.4"]].map(([l, v]) => (
                <div key={l} style={{ padding: "12px 14px", background: "var(--bg)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, marginBottom: 4 }}>{l}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-lg">
            <div className="section-title mb-12">Consultation Notes</div>
            <textarea className="input-field" rows={6} value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: "vertical", lineHeight: 1.6 }} />
            <button className="btn btn-primary btn-sm mt-16"><Icon name="check" size={13} color="#fff" /> Save Notes</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card card-lg">
            <div className="section-title mb-14">Write Prescription</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="input-group">
                <label className="input-label">Medicine</label>
                <input className="input-field" placeholder="e.g., Metoprolol 25mg" />
              </div>
              <div className="grid-2" style={{ gap: 10 }}>
                <div className="input-group">
                  <label className="input-label">Dosage</label>
                  <input className="input-field" placeholder="e.g., Twice daily" />
                </div>
                <div className="input-group">
                  <label className="input-label">Duration</label>
                  <input className="input-field" placeholder="e.g., 30 days" />
                </div>
              </div>
              <button className="btn btn-secondary btn-sm"><Icon name="plus" size={13} color="var(--primary)" /> Add Medicine</button>
              <div style={{ padding: "12px 14px", background: "var(--primary-light)", borderRadius: "var(--radius-sm)" }}>
                <div className="flex justify-between items-center">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "var(--primary)" }}>Atorvastatin 20mg</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-2)" }}>Once daily at bedtime · 90 days</div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ padding: "3px 7px" }}><Icon name="x" size={13} /></button>
                </div>
              </div>
            </div>
            <button className="btn btn-teal w-full mt-16" style={{ justifyContent: "center" }}>
              <Icon name="file" size={14} color="#fff" /> Issue Prescription
            </button>
          </div>
          <div className="card card-lg">
            <div className="section-title mb-12">Visit History</div>
            {[["Mar 15, 2026", "Follow-up", "Stable"], ["Feb 2, 2026", "Diagnosis", "Arrhythmia"], ["Jan 10, 2026", "First Visit", "Evaluation"]].map(([d, t, s]) => (
              <div key={d} className="flex justify-between items-center" style={{ padding: "10px 0", borderBottom: "1px solid var(--border-soft)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{d}</div>
                </div>
                <span className="badge badge-green">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── EARNINGS ────────────────────────────────────────────────────────────────
const Earnings = () => {
  const monthly = [62, 75, 58, 90, 82, 95, 78, 110, 98, 115, 102, 125];
  const barData = [
    { label: "Mon", value: 3, color: "var(--primary)" }, { label: "Tue", value: 5, color: "var(--primary)" },
    { label: "Wed", value: 4, color: "var(--teal)" }, { label: "Thu", value: 6, color: "var(--primary)" },
    { label: "Fri", value: 4, color: "var(--primary)" }, { label: "Sat", value: 2, color: "var(--teal)" },
  ];
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Earnings & Reports</h2>
          <p className="text-2 text-sm">Financial overview and analytics</p>
        </div>
        <button className="btn btn-ghost"><Icon name="file" size={14} /> Export Report</button>
      </div>

      <div className="grid-4 mb-20">
        <StatCard label="This Month" value="$8,420" delta="12%" deltaDir="up" icon="dollar" iconBg="var(--primary-light)" iconColor="var(--primary)" />
        <StatCard label="Total Earnings" value="$94.2K" icon="trending" iconBg="var(--green-light)" iconColor="var(--green)" />
        <StatCard label="Avg per Session" value="$148" icon="chart" iconBg="var(--teal-light)" iconColor="var(--teal)" />
        <StatCard label="Pending Payout" value="$2,150" icon="clock" iconBg="var(--orange-light)" iconColor="var(--orange)" />
      </div>

      <div className="grid-2 mb-20">
        <div className="card card-lg">
          <div className="section-title mb-16">Revenue Trend (2026)</div>
          <div style={{ marginBottom: 8 }}>
            <LineChart data={monthly} color="var(--primary)" h={140} />
          </div>
          <div className="flex justify-between text-xs text-muted" style={{ marginTop: 4 }}>
            {MONTHS.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
        <div className="card card-lg">
          <div className="section-title mb-16">Weekly Consultations</div>
          <BarChart data={barData} />
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <div className="section-title">Recent Transactions</div>
          <button className="btn btn-ghost btn-sm">View All</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Patient</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {[
                { p: "Ahmed Al-Rashidi", s: "Cardiology Consultation", d: "Apr 13", a: "$120", st: "paid" },
                { p: "Maria Gonzalez", s: "Video Consultation", d: "Apr 12", a: "$100", st: "pending" },
                { p: "Fatima Hassan", s: "Follow-up Visit", d: "Apr 10", a: "$80", st: "paid" },
                { p: "Daniel Brooks", s: "ECG + Consultation", d: "Apr 8", a: "$180", st: "paid" },
              ].map((t, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{t.p}</td>
                  <td style={{ color: "var(--text-2)" }}>{t.s}</td>
                  <td style={{ color: "var(--text-2)" }}>{t.d}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{t.a}</td>
                  <td><StatusBadge status={t.st === "paid" ? "active" : "pending"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const trend = [42, 55, 48, 70, 65, 80, 72, 90, 88, 105, 95, 118];
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Admin Dashboard</h2>
          <p className="text-2 text-sm">System overview · Last updated: April 13, 2026</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-ghost"><Icon name="filter" size={14} /> This Month</button>
          <button className="btn btn-primary"><Icon name="file" size={14} color="#fff" /> Export</button>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <StatCard label="Total Bookings" value="4,820" delta="18%" deltaDir="up" icon="calendar" iconBg="var(--primary-light)" iconColor="var(--primary)" />
        <StatCard label="Total Revenue" value="$284K" delta="12%" deltaDir="up" icon="dollar" iconBg="var(--green-light)" iconColor="var(--green)" />
        <StatCard label="Active Doctors" value="127" delta="5 new" deltaDir="up" icon="users" iconBg="var(--teal-light)" iconColor="var(--teal)" />
        <StatCard label="Registered Patients" value="52,410" delta="320 new" deltaDir="up" icon="user" iconBg="var(--orange-light)" iconColor="var(--orange)" />
      </div>

      <div className="grid-2 mb-20" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="card card-lg">
          <div className="section-title mb-16">Booking Trend (2026)</div>
          <LineChart data={trend} color="var(--primary)" h={150} />
          <div className="flex justify-between text-xs text-muted mt-8">
            {MONTHS.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
        <div className="card card-lg">
          <div className="section-title mb-16">Appointment Types</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <DonutChart value={68} color="var(--primary)" size={110} />
          </div>
          {[["In-Person", 68, "var(--primary)"], ["Video Call", 24, "var(--teal)"], ["Phone", 8, "var(--orange)"]].map(([l, v, c]) => (
            <div key={l} className="flex items-center justify-between mb-8">
              <div className="flex gap-8 items-center">
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                <span className="text-sm text-2">{l}</span>
              </div>
              <div className="flex items-center gap-10">
                <div className="progress-bar" style={{ width: 80 }}>
                  <div className="progress-fill" style={{ width: `${v}%`, background: c }} />
                </div>
                <span className="text-sm font-semibold">{v}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card card-lg">
          <div className="section-header">
            <div className="section-title">Top Doctors</div>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          {DOCTORS.map((d, i) => (
            <div key={d.id} className="flex items-center gap-12 mb-12">
              <div style={{ fontFamily: "Sora", fontSize: 14, fontWeight: 800, color: "var(--text-3)", width: 16 }}>#{i + 1}</div>
              <Avatar initials={d.avatar} color={d.color} size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--teal)" }}>{d.spec}</div>
              </div>
              <div className="star-rating text-sm"><Icon name="star" size={11} color="var(--orange)" /> {d.rating}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--primary)" }}>{d.reviews} visits</div>
            </div>
          ))}
        </div>
        <div className="card card-lg">
          <div className="section-header">
            <div className="section-title">System Alerts</div>
            <span className="badge badge-red">3 Active</span>
          </div>
          {[
            { icon: "info", color: "var(--orange)", title: "Payment Gateway", msg: "Stripe webhook latency detected", time: "5 min ago" },
            { icon: "user", color: "var(--primary)", title: "New Doctor Application", msg: "Dr. Ahmed Karimi awaiting approval", time: "1 hr ago" },
            { icon: "calendar", color: "var(--green)", title: "Booking Milestone", msg: "Reached 5,000 monthly bookings!", time: "3 hr ago" },
          ].map((a, i) => (
            <div key={i} className="flex gap-12 items-center" style={{ padding: "12px 0", borderBottom: i < 2 ? "1px solid var(--border-soft)" : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={a.icon} size={16} color={a.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)" }}>{a.msg}</div>
              </div>
              <span style={{ fontSize: 11, color: "var(--text-3)", whiteSpace: "nowrap" }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN DOCTOR MANAGEMENT ──────────────────────────────────────────────────
const AdminDoctors = () => (
  <div className="page-content">
    <div className="flex items-center justify-between mb-20">
      <div>
        <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Doctor Management</h2>
        <p className="text-2 text-sm">127 registered doctors</p>
      </div>
      <div className="flex gap-10">
        <div className="search-bar" style={{ width: 220 }}>
          <Icon name="search" size={14} color="var(--text-3)" />
          <input placeholder="Search doctors..." />
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={14} color="#fff" /> Add Doctor</button>
      </div>
    </div>
    <div className="card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Doctor</th><th>Specialization</th><th>Location</th><th>Rating</th><th>Total Visits</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {DOCTORS.map(d => (
              <tr key={d.id}>
                <td>
                  <div className="flex items-center gap-10">
                    <Avatar initials={d.avatar} color={d.color} size="sm" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{d.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{d.exp} exp</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-teal">{d.spec}</span></td>
                <td style={{ color: "var(--text-2)", fontSize: 13 }}>{d.location}</td>
                <td><div className="star-rating"><Icon name="star" size={12} color="var(--orange)" /> {d.rating}</div></td>
                <td style={{ fontWeight: 700 }}>{d.reviews}</td>
                <td><StatusBadge status={d.available ? "active" : "inactive"} /></td>
                <td>
                  <div className="flex gap-6">
                    <button className="btn btn-ghost btn-sm"><Icon name="eye" size={13} /></button>
                    <button className="btn btn-ghost btn-sm"><Icon name="edit" size={13} /></button>
                    <button className="btn btn-danger btn-sm"><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ─── ADMIN ANALYTICS ────────────────────────────────────────────────────────
const AdminAnalytics = () => {
  const barData = [
    { label: "Jan", value: 42 }, { label: "Feb", value: 55 }, { label: "Mar", value: 48 },
    { label: "Apr", value: 70 }, { label: "May", value: 65 }, { label: "Jun", value: 80 },
    { label: "Jul", value: 72 }, { label: "Aug", value: 90 }, { label: "Sep", value: 88 },
    { label: "Oct", value: 105 }, { label: "Nov", value: 95 }, { label: "Dec", value: 118 },
  ];
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Analytics & Reports</h2>
          <p className="text-2 text-sm">Data-driven insights for platform growth</p>
        </div>
        <div className="flex gap-10">
          <div className="nav-pills">
            {["7D", "1M", "3M", "1Y"].map(p => <div key={p} className={`pill ${p === "1M" ? "active" : ""}`}>{p}</div>)}
          </div>
          <button className="btn btn-ghost"><Icon name="file" size={14} /> Export</button>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <StatCard label="Total Bookings" value="4,820" delta="18%" deltaDir="up" icon="calendar" iconBg="var(--primary-light)" iconColor="var(--primary)" />
        <StatCard label="Gross Revenue" value="$284K" delta="12%" deltaDir="up" icon="dollar" iconBg="var(--green-light)" iconColor="var(--green)" />
        <StatCard label="Cancellation Rate" value="3.2%" delta="1.1%" deltaDir="down" icon="x" iconBg="var(--red-light)" iconColor="var(--red)" />
        <StatCard label="Avg Session Value" value="$142" delta="8%" deltaDir="up" icon="trending" iconBg="var(--orange-light)" iconColor="var(--orange)" />
      </div>

      <div className="grid-2 mb-20">
        <div className="card card-lg">
          <div className="section-title mb-4">Monthly Appointments</div>
          <p className="text-sm text-muted mb-16">Total consultations across all specializations</p>
          <BarChart data={barData} color="var(--primary)" />
        </div>
        <div className="card card-lg">
          <div className="section-title mb-4">Revenue vs Target</div>
          <p className="text-sm text-muted mb-16">Monthly revenue performance</p>
          <LineChart data={[58, 72, 60, 85, 78, 95, 88, 112, 105, 130, 118, 145]} color="var(--teal)" h={150} />
          <div className="flex justify-between text-xs text-muted mt-8">
            {MONTHS.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>

      <div className="card card-lg">
        <div className="section-title mb-16">Top Performing Specializations</div>
        {[
          { spec: "Cardiology", appts: 820, rev: "$98,400", share: 85 },
          { spec: "Neurology", appts: 640, rev: "$96,000", share: 70 },
          { spec: "Pediatrics", appts: 720, rev: "$64,800", share: 78 },
          { spec: "Orthopedic", appts: 480, rev: "$86,400", share: 52 },
          { spec: "Dermatology", appts: 560, rev: "$50,400", share: 60 },
        ].map(s => (
          <div key={s.spec} className="flex items-center gap-16 mb-14">
            <div style={{ width: 110, fontWeight: 600, fontSize: 13.5 }}>{s.spec}</div>
            <div style={{ flex: 1 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${s.share}%`, background: "var(--primary)" }} />
              </div>
            </div>
            <div style={{ width: 60, textAlign: "right", fontWeight: 700, color: "var(--text-2)", fontSize: 13 }}>{s.appts}</div>
            <div style={{ width: 80, textAlign: "right", fontWeight: 700, color: "var(--primary)", fontSize: 13 }}>{s.rev}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ADMIN SETTINGS ────────────────────────────────────────────────────────────
const AdminSettings = () => (
  <div className="page-content">
    <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>System Settings</h2>
    <p className="text-2 text-sm mb-20">Configure platform preferences and integrations</p>
    <div className="grid-2">
      {[
        { title: "General", icon: "settings", items: ["Platform Name", "Support Email", "Time Zone", "Currency"] },
        { title: "Notifications", icon: "bell", items: ["Email Templates", "SMS Alerts", "Push Notifications", "Reminder Timing"] },
        { title: "Payments", icon: "dollar", items: ["Stripe Integration", "Payout Schedule", "Tax Settings", "Refund Policy"] },
        { title: "Security", icon: "shield", items: ["2FA Enforcement", "Session Timeout", "IP Whitelist", "Audit Logs"] },
      ].map(s => (
        <div key={s.title} className="card card-lg">
          <div className="flex items-center gap-10 mb-16">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={s.icon} size={18} color="var(--primary)" />
            </div>
            <div className="section-title">{s.title}</div>
          </div>
          {s.items.map((item, i) => (
            <div key={item} className="flex justify-between items-center" style={{ padding: "11px 0", borderBottom: i < s.items.length - 1 ? "1px solid var(--border-soft)" : "none" }}>
              <span style={{ fontSize: 13.5, color: "var(--text-2)" }}>{item}</span>
              <button className="btn btn-ghost btn-sm"><Icon name="chevronRight" size={14} /></button>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const Notifications = () => {
  const notifs = [
    { icon: "calendar", color: "var(--primary)", title: "Appointment Confirmed", msg: "Your appointment with Dr. Sarah Mitchell on Apr 15 at 10:00 AM has been confirmed.", time: "2 min ago", unread: true },
    { icon: "check", color: "var(--green)", title: "Prescription Ready", msg: "Dr. Priya Sharma has issued a prescription for Amoxicillin 500mg.", time: "1 hr ago", unread: true },
    { icon: "bell", color: "var(--orange)", title: "Appointment Reminder", msg: "You have an appointment with Dr. James Okonkwo tomorrow at 2:30 PM.", time: "3 hr ago", unread: true },
    { icon: "dollar", color: "var(--teal)", title: "Payment Successful", msg: "Payment of $120 for your cardiology consultation has been processed.", time: "Yesterday", unread: false },
    { icon: "star", color: "var(--orange)", title: "Rate Your Visit", msg: "How was your experience with Dr. Priya Sharma? Share your feedback.", time: "2 days ago", unread: false },
  ];
  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-20">
        <div>
          <h2 style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Notifications</h2>
          <p className="text-2 text-sm">3 unread notifications</p>
        </div>
        <button className="btn btn-ghost btn-sm">Mark all read</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {notifs.map((n, i) => (
          <div key={i} className="card" style={{ padding: "16px 20px", borderLeft: n.unread ? `4px solid ${n.color}` : "4px solid transparent" }}>
            <div className="flex items-center gap-14">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${n.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={n.icon} size={18} color={n.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-8 mb-3">
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{n.title}</span>
                  {n.unread && <div style={{ width: 7, height: 7, background: "var(--primary)", borderRadius: "50%" }} />}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{n.msg}</div>
              </div>
              <span style={{ fontSize: 11.5, color: "var(--text-3)", whiteSpace: "nowrap", alignSelf: "flex-start" }}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── BOOKING CONFIRMATION MODAL ────────────────────────────────────────────────
const ConfirmModal = ({ doctor, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()} style={{ textAlign: "center" }}>
      <div style={{ width: 64, height: 64, background: "var(--green-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Icon name="check" size={28} color="var(--green)" />
      </div>
      <div style={{ fontFamily: "Sora", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Booking Confirmed!</div>
      <p style={{ color: "var(--text-2)", fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
        Your appointment with <strong>{doctor?.name || "Dr. Sarah Mitchell"}</strong> has been successfully booked. A confirmation has been sent to your email.
      </p>
      <div style={{ background: "var(--bg)", borderRadius: "var(--radius-sm)", padding: 16, marginBottom: 20 }}>
        {[["Date", "April 15, 2026"], ["Time", "10:00 AM"], ["Type", "Video Consultation"], ["Booking ID", "#ESH-20260415-0042"]].map(([k, v]) => (
          <div key={k} className="flex justify-between" style={{ fontSize: 13, padding: "5px 0" }}>
            <span style={{ color: "var(--text-2)" }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 12 }} onClick={onClose}>
        <Icon name="calendar" size={15} color="#fff" /> View My Appointments
      </button>
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function EScheduler() {
  const [view, setView] = useState("landing");
  const [role, setRole] = useState("patient");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (title, msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, title, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  const handleAuth = (r) => {
    setRole(r);
    setActiveNav("dashboard");
    setView("app");
  };

  const handleBookingConfirm = () => {
    setShowModal(true);
    showToast("Booking Confirmed!", "Your appointment has been booked successfully.", "success");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setView("app");
    setActiveNav("appointments");
  };

  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
    setView("booking");
  };

  const navTitles = {
    patient: { dashboard: "Dashboard", search: "Find Doctors", appointments: "My Appointments", prescriptions: "Prescriptions", notifications: "Notifications" },
    doctor: { dashboard: "Dashboard", schedule: "My Schedule", patients: "Patient List", consultation: "Consultation", earnings: "Earnings" },
    admin: { dashboard: "Dashboard", doctors: "Doctor Management", patients_admin: "Patient Management", appointments_admin: "Appointment Control", analytics: "Analytics", settings: "Settings" },
  };

  const renderContent = () => {
    if (role === "patient") {
      if (activeNav === "dashboard") return <PatientDashboard onNavigate={n => { setActiveNav(n); }} />;
      if (activeNav === "search") return <SearchDoctors onSelect={handleDoctorSelect} />;
      if (activeNav === "appointments") return <MyAppointments />;
      if (activeNav === "prescriptions") return <Prescriptions />;
      if (activeNav === "notifications") return <Notifications />;
    }
    if (role === "doctor") {
      if (activeNav === "dashboard") return <DoctorDashboard />;
      if (activeNav === "schedule") return <DoctorSchedule />;
      if (activeNav === "patients") return <PatientList />;
      if (activeNav === "consultation") return <ConsultationView />;
      if (activeNav === "earnings") return <Earnings />;
    }
    if (role === "admin") {
      if (activeNav === "dashboard") return <AdminDashboard />;
      if (activeNav === "doctors") return <AdminDoctors />;
      if (activeNav === "analytics") return <AdminAnalytics />;
      if (activeNav === "settings") return <AdminSettings />;
      if (activeNav === "patients_admin" || activeNav === "appointments_admin") return <AdminDoctors />;
    }
    return <PatientDashboard onNavigate={n => setActiveNav(n)} />;
  };

  if (view === "landing") return (
    <>
      <style>{css}</style>
      <LandingPage onLogin={() => setView("auth")} />
      <Toast toasts={toasts} />
    </>
  );

  if (view === "auth") return (
    <>
      <style>{css}</style>
      <AuthPage onAuth={handleAuth} />
    </>
  );

  if (view === "booking") return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        <Sidebar role={role} active="search" onNav={n => { setActiveNav(n); setView("app"); }} onLanding={() => setView("landing")} />
        <div className="main-content">
          <Topbar title="Book Appointment" role={role} onRoleChange={r => { setRole(r); setActiveNav("dashboard"); }} showRoleSwitcher={true} />
          <BookingFlow doctor={selectedDoctor} onBack={() => { setView("app"); setActiveNav("search"); }} onConfirm={handleBookingConfirm} />
        </div>
      </div>
      {showModal && <ConfirmModal doctor={selectedDoctor} onClose={handleModalClose} />}
      <Toast toasts={toasts} />
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        <Sidebar role={role} active={activeNav} onNav={n => setActiveNav(n)} onLanding={() => setView("landing")} />
        <div className="main-content">
          <Topbar
            title={navTitles[role]?.[activeNav] || "Dashboard"}
            role={role}
            onRoleChange={r => { setRole(r); setActiveNav("dashboard"); showToast(`Switched to ${r} view`, "Role changed successfully"); }}
            showRoleSwitcher={true}
          />
          {renderContent()}
        </div>
      </div>
      {showModal && <ConfirmModal doctor={selectedDoctor} onClose={handleModalClose} />}
      <Toast toasts={toasts} />
    </>
  );
}
