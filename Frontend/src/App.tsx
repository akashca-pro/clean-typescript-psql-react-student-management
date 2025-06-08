import { useState, useEffect } from "react"
import { SignupForm } from "@/components/signup-form"
import { LoginForm } from "@/components/login-form"
import { HomePage } from "@/components/home-page"
import { useAuth } from "@/lib/auth"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from 'sonner'

type Page = "login" | "signup" | "home"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login")
  const { isAuthenticated, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage("home")
    } else {
      setCurrentPage("login")
    }
  }, [isAuthenticated])

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster richColors/>
      <AnimatePresence mode="wait">
        {currentPage === "signup" && (
          <motion.div
            key="signup"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SignupForm onSwitchToLogin={() => setCurrentPage("login")} />
          </motion.div>
        )}

        {currentPage === "login" && (
          <motion.div
            key="login"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LoginForm onSwitchToSignup={() => setCurrentPage("signup")} />
          </motion.div>
        )}

        {currentPage === "home" && (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
