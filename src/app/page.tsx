'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-8"
          >
            Welcome to Clarity!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Upload. Summarize. Learn smarter~!
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/folders')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                     hover:bg-blue-700 transition-colors duration-200 shadow-lg 
                     hover:shadow-xl"
          >
            Start Now
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Smarter Organization</h3>
            <p className="text-gray-600">Upload your study materials and keep them organized with AI-powered folders and tagging.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Reliable AI Processing</h3>
            <p className="text-gray-600">Your documents are analyzed with advanced AI to extract key ideas, summaries, and questions for deeper understanding.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
            <p className="text-gray-600">Get personalized summaries and quizzes tailored to your level, interests, and academic goals.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
