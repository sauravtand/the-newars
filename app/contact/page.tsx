import { Mail, MapPin, Phone } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with The Newars community</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Get In Touch</CardTitle>
              <CardDescription>We'd love to hear from you about Newari culture and traditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">thenewars.nepal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Social Media</p>
                  <p className="text-gray-600">Follow us on Facebook</p>
                </div>
              </div>

              <a href="mailto:thenewars.nepal@gmail.com">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-700">About Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Newars is dedicated to preserving and promoting the rich cultural heritage of the Newari people of
                Nepal. We share stories, traditions, festivals, and customs that have been passed down through
                generations.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform serves as a bridge between traditional Newari culture and the modern world, ensuring that
                these beautiful traditions continue to thrive and inspire future generations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're interested in learning about Newari festivals like Indra Jatra, traditional cuisine,
                sacred rituals, or classical music and dance, we invite you to explore and celebrate with us.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
