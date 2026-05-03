import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5731/api/events/get');
        setEvents(response.data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleApproval = async (eventId, action) => {
    try {
      const response = await axios.post(`http://localhost:5731/api/events/${eventId}/${action}`);
      alert(response.data.message);
      const updatedEvents = events.map(event => 
        event._id === eventId ? { ...event, status: action === 'approve' ? 'approved' : 'rejected' } : event
      );
      setEvents(updatedEvents);
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex">
      {/* Main content */}
      <main className="flex-1 p-6 space-y-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium">Total Events</h3>
            <p className="text-2xl font-bold">{events.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium">Pending</h3>
            <p className="text-2xl font-bold">
              {events.filter(e => e.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium">Approved</h3>
            <p className="text-2xl font-bold">
              {events.filter(e => e.status === 'approved').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium">Rejected</h3>
            <p className="text-2xl font-bold">
              {events.filter(e => e.status === 'rejected').length}
            </p>
          </div>
        </section>

        {/* Events section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Event Applications</h2>
            <div className="text-sm">
              Showing {events.length} events
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 border border-red-700 p-4 rounded">
              Error: {error}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-10">
              No events found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Attendees
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <i className="fas fa-calendar-alt"></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{event.title}</div>
                            <div className="text-sm line-clamp-1">{event.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          {new Date(event.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900">
                          {event.attendees.length} attendees
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${event.status === 'approved' ? 'bg-green-900' : 
                            event.status === 'rejected' ? 'bg-red-900' : 
                            'bg-yellow-900'}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="space-x-2">
                          <button
                            onClick={() => handleApproval(event._id, 'approve')}
                            disabled={event.status === 'approved'}
                            className={`inline-flex items-center px-3 py-1 rounded-md text-sm 
                              ${event.status === 'approved' ? 
                                'bg-gray-600 cursor-not-allowed' : 
                                'bg-green-600 hover:bg-green-700'}`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproval(event._id, 'reject')}
                            disabled={event.status === 'rejected'}
                            className={`inline-flex items-center px-3 py-1 rounded-md text-sm 
                              ${event.status === 'rejected' ? 
                                'bg-gray-600 cursor-not-allowed' : 
                                'bg-red-600 hover:bg-red-700'}`}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}