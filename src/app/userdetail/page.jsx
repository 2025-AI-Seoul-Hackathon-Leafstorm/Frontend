'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDetail() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    learningGoals: '',
    preferredLearningStyle: 'visual',
    experienceLevel: 'beginner',
    timeAvailability: 'moderate'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
    }
    
    if (!formData.learningGoals.trim()) {
      newErrors.learningGoals = 'Learning goals are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically save the data to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for demo purposes
      localStorage.setItem('userProfile', JSON.stringify(formData));
      
      // Redirect to the next page
      router.push('/folders');
    } catch (error) {
      console.error('Error saving user data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1) {
      const step1Errors = {};
      
      if (!formData.name.trim()) {
        step1Errors.name = 'Name is required';
      }
      
      if (!formData.age) {
        step1Errors.age = 'Age is required';
      } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
        step1Errors.age = 'Please enter a valid age';
      }
      
      if (!formData.occupation.trim()) {
        step1Errors.occupation = 'Occupation is required';
      }
      
      setErrors(step1Errors);
      
      // Only proceed if there are no errors
      if (Object.keys(step1Errors).length === 0) {
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl">Your Personal Learning Journey</h1>
                <p className="text-blue-100 mt-1">Let's create a learning experience tailored just for you</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    1
                  </div>
                  <div className={`ml-2 text-sm font-medium ${
                    step >= 1 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    About You
                  </div>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div className="h-1 bg-blue-600" style={{ width: `${step > 1 ?   100 : 0}%` }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                  <div className={`ml-2 text-sm font-medium ${
                    step >= 2 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Learning Style
                  </div>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div className="h-1 bg-blue-600" style={{ width: `${step >= 2 ? (step - 2) * 100 : 0}%` }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    3
                  </div>
                  <div className={`ml-2 text-sm font-medium ${
                    step >= 3 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Your Goals
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">Hello there! 👋</h2>
                    <p className="text-blue-700">I'm your personal AI tutor. To help you learn effectively, I'd like to know a bit about you.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        What should I call you?
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    {/* Age Field */}
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Your age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.age ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your age"
                        min="1"
                        max="120"
                      />
                      {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                    </div>
                    
                    {/* Occupation Field */}
                    <div className="md:col-span-2">
                      <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                        What do you do?
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.occupation ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your occupation or field of work"
                      />
                      {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Next: Learning Style
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">How do you learn best?</h2>
                    <p className="text-blue-700">Understanding your learning style helps me tailor the content to your preferences.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Learning Style Field */}
                    <div className="md:col-span-2">
                      <label htmlFor="preferredLearningStyle" className="block text-sm font-medium text-gray-700 mb-2">
                        I learn best by:
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.preferredLearningStyle === 'visual' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, preferredLearningStyle: 'visual'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.preferredLearningStyle === 'visual' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.preferredLearningStyle === 'visual' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Visual</div>
                              <div className="text-sm text-gray-500">Learning through images, diagrams, and videos</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.preferredLearningStyle === 'auditory' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, preferredLearningStyle: 'auditory'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.preferredLearningStyle === 'auditory' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.preferredLearningStyle === 'auditory' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Auditory</div>
                              <div className="text-sm text-gray-500">Learning through listening and discussion</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.preferredLearningStyle === 'reading' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, preferredLearningStyle: 'reading'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.preferredLearningStyle === 'reading' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.preferredLearningStyle === 'reading' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Reading/Writing</div>
                              <div className="text-sm text-gray-500">Learning through text and note-taking</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.preferredLearningStyle === 'kinesthetic' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, preferredLearningStyle: 'kinesthetic'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.preferredLearningStyle === 'kinesthetic' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.preferredLearningStyle === 'kinesthetic' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Kinesthetic</div>
                              <div className="text-sm text-gray-500">Learning through hands-on activities and practice</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Experience Level Field */}
                    <div>
                      <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                        Your current knowledge level:
                      </label>
                      <div className="space-y-2">
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.experienceLevel === 'beginner' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, experienceLevel: 'beginner'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.experienceLevel === 'beginner' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.experienceLevel === 'beginner' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="font-medium">Beginner</div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.experienceLevel === 'intermediate' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, experienceLevel: 'intermediate'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.experienceLevel === 'intermediate' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.experienceLevel === 'intermediate' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="font-medium">Intermediate</div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.experienceLevel === 'advanced' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, experienceLevel: 'advanced'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.experienceLevel === 'advanced' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.experienceLevel === 'advanced' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="font-medium">Advanced</div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.experienceLevel === 'expert' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, experienceLevel: 'expert'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.experienceLevel === 'expert' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.experienceLevel === 'expert' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="font-medium">Expert</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time Availability Field */}
                    <div>
                      <label htmlFor="timeAvailability" className="block text-sm font-medium text-gray-700 mb-2">
                        How much time can you dedicate to learning?
                      </label>
                      <div className="space-y-2">
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.timeAvailability === 'limited' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, timeAvailability: 'limited'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.timeAvailability === 'limited' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.timeAvailability === 'limited' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Limited</div>
                              <div className="text-xs text-gray-500">1-2 hours/week</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.timeAvailability === 'moderate' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, timeAvailability: 'moderate'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.timeAvailability === 'moderate' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.timeAvailability === 'moderate' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Moderate</div>
                              <div className="text-xs text-gray-500">3-5 hours/week</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.timeAvailability === 'substantial' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, timeAvailability: 'substantial'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.timeAvailability === 'substantial' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.timeAvailability === 'substantial' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Substantial</div>
                              <div className="text-xs text-gray-500">6-10 hours/week</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.timeAvailability === 'extensive' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`} onClick={() => setFormData({...formData, timeAvailability: 'extensive'})}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.timeAvailability === 'extensive' 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.timeAvailability === 'extensive' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">Extensive</div>
                              <div className="text-xs text-gray-500">10+ hours/week</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Next: Your Goals
                    </button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">What do you want to achieve?</h2>
                    <p className="text-blue-700">Tell me about your learning goals so I can create a personalized plan for you.</p>
                  </div>
                  
                  {/* Learning Goals Field */}
                  <div>
                    <label htmlFor="learningGoals" className="block text-sm font-medium text-gray-700 mb-2">
                      What are your learning goals?
                    </label>
                    <textarea
                      id="learningGoals"
                      name="learningGoals"
                      value={formData.learningGoals}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.learningGoals ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="For example: I want to learn Python programming to build web applications. I'm interested in data science and machine learning. I need to understand the basics of AI for my job."
                    ></textarea>
                    {errors.learningGoals && <p className="mt-1 text-sm text-red-600">{errors.learningGoals}</p>}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-blue-800">Pro Tip</h3>
                        <p className="text-sm text-blue-700 mt-1">The more specific you are about your goals, the better I can tailor your learning experience. Include any specific topics, skills, or projects you want to work on.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Your Plan...
                        </>
                      ) : (
                        'Create My Learning Plan'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
