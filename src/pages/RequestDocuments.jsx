import { useState, useEffect } from 'react';
import { FileText, Building2, Home, AlertCircle, CheckCircle, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestDocuments = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [requestType, setRequestType] = useState('');
  const [documentTypes, setDocumentTypes] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({ purpose: '', barangayId: '' });
  const [residentData, setResidentData] = useState(null);

  // Fetch resident data on mount
  useEffect(() => {
    fetchResidentData();
  }, []);

  // Fetch document types when request type changes
  useEffect(() => {
    if (requestType) {
      fetchDocumentTypes();
      if (requestType === 'barangay') {
        fetchBarangays();
      }
    }
  }, [requestType]);

  const fetchResidentData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setMessage({ type: 'error', text: 'Please login first' });
        setTimeout(() => navigate('/resident-login'), 2000);
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/resident/user/${userId}`);
      setResidentData(response.data.data);
      setFormData(prev => ({ ...prev, barangayId: response.data.data.barangay_id }));
    } catch (error) {
      console.error('Failed to fetch resident data:', error);
      setMessage({ type: 'error', text: 'Failed to load user data. Please complete your profile first.' });
    }
  };

  const fetchDocumentTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/documentTypes/${requestType}`);
      setDocumentTypes(response.data.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load document types' });
    } finally {
      setLoading(false);
    }
  };

  const fetchBarangays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/barangay');
      setBarangays(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch barangays:', error);
    }
  };

  const handleRequestTypeSelect = (type) => {
    setRequestType(type);
    setStep(2);
    setMessage({ type: '', text: '' });
  };

  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setStep(3);
    setMessage({ type: '', text: '' });
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      setSelectedDocument(null);
    } else if (step === 2) {
      setStep(1);
      setRequestType('');
      setDocumentTypes([]);
    }
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.purpose.trim()) {
      setMessage({ type: 'error', text: 'Please provide a purpose for the request' });
      return;
    }

    if (requestType === 'barangay' && !formData.barangayId) {
      setMessage({ type: 'error', text: 'Please select a barangay' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const requestData = {
        residentId: residentData.id,
        documentType: selectedDocument.name,
        requestType: requestType,
        barangayId: requestType === 'barangay' ? parseInt(formData.barangayId) : null,
        purpose: formData.purpose
      };

      await axios.post('http://localhost:5000/api/document-requests', requestData);
      setMessage({ type: 'success', text: 'Request submitted successfully! Redirecting to dashboard...' });
      
      setTimeout(() => {
        navigate('/resident-dashboard');
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to submit request';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <FileText className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Request Documents</h1>
          <p className="mt-2 text-gray-600">Submit your document request in a few simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Type</span>
            </div>
            <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Document</span>
            </div>
            <div className={`w-16 h-1 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Details</span>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message.text}
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Select Request Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Request Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleRequestTypeSelect('barangay')}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                  <Home className="h-12 w-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Barangay Documents</h3>
                  <p className="text-gray-600">Clearances, certificates, and IDs issued by your barangay</p>
                </button>

                <button
                  onClick={() => handleRequestTypeSelect('municipal')}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                  <Building2 className="h-12 w-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Municipal Documents</h3>
                  <p className="text-gray-600">Permits, licenses, and certificates from the municipality</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Document Type */}
          {step === 2 && (
            <div>
              <button
                onClick={handleBack}
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Request Type
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Select {requestType === 'barangay' ? 'Barangay' : 'Municipal'} Document
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading documents...</p>
                </div>
              ) : documentTypes.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No documents available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {documentTypes.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDocumentSelect(doc)}
                      className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{doc.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center text-gray-700">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span className="font-medium">₱{parseFloat(doc.fee).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{doc.processing_days} {doc.processing_days === 1 ? 'day' : 'days'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {doc.requirements && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">Requirements:</p>
                          <p className="text-sm text-gray-600">{doc.requirements}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && selectedDocument && (
            <div>
              <button
                onClick={handleBack}
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Documents
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Request Details</h2>

              {/* Selected Document Summary */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedDocument.name}</h3>
                <div className="flex gap-6 text-sm text-gray-700">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-medium">₱{parseFloat(selectedDocument.fee).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedDocument.processing_days} {selectedDocument.processing_days === 1 ? 'day' : 'days'}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {requestType === 'barangay' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Barangay <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.barangayId}
                      onChange={(e) => setFormData({ ...formData, barangayId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a barangay</option>
                      {barangays.map((barangay) => (
                        <option key={barangay.id} value={barangay.id}>
                          {barangay.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Request <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Please specify the purpose of your document request..."
                    required
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Please ensure you have all the required documents before submitting your request.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/resident-dashboard')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDocuments;