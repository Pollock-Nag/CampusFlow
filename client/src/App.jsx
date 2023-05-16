import './App.css';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import LoginPage from './pages/Login.page';
import RedirectOAuth from './pages/RedirectOAuth.page';
import CandidateList from './pages/CandidateList';
import CreateStudent from './components/CreateStudentModal';
import MarkStudent from './components/MarkStudent';
import RepoAccess from './pages/RepoAccess.page';
import Dashboard from './pages/Dashboard.page';
import CurriculumComponent from './pages/Curriculum.page';
import CohortStudents from './components/CohortStudents';
import Cohorts from './pages/Cohorts.page';
import SkillsRadarChart from './components/SkillsRadarChart';
import StudentInfo from './pages/StudentInfo';
import MarkStudents from './pages/MarkStudents.page';
import AddSkill from './pages/AddSkills.page';
import MigrateStudents from './pages/MigrateStudents.page';
import PeerRatings from './pages/PeerRatings.page';

import AlumniInfoCard from './components/alumniComponents/AlumniInfoCard';
import AlumniSidebar from './components/alumniComponents/AlumniSidebar';
import ProjectCard from './components/alumniComponents/ProjectCard';
import SiteChip from './components/alumniComponents/SiteChip';
import Experience from './components/alumniComponents/Experience';
import ProjectSection from './components/alumniComponents/ProjectSection';
import SelectIndustry from './components/alumniComponents/SelectIndustry';
import LanguageStats from './components/alumniComponents/LanguageStats';
import AlumniProfile from './pages/AlumniProfile.jsx';
import Portfolio from './components/alumniComponents/Portfolio';
import GithubGraph from './components/alumniComponents/GithubGraph';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/redirect/auth" element={<RedirectOAuth />} />
          <Route path="/curriculum" element={<CurriculumComponent />} />

          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/createStudent/:id" element={<CreateStudent />} />
          <Route path="/markStudent/:id/:week" element={<MarkStudent />} />
          <Route path="/markstudents" element={<MarkStudents />} />
          <Route path="peerratings" element={<PeerRatings />} />
          <Route path="/cohorts" element={<Cohorts />}></Route>
          <Route
            path="/cohorts/:cohort/students/"
            element={<CohortStudents />}
          />
          <Route path="/student/:id" element={<StudentInfo />} />
          <Route path="/addSkills" element={<AddSkill />} />
          <Route path="/migratestudents" element={<MigrateStudents />} />
          <Route path="/repoAccess" element={<RepoAccess />} />
          <Route path="test" element={<SkillsRadarChart />} />
          <Route path="/alumni/info" element={<AlumniInfoCard />} />
          <Route path="/alumni/sidebar" element={<AlumniSidebar />} />
          <Route path="/alumni/profileChip" element={<ProjectCard />} />
          <Route path="/alumni/chip" element={<SiteChip />} />
          <Route path="/alumni/experience" element={<Experience />} />
          <Route path="/alumni/portfolio" element={<Portfolio />} />
          <Route path="/alumni/profile" element={<AlumniProfile />} />
          <Route path="/search" element={<SelectIndustry />} />
          <Route path="/languageStats" element={<LanguageStats />} />
          <Route path="/graph" element={<GithubGraph />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
