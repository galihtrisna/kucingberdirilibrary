
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Star, Download } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Ahmad Santoso",
      role: "Founder & Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "PhD in Library Science, passionate about democratizing access to knowledge."
    },
    {
      name: "Sari Dewi",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "10+ years in software development, specializing in digital libraries."
    },
    {
      name: "Budi Prasojo",
      role: "Content Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Former librarian with expertise in digital content curation."
    },
    {
      name: "Maya Indira",
      role: "Community Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Building bridges between readers, authors, and educators."
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Books Available", value: "12,543" },
    { icon: Users, label: "Active Users", value: "8,921" },
    { icon: Star, label: "Average Rating", value: "4.8" },
    { icon: Download, label: "Total Downloads", value: "45,672" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About KBOeL</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          KucingBerdiri OpenLibrary (KBOeL) is a digital platform dedicated to making knowledge 
          accessible to everyone, everywhere. We believe that education and information should be 
          free and available to all.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
            <p className="text-blue-700 leading-relaxed">
              To democratize access to knowledge by creating a comprehensive digital library 
              platform that serves readers, students, researchers, and educators worldwide. 
              We strive to break down barriers to education and foster a global community 
              of learners.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Vision</h2>
            <p className="text-green-700 leading-relaxed">
              A world where quality educational resources are freely available to everyone, 
              regardless of their geographical location or economic situation. We envision 
              a future where knowledge sharing drives innovation and human progress.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Story</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
          <p>
            KBOeL was born from a simple yet powerful idea: what if every person on Earth could 
            access the same quality of educational resources? Our founder, Dr. Ahmad Santoso, 
            experienced firsthand the challenges of accessing academic materials in remote areas 
            of Indonesia during his research work.
          </p>
          <p>
            In 2020, during the global pandemic when digital access became more crucial than ever, 
            our team came together to create a platform that would bridge the gap between knowledge 
            seekers and quality educational content. What started as a small project has grown into 
            a thriving community of readers, educators, and contributors from around the world.
          </p>
          <p>
            Today, KBOeL serves thousands of users daily, offering everything from academic papers 
            and textbooks to fiction and educational materials. Our community-driven approach ensures 
            that our collection continues to grow and evolve to meet the needs of our diverse user base.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Open Access</h3>
            <p className="text-white/90">
              We believe knowledge should be free and accessible to everyone, without barriers or restrictions.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Community</h3>
            <p className="text-white/90">
              Our platform thrives through the contributions and collaboration of our global community.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quality</h3>
            <p className="text-white/90">
              We maintain high standards for content quality while ensuring diverse and inclusive representation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
