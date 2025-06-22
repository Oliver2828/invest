import React, { useState } from 'react';
import { FaHeadset, FaEnvelope, FaPhone, FaWhatsapp, FaQuestionCircle, 
         FaTicketAlt, FaChevronDown, FaChevronUp, FaPaperPlane, 
         FaClock, FaCheckCircle, FaExclamationTriangle, FaUser } from 'react-icons/fa';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [activeFaq, setActiveFaq] = useState(null);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('account');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your registered email address and follow the instructions sent to your email to create a new password.'
    },
    {
      id: 2,
      question: 'How long does it take to process withdrawals?',
      answer: 'Withdrawal processing times vary by method. Bank transfers typically take 1-3 business days, while cryptocurrency withdrawals are usually processed within 24 hours. You can check the status in your transaction history.'
    },
    {
      id: 3,
      question: 'How do I verify my account?',
      answer: 'Account verification requires submitting a government-issued ID and proof of address. Go to your account settings, select "Verification", and follow the instructions to upload the required documents. Verification typically takes 1-2 business days.'
    },
    {
      id: 4,
      question: 'What are the investment fees?',
      answer: 'Our fees vary by product. Mutual funds have a 1.5% annual management fee, stocks have a 0.25% commission per trade, and crypto has a 1% transaction fee. You can view all fees in the "Fees" section of each product page.'
    },
    {
      id: 5,
      question: 'How do I update my personal information?',
      answer: 'You can update your personal information in the "Account Settings" section. For security reasons, some changes may require verification. If you need to change your registered email or phone number, contact our support team for assistance.'
    }
  ];

  // Support tickets data
  const supportTickets = [
    {
      id: 'TKT-78901',
      subject: 'Withdrawal issue',
      category: 'transactions',
      status: 'resolved',
      date: '2023-06-15',
      lastUpdate: '2 days ago'
    },
    {
      id: 'TKT-78902',
      subject: 'Account verification',
      category: 'account',
      status: 'in progress',
      date: '2023-06-12',
      lastUpdate: '1 hour ago'
    },
    {
      id: 'TKT-78903',
      subject: 'Investment advice needed',
      category: 'products',
      status: 'open',
      date: '2023-06-10',
      lastUpdate: '3 days ago'
    },
    {
      id: 'TKT-78904',
      subject: 'App not working',
      category: 'technical',
      status: 'resolved',
      date: '2023-06-05',
      lastUpdate: '1 week ago'
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 5000);
    setMessage('');
    setSubject('');
    setCategory('account');
  };

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8 font-sans text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <FaHeadset className="text-red-500" />
              Support Center
            </h1>
            <p className="text-gray-400 mt-2">We're here to help you with any questions or issues</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center bg-gradient-to-r from-red-700 to-red-900 px-4 py-2 rounded-lg">
              <span className="text-white">24/7 Support Available</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            <FaHeadset /> Contact Options
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            <FaQuestionCircle /> FAQs
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'tickets'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('tickets')}
          >
            <FaTicketAlt /> My Tickets
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'new'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('new')}
          >
            <FaEnvelope /> New Request
          </button>
        </div>

        {/* Contact Options */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Live Chat */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-900/30 p-3 rounded-full">
                  <FaHeadset className="text-red-400 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-white">Live Chat</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Chat with our support team in real-time. Our average response time is less than 2 minutes.
              </p>
              <button className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Start Chat Now
              </button>
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <FaClock className="mr-2" /> Available 24/7
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-900/30 p-3 rounded-full">
                  <FaEnvelope className="text-red-400 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-white">Email Support</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Send us an email and we'll respond within 24 hours. For faster response, use live chat.
              </p>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Your Message</label>
                <textarea 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200 min-h-[100px]"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Send Email
              </button>
            </div>

            {/* Phone & WhatsApp */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-900/30 p-3 rounded-full">
                  <FaPhone className="text-red-400 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-white">Phone & WhatsApp</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Call us directly or message us on WhatsApp for immediate assistance.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg">
                  <FaPhone className="text-green-400" />
                  <div>
                    <h3 className="font-medium text-white">Phone Support</h3>
                    <p className="text-gray-400">+234 800 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg">
                  <FaWhatsapp className="text-green-500" />
                  <div>
                    <h3 className="font-medium text-white">WhatsApp</h3>
                    <p className="text-gray-400">+234 800 123 4567</p>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <FaClock className="inline mr-2" /> Mon-Fri: 8am-8pm, Sat: 9am-5pm (WAT)
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FaQuestionCircle className="text-red-400" />
                Frequently Asked Questions
              </h2>
              <div className="relative w-full md:w-64 mt-4 md:mt-0">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200"
                  placeholder="Search FAQs..."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.id} className="bg-gray-700/50 rounded-xl overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    {activeFaq === faq.id ? (
                      <FaChevronUp className="text-red-400" />
                    ) : (
                      <FaChevronDown className="text-red-400" />
                    )}
                  </button>
                  
                  {activeFaq === faq.id && (
                    <div className="p-4 pt-0 border-t border-gray-700">
                      <p className="text-gray-300">{faq.answer}</p>
                      <div className="mt-4">
                        <button className="text-red-400 hover:text-red-300 text-sm">
                          Was this helpful?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">Didn't find what you were looking for?</p>
              <button 
                className="text-red-400 hover:text-red-300 font-medium flex items-center justify-center gap-2"
                onClick={() => setActiveTab('new')}
              >
                <FaEnvelope className="text-sm" /> Contact our support team
              </button>
            </div>
          </div>
        )}

        {/* Support Tickets */}
        {activeTab === 'tickets' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FaTicketAlt className="text-red-400" />
                My Support Tickets
              </h2>
              <button 
                className="text-red-400 hover:text-red-300 font-medium flex items-center gap-2"
                onClick={() => setActiveTab('new')}
              >
                <FaPlus className="text-sm" /> New Ticket
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Ticket ID</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Subject</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Last Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-700/30">
                      <td className="py-3 px-4 font-medium text-red-400">{ticket.id}</td>
                      <td className="py-3 px-4 font-medium text-white">{ticket.subject}</td>
                      <td className="py-3 px-4 text-gray-300 capitalize">{ticket.category}</td>
                      <td className="py-3 px-4">
                        {ticket.status === 'resolved' ? (
                          <span className="flex items-center text-green-400">
                            <FaCheckCircle className="mr-1" /> Resolved
                          </span>
                        ) : ticket.status === 'in progress' ? (
                          <span className="flex items-center text-yellow-400">
                            <FaClock className="mr-1" /> In Progress
                          </span>
                        ) : (
                          <span className="flex items-center text-red-400">
                            <FaExclamationTriangle className="mr-1" /> Open
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{ticket.date}</td>
                      <td className="py-3 px-4 text-gray-300">{ticket.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center text-gray-400">
              Showing 4 of 4 tickets
            </div>
          </div>
        )}

        {/* New Support Ticket */}
        {activeTab === 'new' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <FaEnvelope className="text-red-400" />
              Submit a New Support Request
            </h2>
            
            {ticketSubmitted ? (
              <div className="bg-green-900/30 border border-green-800 p-6 rounded-xl text-center mb-6">
                <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ticket Submitted Successfully!</h3>
                <p className="text-green-300">
                  Your support ticket has been submitted. Our team will respond within 24 hours.
                </p>
                <p className="mt-4 text-gray-300">
                  Ticket ID: <span className="font-mono text-green-400">TKT-{Math.floor(Math.random()*90000+10000)}</span>
                </p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmitTicket}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200"
                  >
                    <option value="account">Account Issues</option>
                    <option value="transactions">Transactions</option>
                    <option value="products">Products & Investments</option>
                    <option value="technical">Technical Support</option>
                    <option value="security">Security Concerns</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200"
                    placeholder="Briefly describe your issue"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200 min-h-[200px]"
                  placeholder="Please provide detailed information about your issue..."
                  required
                ></textarea>
                <p className="text-gray-500 text-sm mt-2">
                  Include any error messages, steps to reproduce, and relevant account information.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Attachments (Optional)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaPaperPlane className="text-gray-500 text-2xl mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Submit Ticket
              </button>
            </form>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaHeadset className="text-red-400" />
                Before Submitting
              </h3>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Check our <button className="text-red-400 hover:text-red-300" onClick={() => setActiveTab('faq')}>FAQs</button> - your question might already be answered</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Include relevant details like transaction IDs, account numbers, or error messages</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>For urgent issues, use our <button className="text-red-400 hover:text-red-300" onClick={() => setActiveTab('contact')}>live chat</button> or phone support</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Support Resources Banner */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 rounded-2xl shadow-lg p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-white mb-2">Need Immediate Assistance?</h3>
              <p className="text-red-200">
                Our support team is available 24/7 to help with urgent issues.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-red-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                <FaPhone /> Call Now
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                <FaWhatsapp /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Support;