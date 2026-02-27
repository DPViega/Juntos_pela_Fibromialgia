import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chatbot from "@/components/Chatbot";
import Login from "./pages/Login";
import BlogIndex from "./pages/blog/Index";
import BlogPost from "./pages/blog/Post";
import Profile from "./pages/Profile";
import Dashboard from "./pages/admin/Dashboard";
import CreatePost from "./pages/admin/CreatePost";
import AIAssistant from "./pages/admin/AIAssistant";
import EditPost from "./pages/admin/EditPost";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Rotas Administrativas Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/posts/new" element={<CreatePost />} />
              <Route path="/admin/posts/edit/:id" element={<EditPost />} />
              <Route path="/admin/ai-assistant" element={<AIAssistant />} />
              <Route path="/profile" element={<Profile />} />
              {/* Outras rotas de admin virão aqui */}
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
