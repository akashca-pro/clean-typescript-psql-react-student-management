import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from 
"@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { StudentEditModal } from "@/components/student-edit-modal"
import { Users, Edit, Mail, } from "lucide-react"
import type { Student } from "@/api/axios"
import { loadProfile } 
from '@/api/crud'

export function HomePage() {
  const [studentDetails, setStudentDetails] = useState<Student>({
    name : '',
    email : ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEditStudent = () => {
    setIsModalOpen(true)
  }

useEffect(() => {
  const fetchStudent = async () => {
    try {
      const response = await loadProfile()
      setStudentDetails(response.data as Student)
    } catch (error: any) {
      console.error("Failed to load profile:", error);
    }
  }

  fetchStudent()
}, [studentDetails])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          </div>
          <p className="text-gray-600">View Your Profile</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <motion.div key={studentDetails?.id} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {studentDetails?.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">{studentDetails?.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          ID: {studentDetails?.id}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStudent()}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{studentDetails?.email}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        </motion.div>

      </div>

      <AnimatePresence>
        {isModalOpen && (
          <StudentEditModal
            student={studentDetails}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
