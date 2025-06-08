import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { LogOut, GraduationCap } from "lucide-react"
import { logout } from '@/api/auth'
import { toast } from "sonner"

export function Navbar() {
  const { user, logout : logoutAuth } = useAuth()

  const handleLogout = async ():Promise<void> =>{
      const toastId = toast.loading('Please wait. . .');
      try {
        await logout();
        toast.success('Logout success',{id : toastId});
        logoutAuth();
      } catch (error : any) {
        console.log(error);
        toast.error(error?.response?.message,{id : toastId});
      }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">StudentMS</h1>
              <p className="text-sm text-gray-600">Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome back!</p>
              <p className="text-xs text-gray-600">{user}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
