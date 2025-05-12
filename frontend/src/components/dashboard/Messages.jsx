import React, { useState, useEffect } from 'react';
import { getAllMessages, markMessageAsRead, getMessages } from '../../Fetchers/BookingFetcher';
import { format } from 'date-fns';
import { MessageSquare, Clock, User, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await getAllMessages();
            setMessages(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    const handleMessageClick = async (message) => {
        try {
            if (!message.read) {
                await markMessageAsRead(message._id);
                // Update the message in the local state immediately
                const updatedMessages = messages.map(msg =>
                    msg._id === message._id ? { ...msg, read: true } : msg
                );
                setMessages(updatedMessages);
            }

            // Fetch conversation history
            const conversationData = await getMessages(message.sender._id);
            setConversation(conversationData);
            // Use the updated message if it was marked as read
            const currentMessage = message.read ? message : { ...message, read: true };
            setSelectedMessage(currentMessage);
            setIsModalOpen(true);
        } catch (err) {
            toast.error('Failed to load message details');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMessage(null);
        setConversation([]);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <MessageSquare size={48} className="mb-4" />
                <p className="text-lg">No messages yet</p>
                <p className="text-sm">Your messages will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Messages</h2>
                <button
                    onClick={fetchMessages}
                    className="text-sm text-primary-600 hover:text-primary-700"
                >
                    Refresh
                </button>
            </div>

            <div className="space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        onClick={() => handleMessageClick(message)}
                        className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer ${!message.read ? 'border-l-4 border-primary-500' : ''
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                        <User size={20} className="text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <p className="font-medium text-gray-900">
                                            {message.sender.name}
                                        </p>
                                        <span className="text-sm text-gray-500">
                                            <Clock size={14} className="inline mr-1" />
                                            {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-600">{message.message}</p>
                                </div>
                            </div>
                            {!message.read && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                    New
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Details Modal */}
            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                    <User size={20} className="text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{selectedMessage.sender.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {format(new Date(selectedMessage.createdAt), 'MMM d, yyyy h:mm a')}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Conversation History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {conversation.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`flex ${msg.sender._id === selectedMessage.sender._id ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${msg.sender._id === selectedMessage.sender._id
                                            ? 'bg-gray-100'
                                            : 'bg-primary-100'
                                            }`}
                                    >
                                        <p className="text-sm">{msg.message}</p>
                                        <span className="text-xs text-gray-500 mt-1 block">
                                            {format(new Date(msg.createdAt), 'h:mm a')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages; 