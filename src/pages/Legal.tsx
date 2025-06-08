
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, AlertTriangle, Mail } from "lucide-react";

const Legal = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Legal Information</h1>
        <p className="text-xl text-gray-600">
          Terms of service, privacy policy, and copyright information for KBOeL
        </p>
      </div>

      <div className="space-y-8">
        {/* Terms of Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using KucingBerdiri OpenLibrary (KBOeL), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">2. Use License</h3>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on KBOeL for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3. User Accounts</h3>
                  <p>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for any activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4. Content Guidelines</h3>
                  <p>
                    Users may upload educational content, research papers, and books that are:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Free from copyright restrictions or properly licensed</li>
                    <li>Educational or informational in nature</li>
                    <li>Not containing malicious software or harmful content</li>
                    <li>Appropriate for all ages and cultures</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">5. Prohibited Uses</h3>
                  <p>
                    You may not use our service:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6. Disclaimer</h3>
                  <p>
                    The materials on KBOeL are provided on an 'as is' basis. KBOeL makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">1. Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, upload content, or contact us. This may include:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Content you upload or share</li>
                    <li>Communications with us</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Communicate with you about products, services, and events</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3. Information Sharing</h3>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information in the following situations:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>With your consent</li>
                    <li>For legal reasons</li>
                    <li>To protect rights and safety</li>
                    <li>With service providers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4. Data Security</h3>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">5. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Copyright Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Copyright Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Copyright Compliance</h3>
                <p>
                  KBOeL respects the intellectual property rights of others and expects users to do the same. We have a policy of removing content that infringes copyright and terminating repeat infringers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">DMCA Notice</h3>
                <p>
                  If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>A physical or electronic signature of the copyright owner</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing</li>
                  <li>Your contact information</li>
                  <li>A statement of good faith belief that the use is not authorized</li>
                  <li>A statement that the information is accurate</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Acceptable Content</h3>
                <p>
                  We encourage the sharing of:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Public domain works</li>
                  <li>Creative Commons licensed content</li>
                  <li>Original works by the uploader</li>
                  <li>Content with proper licensing permissions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, Privacy Policy, or Copyright Policy, 
                please contact us:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@kboel.com</p>
                  <p><strong>Address:</strong> Jakarta, Indonesia</p>
                  <p><strong>Phone:</strong> +62 123 456 7890</p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Last updated: January 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Legal;
