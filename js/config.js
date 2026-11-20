// SUPABASE CLIENT INITIALIZATION (Pusat Kendali via localStorage)
const DEFAULT_SUPABASE_URL = "https://uoftrgobgnesscvorbzg.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZnRyZ29iZ25lc3Njdm9yYnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxODQ3MTMsImV4cCI6MjExMDc2MDcxM30.GL_JQrFJv6Td0WpnNLU3o6WWYrDzVq7ALMcbOFQIhwg";

if (localStorage.getItem("SUPABASE_URL") !== DEFAULT_SUPABASE_URL) {
  localStorage.setItem("SUPABASE_URL", DEFAULT_SUPABASE_URL);
  localStorage.setItem("SUPABASE_ANON_KEY", DEFAULT_SUPABASE_ANON_KEY);
}

const SUPABASE_URL = localStorage.getItem("SUPABASE_URL");
const SUPABASE_ANON_KEY = localStorage.getItem("SUPABASE_ANON_KEY");
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// State Global Aplikasi
let html5QrCode = null, isCameraActive = false, db = null, cachedStudents = [];
let fetchedTodayAttendance = [], fetchedAttendanceHistory = [], fetchedTindakLanjutHistory = [], fetchedHariLiburList = [];
let parsedBatchStudents = [];
let currentScanSession = "PAGI", myPieChart = null, myBarChart = null;
let isManualTimeMode = false;
let customScanDateOverride = null;
let customScanTimeOverride = null;
let currentUserRole = "PETUGAS"; 
let isProcessingScan = false;
let currentTLTab = "pending"; 
let activeCameraFacingMode = "environment";

const DAYS_LIST = [
  { key: "sun", label: "Minggu (Ekstrakurikuler)" },
  { key: "mon", label: "Senin" },
  { key: "tue", label: "Selasa" },
  { key: "wed", label: "Rabu" },
  { key: "thu", label: "Kamis" },
  { key: "fri", label: "Jumat" },
  { key: "sat", label: "Sabtu" }
];

const DEFAULT_TIME_CONFIGS = {
  sun: { active: false, pStart: "06:00", pLimit: "07:25", sStart: "12:00", sLimit: "13:45" },
  mon: { active: true,  pStart: "06:00", pLimit: "07:25", sStart: "12:00", sLimit: "13:45" },
  tue: { active: true,  pStart: "06:00", pLimit: "07:25", sStart: "12:00", sLimit: "13:45" },
  wed: { active: true,  pStart: "06:00", pLimit: "07:25", sStart: "12:00", sLimit: "13:45" },
  thu: { active: true,  pStart: "06:00", pLimit: "07:25", sStart: "12:00", sLimit: "13:45" },
  fri: { active: true,  pStart: "06:00", pLimit: "07:25", sStart: "10:00", sLimit: "11:45" },
  sat: { active: true,  pStart: "06:00", pLimit: "07:25", sStart: "12:00", sLimit: "13:45" }
};