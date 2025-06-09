import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Header */}
      <header className="bg-brown text-cream py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-cream hover:text-teal transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link href="/map">
            <Button className="bg-teal hover:bg-teal-dark text-white">Explore Map</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-brown mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700">
            Have questions about ancient sites or want to contribute to our research? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-brown mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brown mb-2">
                  Name
                </label>
                <Input id="name" type="text" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brown mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-brown mb-2">
                  Subject
                </label>
                <Input id="subject" type="text" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brown mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} />
              </div>
              <Button type="submit" className="w-full bg-teal hover:bg-teal-dark text-white">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brown mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-teal mt-1" />
                  <div>
                    <p className="font-medium text-brown">General Inquiries</p>
                    <p className="text-gray-600">discover@archaicknowledge.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-teal mt-1" />
                  <div>
                    <p className="font-medium text-brown">Research & Contributions</p>
                    <p className="text-gray-600">research@archaicknowledge.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-teal mt-1" />
                  <div>
                    <p className="font-medium text-brown">Address</p>
                    <p className="text-gray-600">
                      Archaic Knowledge Foundation
                      <br />
                      Ancient Studies Department
                      <br />
                      Research Institute
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brown mb-4">Research Collaboration</h3>
              <p className="text-gray-600 mb-4">
                Are you an archaeologist, historian, or researcher interested in contributing to our database? We
                welcome collaboration from academic institutions and independent researchers.
              </p>
              <p className="text-gray-600 mb-4">
                If you have information about ancient sites not yet featured on our platform, or if you'd like to
                contribute additional research to existing entries, please reach out to our research team.
              </p>
              <Button className="bg-brown hover:bg-brown-dark text-cream">Research Partnership</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brown mb-4">Technical Support</h3>
              <p className="text-gray-600 mb-4">
                Experiencing issues with the interactive map or other features? Our technical team is here to help.
              </p>
              <p className="text-gray-600">
                Please include details about your browser, device, and the specific issue you're encountering.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
